var app;
(function (app) {
    var workout;
    (function (workout) {
        var WorkoutController = (function () {
            function WorkoutController(logger) {
                var _this = this;
                this.logger = logger;
                this.finished = function () {
                    _this.logger.info("Exercise finished");
                };
            }
            WorkoutController.$inject = ['logger'];
            return WorkoutController;
        })();
        angular.module('app.workout')
            .controller("WorkoutController", WorkoutController);
    })(workout = app.workout || (app.workout = {}));
})(app || (app = {}));
//# sourceMappingURL=workout.controller.js.map