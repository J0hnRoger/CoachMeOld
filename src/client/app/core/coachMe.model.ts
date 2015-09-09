namespace app.domain {

	export class Workout {
		id : number;
		name : string;
        exercises : Exercise[];
		date : Date;
		currentExerciseIndex:number = 0;
		done : boolean = false;
		
		constructor(data : any){
			if (data['_id'] != undefined)
				this.id = data['_id'];
			if (data['workout_date'] != undefined)
				this.date = data['workout_date'];
			if (data['exercices'] != undefined){
                this.exercises = [];
                angular.forEach(data['exercices'], (exercise : any) => {
                    var exercise = new Exercise(exercise);
                    this.exercises.push(exercise);
                });
            }
			if (data['name'] != undefined)
				this.name = data['name'];
		}
		
		getCurrentExercise() {
			var exercise = this.exercises[this.currentExerciseIndex];
			if (this.currentExerciseIndex < this.exercises.length)
				this.currentExerciseIndex++;
			return exercise;
		};
		
        getFormatedDate (){
            var moment = window.moment(this.date);
            return moment.format('D MMMM YYYY');
        }
	}

	export class Exercise {
		public familly : string;
		public id :string;
		public name : number;
		public duration : number;
		public reps : number;
		public rounds : number;
		public rest : number;
		
		constructor (data : any) {
			this.id = data._id;
			this.name = data.name;
			this.familly = data.familly;
			this.duration = data.duration;
			this.reps = data.reps ;
			this.rounds = data.rounds;
			this.rest = data.rest ;
		}
	}

	export class Worker {
		currentWorkout : Workout;
		public name : string;
		public id : number;
		public plannedWorkout : Workout[] ;
		public performedWorkout : Workout[];
		public performance : number;

		constructor(data : any) {
			if (data.planned_workout != undefined)
            {
                this.plannedWorkout = [];
                angular.forEach(data.planned_workout, (workout : {}) => {
                    this.plannedWorkout.push(new Workout(workout))
                });
            }
			if (data.performedWorkout != undefined)
            {
                this.performedWorkout = [];
                angular.forEach(data.performedWorkout, (workout : {}) => {
					this.performedWorkout.push(new Workout(workout));
				});
            }
			if (data.performance != undefined)
				this.performance = data.performance;

			if (data._id != undefined)
				this.id = data._id;
		}

		getNextWorkout() : Workout {
			if (this.plannedWorkout.length > 0)
				this.currentWorkout = this.plannedWorkout[0];
            return this.currentWorkout;
		}

		archiveWorkout(){

		}


	}
}
