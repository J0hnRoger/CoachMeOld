var app;
(function (app) {
    var workout;
    (function (workout) {
        'use strict';
        angular
            .module('app.workout')
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
                    state: 'workout',
                    config: {
                        url: '/workout',
                        templateUrl: 'app/workout/workout.html',
                        controller: 'WorkoutController',
                        controllerAs: 'vm',
                        title: 'workout',
                        settings: {
                            nav: 3,
                            content: '<i class="fa fa-heartbeat"></i> Workout'
                        }
                    }
                }
            ];
        }
    })(workout = app.workout || (app.workout = {}));
})(app || (app = {}));
//# sourceMappingURL=workout.routes.js.map