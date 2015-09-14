var app;
(function (app) {
    var workout;
    (function (workout_1) {
        var WorkoutController = (function () {
            function WorkoutController(logger, workoutservice) {
                var _this = this;
                this.logger = logger;
                this.workoutservice = workoutservice;
                this.finished = function () {
                    _this.CurrentExercise = _this.CurrentWorkout.getNextExercise();
                    if (_this.CurrentExercise == undefined) {
                        _this.logger.info("Exercise finished");
                        _this.CurrentWorkout.isFinished = true;
                    }
                    else {
                        _this.CurrentExercise.duration = 1;
                        _this.CurrentExercise.rest = 1;
                        _this.CurrentExercise.restAfter = 1;
                        _this.logger.info("Exercise finished");
                    }
                };
                if (workoutservice.currentWorker != undefined) {
                    workoutservice.loadNextWorkout()
                        .then(function (workout) {
                        _this.CurrentWorkout = workoutservice.currentWorker.currentWorkout;
                        _this.CurrentExercise = _this.CurrentWorkout.currentExercise;
                        _this.CurrentExercise.duration = 2;
                        _this.CurrentExercise.rest = 1;
                        _this.CurrentExercise.restAfter = 1;
                        _this.startChrono();
                    });
                }
            }
            WorkoutController.$inject = ['logger', 'workoutservice'];
            return WorkoutController;
        })();
        angular.module('app.workout')
            .controller("WorkoutController", WorkoutController);
    })(workout = app.workout || (app.workout = {}));
})(app || (app = {}));
//# sourceMappingURL=workout.controller.js.map