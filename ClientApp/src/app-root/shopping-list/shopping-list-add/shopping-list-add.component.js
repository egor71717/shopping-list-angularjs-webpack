import { apiRoot } from '../../../constants/api-root.constant'
const shoppingListAddController = function(shoppingListService, authService){
    this.$onInit = () => {
        this.itemForm = {
            createdById: 0,
            name: "",
            description: ""
        }
        this.currentUserSubscription = authService.currentUser$
            .subscribe(data => this.currentUser = data)
    }

    this.$onDestroy = () => {
        this.currentUserSubscription.unsubscribe()
    }

    this.onSaveClick = () => {
        this.itemForm.createdById = this.currentUser.id //todo: get from token on server
        shoppingListService.createItem(this.itemForm)
    }
    this.onCloseItemClick = () => shoppingListService.setShowAddItem(false)
}
shoppingListAddController.$inject = ['shoppingListService', 'authService'];
export const shoppingListAddComponent = {
    template: require('./shopping-list-add.component.html'),
    //styleUrls: [require('./shopping-list-item.component.css')],
    controller: shoppingListAddController
};

//import './shopping-list-add.component.css'