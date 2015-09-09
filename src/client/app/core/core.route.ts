namespace app.core {
// ((): void => {
// })();
// What: Creates an IIFE
// When: Use when you have no TypeScript components to export
// Less function wrapping
    'use strict';

    angular
        .module('app.core')
        .config(configureStates)
        .run(appRun);
        
    appRun.$inject = ['RouterHelper', '$httpBackend'];
    function appRun(RouterHelper: blocks.router.IRouterHelper, $httpBackend : any) { 
        $httpBackend.whenGET('/*.html*/').passThrough();
    }

    configureStates.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$provide'];
    /* @ngInject */
    function configureStates($stateProvider: ng.ui.IStateProvider,
        $locationProvider: ng.ILocationProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $provide : any) {
        var otherwise = '/404';
        var states = getStates();
        states.forEach(function (state) {
            $stateProvider.state(state.state, state.config);
        });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise(otherwise);
        
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            }
        ];
    }
}