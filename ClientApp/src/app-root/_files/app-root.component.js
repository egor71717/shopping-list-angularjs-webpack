const appRootController = function(authService){
    this.$onInit = () => {
        this.isAuthenticatedSubscription = authService.isAuthenticated$
            .subscribe(data => this.isAuthenticated = data)
    }
    this.$onDestroy = () => {
        this.isAuthenticatedSubscription.unsubscribe()
    }
}
appRootController.$inject = ['authService']
export const appRootComponent = {
    template: require('./app-root.component.html'),
    //styleUrls: [require('./app-root.component.css')],
    controller: appRootController
}

import './app-root.component.css'