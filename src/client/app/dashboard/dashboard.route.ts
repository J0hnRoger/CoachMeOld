namespace app.dashboard {
    'use strict';

    angular
        .module('app.dashboard')
        .config(configureStates);

    configureStates.$inject = ['$stateProvider'];
    /* @ngInject */
    function configureStates($stateProvider: ng.ui.IStateProvider) {
        var states = getStates();
        states.forEach(function (state) {
            $stateProvider.state(state.state, state.config);
        });
    }

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'dashboard',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }
}
