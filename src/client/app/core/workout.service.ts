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
        };

        private successWorkout : (worker: app.domain.Workout) => {} = (response : any) => {
            this.currentWorker.currentWorkout = new app.domain.Workout(response.data);
            return this.currentWorker;
        };

        bindLastRecord: () => ng.IPromise<app.domain.Workout> = () => {
            var defer = this.$q.defer();
            if (this.currentWorker.currentWorkout == undefined)
                this.loadNextWorkout();
            var that = this;
            this.$http.get('/api/cobject/v1/workoutrecord?n=1&sort=workout_date')
                .then((response) => {
                    var lastRecord : Record = new app.domain.Record(response.data.data[0]);
                    angular.forEach(that.currentWorker.currentWorkout.exercises, (exercise) => {
                        if(lastRecord.exercisesScores[exercise.id] != undefined){
                            exercise.setLastReps(lastRecord.exercisesScores[exercise.id]);
                        }
                    });
                    defer.resolve();
                });
            return defer.promise;
        };

        saveWorkout = () => {
            var defer = this.$q.defer();
            if (this.currentWorker.currentWorkout == undefined)
                this.loadNextWorkout();
            var that = this;
            //that.currentWorker.currentWorkout.getExercisesScores();
            this.$http.post('/api/cobject/v1/workoutrecord', {
                "exercisesScores": "{\"55eff1bff835d9b85836c591\":\"60\",\"55eff2baf835d9b85836c592\":\"6-6-6\",\"55eff2d5f835d9b85836c593\":\"8-7-6\",\"55eff337f835d9b85836c594\":\"4-4-4\",\"55eff3e9f835d9b85836c595\":\"9-6-4\",\"55eff430f835d9b85836c596\":\"3-9-2\",\"55f1d1bf9370b34c174328f7\":\"5-6-5\"}",
                "worker": that.currentWorker.id,
                "workout": that.currentWorker.currentWorkout.id,
                "workout_date": new Date().toJSON(),
                "workout_points": "500"
            }).then((response) => {
                    defer.resolve(this.lastRecord);
            });
            return defer.promise;
        };
    }

    angular
        .module('app.core')
        .service('workoutservice', WorkoutService);
}


