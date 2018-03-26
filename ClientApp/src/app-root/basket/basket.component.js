import { ROUTES } from '../../constants/routes.constant'

const basketController = function(shoppingListService, navbarService) {
    this.$onInit = () => {
        this.ROUTES = ROUTES
        this.basketSubscription = shoppingListService.basket$
            .subscribe(data => this.basketItems = data)
        navbarService.setTitle('BASKET')
    }
    this.$onDestroy = () => {
        this.basketSubscription.unsubscribe()
    }

    this.onRemoveItem = ($event, item) => {
        shoppingListService.removeFromBasket(item)
    }

    this.onBuyAll = () => {
        shoppingListService.buyAll()
    }
}
basketController.$inject = ['shoppingListService', 'navbarService']
export const basketComponent = {
    template: require('./basket.component.html'),
    //styleUrls: [require('./basket.component.css')],
    controller: basketController
};
