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
                    _this.logger.info("Exercise finished");
                };
                if (workoutservice.currentWorker != undefined) {
                    workoutservice.loadNextWorkout()
                        .then(function (workout) {
                        _this.CurrentWorkout = workoutservice.currentWorker.currentWorkout;
                        _this.CurrentExercise = _this.CurrentWorkout.currentExercise;
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