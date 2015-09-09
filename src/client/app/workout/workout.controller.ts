namespace app.workout {
	class WorkoutController {
		CurrentWorkout : app.domain.Workout;
		static $inject : Array<string> = ['logger'];
		constructor(public logger: blocks.logger.Logger){
		}
		
		finished = () =>  {
			this.logger.info("Exercise finished");
		}
	}
	
	angular.module('app.workout')
		.controller("WorkoutController", WorkoutController);
}