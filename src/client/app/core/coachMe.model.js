var app;
(function (app) {
    var domain;
    (function (domain) {
        var Workout = (function () {
            function Workout(data) {
                var _this = this;
                this.currentExerciseIndex = 0;
                this.done = false;
                if (data['_id'] != undefined)
                    this.id = data['_id'];
                if (data['workout_date'] != undefined)
                    this.date = data['workout_date'];
                if (data['exercices'] != undefined) {
                    this.exercises = [];
                    angular.forEach(data['exercices'], function (exercise) {
                        var exercise = new Exercise(exercise);
                        _this.exercises.push(exercise);
                    });
                }
                if (data['name'] != undefined)
                    this.name = data['name'];
            }
            Workout.prototype.getCurrentExercise = function () {
                var exercise = this.exercises[this.currentExerciseIndex];
                if (this.currentExerciseIndex < this.exercises.length)
                    this.currentExerciseIndex++;
                return exercise;
            };
            ;
            Workout.prototype.getFormatedDate = function () {
                var moment = window.moment(this.date);
                return moment.format('D MMMM YYYY');
            };
            return Workout;
        })();
        domain.Workout = Workout;
        var Exercise = (function () {
            function Exercise(data) {
                this.id = data._id;
                this.name = data.name;
                this.familly = data.familly;
                this.duration = data.duration;
                this.reps = data.reps;
                this.rounds = data.rounds;
                this.rest = data.rest;
            }
            return Exercise;
        })();
        domain.Exercise = Exercise;
        var Worker = (function () {
            function Worker(data) {
                var _this = this;
                if (data.planned_workout != undefined) {
                    this.plannedWorkout = [];
                    angular.forEach(data.planned_workout, function (workout) {
                        _this.plannedWorkout.push(new Workout(workout));
                    });
                }
                if (data.performedWorkout != undefined) {
                    this.performedWorkout = [];
                    angular.forEach(data.performedWorkout, function (workout) {
                        _this.performedWorkout.push(new Workout(workout));
                    });
                }
                if (data.performance != undefined)
                    this.performance = data.performance;
                if (data._id != undefined)
                    this.id = data._id;
            }
            Worker.prototype.getNextWorkout = function () {
                if (this.plannedWorkout.length > 0)
                    this.currentWorkout = this.plannedWorkout[0];
                return this.currentWorkout;
            };
            Worker.prototype.archiveWorkout = function () {
            };
            return Worker;
        })();
        domain.Worker = Worker;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=coachMe.model.js.map