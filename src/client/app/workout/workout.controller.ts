namespace app.workout {
	class WorkoutController {
		CurrentWorkout : app.domain.Workout;
		CurrentExercise: app.domain.Exercise;
		startChrono : Function;

        static $inject : Array<string> = ['logger', 'workoutservice'];
		constructor(public logger: blocks.logger.Logger, public workoutservice : app.core.WorkoutService){
		    if (workoutservice.currentWorker != undefined)
            {
				workoutservice.loadNextWorkout()
					.then( (workout) => {
						this.CurrentWorkout = workoutservice.currentWorker.currentWorkout;
						this.CurrentExercise = this.CurrentWorkout.currentExercise;

                        this.CurrentExercise.duration = 2;
                        this.CurrentExercise.rest = 1;
                        this.CurrentExercise.restAfter = 1;

                        this.startChrono();
                    });
            }
        }

		finished = () =>  {
			this.CurrentExercise = this.CurrentWorkout.getNextExercise();
            if (this.CurrentExercise == undefined){
                this.logger.info("Exercise finished");
                this.CurrentWorkout.isFinished = true;
            }
            else {
                this.CurrentExercise.duration = 1;
                this.CurrentExercise.rest = 1;
                this.CurrentExercise.restAfter = 1;
                this.logger.info("Exercise finished");

            }


		}
	}

	angular.module('app.workout')
		.controller("WorkoutController", WorkoutController);
}
