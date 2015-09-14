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
                        var newExercise = new Exercise(exercise);
                        _this.exercises.push(newExercise);
                    });
                    this.currentExercise = this.exercises[0];
                }
                if (data['description'] != undefined)
                    this.description = data['description'];
                if (data['name'] != undefined)
                    this.name = data['name'];
            }
            Workout.prototype.getNextExercise = function () {
                this.exercises[this.currentExerciseIndex].done = true;
                if (this.currentExerciseIndex < this.exercises.length)
                    this.currentExerciseIndex++;
                this.currentExercise = this.exercises[this.currentExerciseIndex];
                return this.currentExercise;
            };
            ;
            Workout.prototype.getFormatedDate = function () {
                var moment = window.moment(this.date);
                return moment.format('D MMMM YYYY');
            };
            return Workout;
        })();
        domain.Workout = Workout;
        var Familly = (function () {
            function Familly(name) {
                this.name = name;
                this.color = Familly.colors[name];
            }
            Familly.colors = {
                "Echauffement": "#52b9e9",
                "Bas du corps": "#43c83c",
                "Entrainement poitrine": "#ED5565",
                "Entrainement ventre": "#f88529"
            };
            return Familly;
        })();
        domain.Familly = Familly;
        var Exercise = (function () {
            function Exercise(data) {
                this.id = data._id;
                this.name = data.name;
                this.familly = new Familly(data.familly);
                this.duration = data.duration;
                this.reps = data.reps;
                this.rounds = data.rounds;
                this.rest = data.rest;
                this.restAfter = data.restAfter;
                this.done = false;
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