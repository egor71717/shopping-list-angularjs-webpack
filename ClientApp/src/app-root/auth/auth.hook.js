export const authHookRunBlock = ($transitions, authService) => {
    const redirectToLoginCriteria = {}
    const redirectToLogin = (transition) => {
        const isAuthTransition = transition.to().name === 'auth'
        if (!isAuthTransition && !authService.isAuthenticated$.getValue()) {
            return transition.router.stateService.target('auth');
        }
    };
    $transitions.onBefore(redirectToLoginCriteria, redirectToLogin);

    const redirectToShoppingListCriteria = { to: 'auth'}
    const redirectToShoppingList = (transition) => {
        if (authService.isAuthenticated$.getValue()) {
            return transition.router.stateService.target('shoppinglist');
        }
    }
    $transitions.onBefore(redirectToShoppingListCriteria, redirectToShoppingList);
}
authHookRunBlock.$inject = ['$transitions', 'authService'];