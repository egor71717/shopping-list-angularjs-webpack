const shoppingListSettingsController = function(shoppingListService){
    this.$onInit = () => {
        this.settingsSubscription = shoppingListService.settings$.subscribe(settings => {
            this.settings = settings
        })
    },

    this.$onDestroy = () => {
        this.settingsSubscription.unsubscribe()
    }
    this.onSaveSettingsClick = () => {
        shoppingListService.setSettings(this.settings)
        shoppingListService.setShowSettings(false)
    }
    this.onCloseSettingsClick = () => {
        shoppingListService.setShowSettings(false)
    }
}
shoppingListSettingsController.$inject = ['shoppingListService'];
export const shoppingListSettingsComponent = {
    template: require('./shopping-list-settings.component.html'),
    //styleUrls: [require('./shopping-list-settings.component.css')],
    controller: shoppingListSettingsController,
    require:{
        shoppingList: '^appShoppingList'
    }
};
