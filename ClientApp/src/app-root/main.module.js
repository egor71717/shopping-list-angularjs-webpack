import uirouter from "@uirouter/angularjs"

//components
import { appRootComponent } from './_files/app-root.component'
import { authComponent } from './auth/auth.component'
import { shoppingListComponent } from './shopping-list/_files/shopping-list.component'
import { shoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component'
import { shoppingListSettingsComponent } from './shopping-list/shopping-list-settings/shopping-list-settings.component'
import { shoppingListAddComponent } from './shopping-list/shopping-list-add/shopping-list-add.component'
import { modalWindowComponent } from './modal-window/modal-window.component'
import { basketComponent } from './basket/basket.component'
import { navbarComponent } from './navbar/navbar.component'

//constants
import { COMPONENT_NAME } from '../constants/component-names.constant'

//services
import { authServiceFactory } from "./auth/auth.service"
import { shoppingListServiceFactory } from './shopping-list/_files/shopping-list.service'
import { navbarServiceFactory } from './navbar/navbar.service'
import { authHeaderInterceptor } from './auth/auth-header.interceptor'

//configs
import { routesConfig } from  '../configs/routes.config'
import { interceptorsConfig } from '../configs/interceptors.config'
import { authHookRunBlock } from './auth/auth.hook'
//import { httpInterceptorsConfig } from '../configs/http-interceptors.config'

export const MAIN_MODULE = angular.module('angularJSClientApp', [uirouter])

//register components
MAIN_MODULE.component(COMPONENT_NAME.MODAL_WINDOW,              modalWindowComponent)
MAIN_MODULE.component(COMPONENT_NAME.ROOT,                      appRootComponent)
MAIN_MODULE.component(COMPONENT_NAME.AUTH,                      authComponent)
MAIN_MODULE.component(COMPONENT_NAME.SHOPPING_LIST,             shoppingListComponent)
MAIN_MODULE.component(COMPONENT_NAME.SHOPPING_LIST_ITEM,        shoppingListItemComponent)
MAIN_MODULE.component(COMPONENT_NAME.SHOPPING_LIST_SETTINGS,    shoppingListSettingsComponent)
MAIN_MODULE.component(COMPONENT_NAME.SHOPPING_LIST_ADD,         shoppingListAddComponent)
MAIN_MODULE.component(COMPONENT_NAME.BASKET,                    basketComponent)
MAIN_MODULE.component(COMPONENT_NAME.NAVBAR,                    navbarComponent)

//register services
MAIN_MODULE.factory('authService', authServiceFactory)
MAIN_MODULE.factory('shoppingListService', shoppingListServiceFactory)
MAIN_MODULE.factory('navbarService', navbarServiceFactory)
MAIN_MODULE.factory('authHeaderInterceptor', authHeaderInterceptor)

//config module
MAIN_MODULE.config(routesConfig)
MAIN_MODULE.config(interceptorsConfig)

//run blocks
MAIN_MODULE.run(authHookRunBlock)

