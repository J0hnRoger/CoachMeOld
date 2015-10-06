var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        var WorkoutService = (function () {
            function WorkoutService($http, $q, exception, logger) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.getWorker = function (userId) {
                    return _this.$http.get('/api/cobject/v1/users/' + userId + '?populate=true')
                        .then(_this.success)
                        .catch(_this.fail);
                };
                this.success = function (response) {
                    _this.currentWorker = new app.domain.Worker(response.data);
                    return _this.currentWorker;
                };
                this.fail = function (error) {
                    var msg = error.data.description;
                    var reason = 'query for get current workout failed.';
                    _this.exception.catcher(msg)(reason);
                    return _this.$q.reject(msg);
                };
                this.loadNextWorkout = function () {
                    var defer = _this.$q.defer();
                    _this.$http.get('/api/cobject/v1/seance/' + _this.currentWorker.getNextWorkout().id + '?populate=true')
                        .then(function (response) {
                        _this.currentWorker.currentWorkout = new app.domain.Workout(response.data);
                        defer.resolve(_this.currentWorker.currentWorkout);
                    });
                    return defer.promise;
                };
                this.successWorkout = function (response) {
                    _this.currentWorker.currentWorkout = new app.domain.Workout(response.data);
                    return _this.currentWorker;
                };
                this.bindLastRecord = function () {
                    var defer = _this.$q.defer();
                    if (_this.currentWorker.currentWorkout == undefined)
                        _this.loadNextWorkout();
                    var that = _this;
                    _this.$http.get('/api/cobject/v1/workoutrecord?n=1&sort=workout_date')
                        .then(function (response) {
                        var lastRecord = new app.domain.Record(response.data.data[0]);
                        angular.forEach(that.currentWorker.currentWorkout.exercises, function (exercise) {
                            if (lastRecord.exercisesScores[exercise.id] != undefined) {
                                exercise.setLastReps(lastRecord.exercisesScores[exercise.id]);
                            }
                        });
                        defer.resolve();
                    });
                    return defer.promise;
                };
                this.saveWorkout = function () {
                    var defer = _this.$q.defer();
                    if (_this.currentWorker.currentWorkout == undefined)
                        _this.loadNextWorkout();
                    var that = _this;
                    //that.currentWorker.currentWorkout.getExercisesScores();
                    _this.$http.post('/api/cobject/v1/workoutrecord', {
                        "exercisesScores": "{\"55eff1bff835d9b85836c591\":\"60\",\"55eff2baf835d9b85836c592\":\"6-6-6\",\"55eff2d5f835d9b85836c593\":\"8-7-6\",\"55eff337f835d9b85836c594\":\"4-4-4\",\"55eff3e9f835d9b85836c595\":\"9-6-4\",\"55eff430f835d9b85836c596\":\"3-9-2\",\"55f1d1bf9370b34c174328f7\":\"5-6-5\"}",
                        "worker": that.currentWorker.id,
                        "workout": that.currentWorker.currentWorkout.id,
                        "workout_date": new Date().toJSON(),
                        "workout_points": "500"
                    }).then(function (response) {
                        defer.resolve(_this.lastRecord);
                    });
                    return defer.promise;
                };
            }
            WorkoutService.$inject = ['$http', '$q', 'exception', 'logger'];
            return WorkoutService;
        })();
        core.WorkoutService = WorkoutService;
        angular
            .module('app.core')
            .service('workoutservice', WorkoutService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=workout.service.js.map