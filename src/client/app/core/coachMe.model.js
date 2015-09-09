var app;
(function (app) {
    var domain;
    (function (domain) {
        var Workout = (function () {
            function Workout(data) {
                var _this = this;
                if (data['_id'] != undefined)
                    this.id = data['_id'];
                if (data['workout_date'] != undefined)
                    this.date = data['workout_date'];
                if (data['exercices'] != undefined)
                    angular.forEach(data['exercices'], function (exerciseId) {
                        var exercise = new Exercise();
                        exercise.id = exerciseId;
                        _this.exercices.push(exercise);
                    });
                if (data['name'] != undefined)
                    this.name = data['name'];
            }
            return Workout;
        })();
        domain.Workout = Workout;
        var Exercise = (function () {
            function Exercise() {
            }
            return Exercise;
        })();
        domain.Exercise = Exercise;
        var Worker = (function () {
            function Worker(data) {
                var _this = this;
                if (data.planned_workout != undefined)
                    angular.forEach(data.planned_workout, function (workout) {
                        _this.plannedWorkout.push(new Workout(workout));
                    });
                if (data.performedWorkout != undefined)
                    angular.forEach(data.performedWorkout, function (workout) {
                        _this.performedWorkout.push(new Workout(workout));
                    });
                if (data.performance != undefined)
                    this.performance = data.performance;
                if (data._id != undefined)
                    this.id = data._id;
            }
            Worker.prototype.getNextWorkout = function () {
                if (this.plannedWorkout.length > 0)
                    this.currentWorkout = this.plannedWorkout[0];
            };
            Worker.prototype.archiveWorkout = function () {
            };
            return Worker;
        })();
        domain.Worker = Worker;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=coachMe.model.js.map