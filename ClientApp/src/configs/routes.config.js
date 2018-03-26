import { COMPONENT_NAME } from "../constants/component-names.constant"
import { ROUTES } from '../constants/routes.constant'

const routerStates = {
    shoppingListState: {
        name: 'shoppinglist',
        url: ROUTES.SHOPPINGLIST,
        component: COMPONENT_NAME.SHOPPING_LIST
    },
    basketState: {
        name: 'basket',
        url: ROUTES.BASKET,
        component: COMPONENT_NAME.BASKET
    },
    authState: {
        name: 'auth',
        url: ROUTES.AUTH,
        component:  COMPONENT_NAME.AUTH
    }  
}

export const routesConfig = ['$uiRouterProvider', '$locationProvider', ($uiRouter, $location) => {
    $location.hashPrefix('')
    $uiRouter.urlService.rules.otherwise({ state: 'shoppinglist' })
    for(let state in routerStates){
        $uiRouter.stateRegistry.register(routerStates[state])
    }
}]