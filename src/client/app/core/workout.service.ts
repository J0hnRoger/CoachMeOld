namespace app.core {
    'use strict';

    export interface IWorkoutService {
        getCurrentWorker(userId : string) : ng.IPromise<app.domain.Worker>;
    } 

    export class WorkoutService implements IWorkoutService {
        static $inject: Array<string> = ['$http', '$q', 'exception', 'logger', 'coachMeUrl'];
        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private exception: blocks.exception.IException,
            private logger: blocks.logger.Logger,
            private coachMeUrl : string) {
        }
                
        getCurrentWorker: (userId : string) => ng.IPromise<app.domain.Worker> = (userId : string) => 
            this.$http.get(this.coachMeUrl +'/api/cobject/v1/users/'+ userId +'?populate=true')
                .then(this.success)
                .catch(this.fail);
        
        private success: (worker: app.domain.Worker) => {} = (response : any) => {
            var worker : app.domain.Worker = new app.domain.Worker(response.data)
            return worker;
        };

        private fail: (error: any) => {} = (error) => {
            var msg = error.data.description;
            var reason = 'query for get current worker failed.';
            this.exception.catcher(msg)(reason);
            return this.$q.reject(msg);
        }
    }
    
    angular
        .module('app.core')
        .service('workoutservice', WorkoutService);
}


