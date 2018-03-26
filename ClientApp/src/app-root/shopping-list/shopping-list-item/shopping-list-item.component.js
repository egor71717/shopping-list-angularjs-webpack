const shoppingListItemController = function(shoppingListService){
    this.$onInit = () => {
        this.selectedItemSubscription = shoppingListService.selectedItem$
            .subscribe(data => {
                this.item = data
                this.canPutToBasket = data && !data.InBasket && !(this.item.Status === 'closed')
            })   
    }
    this.$onDestroy = () => {
        this.selectedItemSubscription.unsubscribe()
    }
    this.onToBasketClick = ($event) => {
        $event.stopPropagation()
        shoppingListService.toBasket(this.item)
        shoppingListService.selectItem(undefined)

    }
    this.onCloseItemClick = ($event) => {
        $event.stopPropagation()
        shoppingListService.selectItem(undefined)
    }
}
shoppingListItemController.$inject = ['shoppingListService'];
export const shoppingListItemComponent = {
    template: require('./shopping-list-item.component.html'),
    //styleUrls: [require('./shopping-list-item.component.css')],
    controller: shoppingListItemController
};

import './shopping-list-item.component.css'
