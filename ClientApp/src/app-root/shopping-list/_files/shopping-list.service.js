import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LOCAL_STORAGE_KEYS } from '../../../constants/localStorage-keys.constant'
import { apiRoot } from '../../../constants/api-root.constant'
import { wrapParams } from '../../../utilities/urlparam-wrapper'

const applyFilters = (items, settings) => {
    let filteredItems = items;
    if(!settings.showClosed){
        filteredItems = filteredItems.filter(item => item.Status !== 'closed');
    }
    if(!settings.showOpened){
        filteredItems = filteredItems.filter(item => item.Status !== 'opened');
    }
    if(!settings.showInBasket){
        filteredItems = filteredItems.filter(item => !item.InBasket)
    }
    return filteredItems;
}

const getFilteredItems = (service) => {
    const items = service.items$.getValue()
    const settings = service.settings$.getValue()
    const filteredItems = applyFilters(items, settings)
    return filteredItems 
}

const loadSettings = (service) => {
    let settings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS))
    if(!settings){
        settings = {
            showOpened: true,
            showClosed: true,
            showInBasket: true
        };
    }
    service.settings$.next(settings)
}

export const shoppingListServiceFactory = ($http, authService) => {
    const service = {};
    service.items$ = new BehaviorSubject([])
    service.filteredItems$ = new BehaviorSubject([])
    service.basket$ = new BehaviorSubject([])
    service.settings$ = new BehaviorSubject({})
    service.showSettings$ = new BehaviorSubject(false)
    service.showAddItem$ = new BehaviorSubject(false)
    service.selectedItem$ = new BehaviorSubject(undefined)

    service.init = () => {
        service.loadItems()
        service.items$.subscribe(items => {
            const filteredItems = getFilteredItems(service)
            service.filteredItems$.next(filteredItems)
        })
        service.settings$.subscribe(settings => {
            const filteredItems = getFilteredItems(service)
            service.filteredItems$.next(filteredItems)  
        })
        authService.currentUser$.subscribe(data => {
            service.currentUser = data
            service.loadBasket()
        })
        loadSettings(service)
        return service
    }
    
    service.setShowSettings = (value) => service.showSettings$.next(value)
    service.setShowAddItem = (value) => service.showAddItem$.next(value)

    service.selectItem = (item) => service.selectedItem$.next(item)

    service.setSettings = (settings) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
        service.settings$.next(settings)
    }

    service.createItem = (item) => {
        const createItemApiUrl = `${apiRoot}/list/items/create`
        $http.post(createItemApiUrl, item).then(
            resolve => {
                const newItem = resolve.data
                newItem.InBasket = newItem.BasketId !== 0
                const items = service.items$.getValue()
                items.push(newItem)
                service.items$.next(items)
                service.setShowAddItem(false)
            },
            reject => {
                if(reject.data)
                    console.error(reject.data)
                console.error(reject)
            }
        )
    }        


    service.toBasket = (item) => {
        if(!item){ return }
        if(!service.currentUser){ return }

        item.BasketId = service.currentUser.basketId
        item.InBasket = true
        const basket = service.basket$.getValue()
        basket.push(item)
        
        const items = service.items$.getValue()
        const changedItem = items.find(e => e.Id === item.Id)
        if(!changedItem){ throw new Error('selected item does not exist in the shopping-list') }
        changedItem.InBasket = true

        const toBasketApiUrl = `${apiRoot}/list/items/update`
        $http.post(toBasketApiUrl, item).then(
            resolve => {
                service.items$.next(items)
                service.basket$.next(basket)
            },
            rejected => console.log(rejected.data)
        )
    }

    service.removeFromBasket = (item) => {
        if(!item){ return }

        item.BasketId = 0
        let basket = service.basket$.getValue()
        basket = basket.filter(e => e.Id !== item.Id)
        
        const items = service.items$.getValue()
        const changedItem = items.find(e => e.Id === item.Id)
        if(!changedItem){
            throw new Error('selected item does not exist in the shopping-list')
        }
        changedItem.InBasket = false

        const removeFromBasketApiUrl = `${apiRoot}/list/items/update`
        $http.post(removeFromBasketApiUrl, item).then(
            resolve => {
                service.basket$.next(basket)
                service.items$.next(items)
            },
            rejected => console.log(rejected.data)
        )
    }

    service.buyAll = () => {
        const basket = service.basket$.getValue()
        const items = service.items$.getValue()

        basket.forEach(basketItem => {
            basketItem.InBasket = false
            basketItem.BasketId = 0;
            basketItem.Status = 'closed'
            //basketItem.ownedBy = currentUser.name
            const changedItem = items.find(i => i.Id === basketItem.Id)
            if(!changedItem){
                throw new Error('selected item does not exist in the shopping-list')
            }
            changedItem.inBasket = basketItem.InBasket
            changedItem.status = basketItem.Status
            changedItem.ownedBy = basketItem.OwnedBy
        })

        const buyAllApiUrl = `${apiRoot}/list/items/close`
        const closeItemsModel = {
            itemIds: basket.map(e => e.Id),
            actorId: service.currentUser.id
        }
        $http.post(buyAllApiUrl, closeItemsModel).then(
            resolve => {
                service.basket$.next([])
                service.items$.next(items)
            },
            reject => {
                if(reject.data){
                    console.error(reject.data)
                }
                console.error(reject)
            }
        )
    }

    service.loadItems = () => {
        const itemsApiUrl = `${apiRoot}/list/items/getall`       
        $http.get(itemsApiUrl).then(
            resolved => {
                const data = resolved.data
                data.forEach(e => {
                    e.InBasket = e.BasketId !== 0
                })
                console.log(data)
                service.items$.next(data)
            },
            reject => console.error(reject.data)
        )
    }

    service.loadBasket = () => {
        if(!service.currentUser){ return }
        const basketId = service.currentUser.basketId
        const toBasketApiUrl = `${apiRoot}/list/items/getbasket` + wrapParams([{key:'basketId', value: basketId}])
        $http.get(toBasketApiUrl).then(
            resolve => service.basket$.next(resolve.data),
            reject => console.error(reject.data)
        )
        
    }
    
    return service.init()
}
shoppingListServiceFactory.$inject = ['$http','authService']

