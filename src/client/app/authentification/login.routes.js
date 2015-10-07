var app;
(function (app) {
    var authentification;
    (function (authentification) {
        'use strict';
        angular
            .module('app.authentification')
            .config(configureStates);
        configureStates.$inject = ['$stateProvider'];
        /* @ngInject */
        function configureStates($stateProvider) {
            var states = getStates();
            states.forEach(function (state) {
                $stateProvider.state(state.state, state.config);
            });
        }
        function getStates() {
            return [
                {
                    state: 'authentification',
                    config: {
                        url: '/',
                        templateUrl: 'app/authentification/login.html',
                        controller: 'loginController',
                        controllerAs: 'vm',
                        title: 'Authentification',
                        settings: {
                            nav: 1,
                            content: '<i class="fa fa-sign-in"></i> Login'
                        }
                    }
                }
            ];
        }
    })(authentification = app.authentification || (app.authentification = {}));
})(app || (app = {}));
//# sourceMappingURL=login.routes.js.map