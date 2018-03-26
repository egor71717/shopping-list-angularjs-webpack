const navbarController = function(authService, navbarService, $scope){
    this.$onInit = () => {
        this.isAuthenticatedSubscription = authService.isAuthenticated$
            .subscribe(data => this.isAuthenticated = data)
        this.titleSubscription = navbarService.title$
            .subscribe(data => {
                this.title = data
                this.showList = (data === 'SHOPPING LIST')
                this.showBasket = (data === 'BASKET')
            })
        this.currentUserSubscription = authService.currentUser$
            .subscribe(data => this.currentUser = data)
    }

    this.$onDestroy = () => {
        this.isAuthenticatedSubscription.unsubscribe()
        this.titleSubscription.unsubscribe()
        this.currentUserSubscription.unsubscribe()
    }

    this.onLogoutClick = () => {
        authService.logout()
    }
}
navbarController.$inject = ['authService', 'navbarService', '$scope']
export const navbarComponent = {
    template: require('./navbar.component.html'),
    styleUrls: [require('./navbar.component.css')],
    controller: navbarController
}

