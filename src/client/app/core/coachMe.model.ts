namespace app.domain {

	export class Workout {
		id : number;
		name : string;
        exercises : Exercise[];
		date : Date;
		currentExerciseIndex:number = 0;
		done : boolean = false;
		description : string;
		currentExercise : Exercise;

		constructor(data : any){
			if (data['_id'] != undefined)
				this.id = data['_id'];
			if (data['workout_date'] != undefined)
				this.date = data['workout_date'];
			if (data['exercices'] != undefined){
                this.exercises = [];
                angular.forEach(data['exercices'], (exercise : any) => {
                    var newExercise : Exercise = new Exercise(exercise);
                    this.exercises.push(newExercise);
                });
				this.currentExercise = this.exercises[0];
            }
			if (data['description'] != undefined)
				this.description = data['description'];
			if (data['name'] != undefined)
				this.name = data['name'];
		}

		getNextExercise() {
			this.exercises[this.currentExerciseIndex].done = true;
			if (this.currentExerciseIndex < this.exercises.length)
				this.currentExerciseIndex++;
			this.currentExercise = this.exercises[this.currentExerciseIndex];

			return this.currentExercise;
		}

        getFormatedDate (){
            var moment = window.moment(this.date);
            return moment.format('D MMMM YYYY');
        }

        getExercisesScores() {
            return {"55eff1bff835d9b85836c591":"60","55eff2baf835d9b85836c592":"6-6-6","55eff2d5f835d9b85836c593":"8-7-6","55eff337f835d9b85836c594":"4-4-4","55eff3e9f835d9b85836c595":"9-6-4","55eff430f835d9b85836c596":"3-9-2","55f1d1bf9370b34c174328f7":"5-6-5"};
        }
    };


	export class Familly {
		static colors : any = {
			"Echauffement" : "#52b9e9",
			"Bas du corps" : "#43c83c",
			"Entrainement poitrine" : "#ED5565",
			"Entrainement ventre" : "#f88529"
		}
		color : string;
		constructor(public name : string){
			this.color = Familly.colors[name];
		}
	}

	export class Exercise {
		public familly : Familly;
		public id :string;
		public name : number;
		public duration : number;
		public reps : number;
		public rounds : number;
		public rest : number;
		public restAfter : number;
		public done : boolean;
        public lastReps : [any];

		constructor (data : any) {
			this.id = data._id;
			this.name = data.name;
			this.familly = new Familly(data.familly);
			this.duration = data.duration;
			this.reps = data.reps ;
			this.rounds = data.rounds;
			this.rest = data.rest ;
			this.restAfter = data.restAfter;
			this.done = false;
		}

        setLastReps = (strReps : string) => {
            //http://stackoverflow.com/questions/15488342/binding-inputs-to-an-array-of-primitives-using-ngrepeat-uneditable-inputs
            //Utiliser track by ID > v.1.2.1
            this.lastReps = strReps.split('-').map((text) => {
                return { value : parseInt(text) };
            });
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

    export class Record {
        public workout:Workout;
        public workoutDate:Date;
        public exercisesScores:any;
        public workoutPoints:number;
        public workerId:number;
        public id: number;

        constructor (data : any) {
            this.id = data._id;
            this.workerId = data.worker;
            this.exercisesScores = data.exercisesScores;
            this.workoutDate = data.workout_date;
            this.workoutPoints = data.workout_points;
        }
    }

    export class Round {
        public index : number;
        public score : number;
        constructor(public index : number, public score : number){
        }
    }
}
