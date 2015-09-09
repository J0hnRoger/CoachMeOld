namespace app.dashboard {
    'use strict';

    interface IDashboardVm {
        title: string;
        currentWorker : app.domain.Worker;
    }

    export class DashboardController implements IDashboardVm {
        title: string = 'Coach Me';
        currentWorker : app.domain.Worker;
        
        static $inject: Array<string> = ['$q', 'workoutservice', 'logger'];
        constructor(private $q: ng.IQService,
            private workoutservice: app.core.WorkoutService,
            private logger: blocks.logger.Logger) {
            var promises = [];
            this.getCurrentWorker();
            this.$q.all(promises).then(function () {
                
                logger.info('Activated Dashboard View');
            });
        }

        getCurrentWorker() {
            var userTestId = "55eff9a4f835d9b85836c59d";
            return this.workoutservice.getCurrentWorker(userTestId)
                .then((data) => {
                    this.currentWorker = data;
                });
        }
    }

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);
}
