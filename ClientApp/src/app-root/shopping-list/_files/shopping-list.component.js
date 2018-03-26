import { ROUTES } from '../../../constants/routes.constant'
import { services } from '@uirouter/core'

const shoppingListController = function($scope, shoppingListService, navbarService){
    this.$onInit = () => {
        this.ROUTES = ROUTES
        this.selectedItemSubscription = shoppingListService.selectedItem$
            .subscribe(data => this.selectedItem = data)
        this.itemsSubscription = shoppingListService.filteredItems$
            .subscribe(data => this.shoppingListItems = data)
        this.showSettingsSubscription = shoppingListService.showSettings$
            .subscribe(data => this.showSettings = data)
        this.showAddItemSubscription = shoppingListService.showAddItem$
            .subscribe(data => this.showAddItem = data)
        navbarService.setTitle('SHOPPING LIST')
    }
   
    this.$onDestroy = () => {
        this.itemsSubscription.unsubscribe()
        this.selectedItemSubscription.unsubscribe()
        this.showSettingsSubscription.unsubscribe()
        this.showAddItemSubscription.unsubscribe()
    }

    this.onSettingsClick = () => shoppingListService.setShowSettings(true)
    this.onAddItemClick = () => shoppingListService.setShowAddItem(true)
    this.onItemClick = (item) => shoppingListService.selectItem(item)

    this.onItemModalWindowClick = ($event) => {
        $event.stopPropagation()
        shoppingListService.selectItem(undefined)
    }
    this.onAddItemModalWindowClick = ($event) => {
        $event.stopPropagation()
        shoppingListService.setShowAddItem(false)
    }
    this.onSettingsModalWindowClick = (event) => {
        event.stopPropagation()
        shoppingListService.setShowSettings(false)
    }
}
shoppingListController.$inject = ['$scope','shoppingListService', 'navbarService']

export const shoppingListComponent = {
    template: require('./shopping-list.component.html'),
    styleUrls: [require('./shopping-list.component.css')],
    controller: shoppingListController
}
