namespace app.workout {
	class WorkoutController {
		CurrentWorkout : app.domain.Workout;
		CurrentExercise: app.domain.Exercise;
		
        static $inject : Array<string> = ['logger', 'workoutservice'];
		constructor(public logger: blocks.logger.Logger, workoutservice : app.core.WorkoutService){
		    if (workoutservice.currentWorker != undefined)
            {
				workoutservice.loadNextWorkout()
					.then( (workout) => {
						this.CurrentWorkout = workoutservice.currentWorker.currentWorkout;
						this.CurrentExercise = this.CurrentWorkout.getCurrentExercise();
					});
            }
        }

		finished = () =>  {
			this.logger.info("Exercise finished");
		}
	}

	angular.module('app.workout')
		.controller("WorkoutController", WorkoutController);
}
