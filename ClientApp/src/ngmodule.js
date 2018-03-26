import { MAIN_MODULE } from './app-root/main.module'

//import { StickyStatesPlugin } from '@uirouter/sticky-states';

export let app = angular.module('ngModule', [
    MAIN_MODULE.name
]);

// const appConfig = function($uiRouter){
//     $uiRouter.plugin(StickyStatesPlugin);
// }
// appConfig.$inject = ['$uiRouterProvider']
