namespace app.workout {
    'use strict';

    angular
        .module('app.workout')
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
}
