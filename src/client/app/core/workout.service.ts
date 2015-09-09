namespace app.core {
    'use strict';

    export interface IWorkoutService {
        currentWorker : app.domain.Worker;
        getWorker(userId : string) : ng.IPromise<app.domain.Worker>;
    }

    export class WorkoutService implements IWorkoutService {

        public currentWorker : app.domain.Worker;

        static $inject: Array<string> = ['$http', '$q', 'exception', 'logger'];
        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private exception: blocks.exception.IException,
            private logger: blocks.logger.Logger) {
        }

        getWorker: (userId : string) => ng.IPromise<app.domain.Worker> = (userId : string) =>
            this.$http.get('/api/cobject/v1/users/'+ userId +'?populate=true')
                .then(this.success)
                .catch(this.fail);
        
        private success: (worker: app.domain.Worker) => {} = (response : any) => {
            this.currentWorker = new app.domain.Worker(response.data);
            return this.currentWorker;
        };
        
        private fail: (error: any) => {} = (error) => {
            var msg = error.data.description;
            var reason = 'query for get current workout failed.';
            this.exception.catcher(msg)(reason);
            return this.$q.reject(msg);
        }
        
        loadNextWorkout: () => ng.IPromise<app.domain.Workout> = () => {
            var defer = this.$q.defer();
           this.$http.get('/api/cobject/v1/seance/'+ this.currentWorker.getNextWorkout().id +'?populate=true')
                .then((response) => {
                    this.currentWorker.currentWorkout = new app.domain.Workout(response.data);
                    defer.resolve(this.currentWorker.currentWorkout);
                });
            return defer.promise;
        }
        
        private successWorkout : (worker: app.domain.Workout) => {} = (response : any) => {
            this.currentWorker.currentWorkout = new app.domain.Workout(response.data);
            return this.currentWorker;
        };
    }

    angular
        .module('app.core')
        .service('workoutservice', WorkoutService);
}


