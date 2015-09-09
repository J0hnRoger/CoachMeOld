namespace app.domain {
	export class Workout {
		id : number;
		name : string;
		exercices : Exercise[];
		date : Date;
		constructor(data : any){
			if (data['_id'] != undefined)
				this.id = data['_id'];
			if (data['workout_date'] != undefined)
				this.date = data['workout_date'];
			if (data['exercices'] != undefined)
				angular.forEach(data['exercices'], (exerciseId : string) => {
					var exercise = new Exercise();
					exercise.id = exerciseId;
					this.exercices.push(exercise);
				});
			if (data['name'] != undefined)
				this.name = data['name'];
		}
	}
	
	export class Exercise {
		public id :string; 
		public name : number;
		public duration : number;
		public reps : number;
		public rounds : number;
		public rest : number;
		constructor () {}
	}
	
	export class Worker {
		currentWorkout : Workout;
		public name : string;
		public id : number;
		public plannedWorkout : Workout[];
		public performedWorkout : Workout[];
		public performance : number;
		
		constructor(data : any) {
			if (data.planned_workout != undefined)
				angular.forEach(data.planned_workout, (workout : {}) => {
					this.plannedWorkout.push(new Workout(workout))
				});
			if (data.performedWorkout != undefined)
				angular.forEach(data.performedWorkout, (workout : {}) => {
					this.performedWorkout.push(new Workout(workout));
				});
			if (data.performance != undefined)
				this.performance = data.performance;

			if (data._id != undefined)
				this.id = data._id;
		}
		
		getNextWorkout() {
			if (this.plannedWorkout.length > 0)
				this.currentWorkout = this.plannedWorkout[0]
		}
		
		archiveWorkout(){
					
		}
		
		
	}
}