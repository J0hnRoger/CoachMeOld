namespace app.widgets {
    'use strict';

    interface IChronoScope {
        current : number;
        initialDuration : number;
        reps : number;
        rest : number;
        restAfter : number;
        rounds : number
        duration : number;
        state : { rest : boolean, lastRest : boolean, finished : boolean};
        exercise : app.domain.Exercise;

        start() : void;
        stop() : void;
        toggle() : void;
        whenFinish() : void;
    }

    //Usage:
    //<coach-chrono duration="20" rest="25" reps="0" rounds="6"/>
    // Creates:
    class CoachChrono implements ng.IDirective {
        static $inject: Array<string> = ['logger', '$interval'];

        templateUrl: string = 'app/widgets/coach-chrono.html';
        restrict: string = 'EA';
        scope = {
            'duration': '=',
            'rounds': '=',
            'rest': '=',
            'restAfter' : '=',
            'exercise' : '=',
            'whenFinish' : '=',
            'start' : '='
        };

        constructor(private logger : blocks.logger.Logger, private $interval : ng.IIntervalService) {}

        link = (scope : IChronoScope, element : ng.IAugmentedJQuery, attrs : ng.IAttributes ) => {
            var stopTime : ng.IPromise<any>;

            scope.start = () => {

                if (stopTime != undefined)
                    return;
                stopTime = this.$interval(() => {
                    scope.exercise.duration = scope.exercise.duration - 1;
                    if (scope.exercise.duration == 0){
                        if (scope.state.rest){
                            scope.exercise.duration = scope.initialDuration;
                        }
                        else {
                            scope.current++;
                            scope.exercise.duration = scope.exercise.rest;
                        }

                        scope.state.rest = !scope.state.rest;
                        //emettre sonnerie
                        //Finished conditions
                        if (scope.state.lastRest)
                        {
                            this.$interval.cancel(stopTime);
                            scope.state.finished = true;
                            stopTime = null;
                            scope.whenFinish();
                        }

                        if (scope.current == scope.exercise.rounds)
                        {
                            scope.exercise.duration = scope.exercise.restAfter;
                            scope.state.lastRest = true;
                        }
                    }
                }, 1000);
            };

            scope.stop = () => {
                this.$interval.cancel(stopTime);
                stopTime = undefined;
            };

            scope.toggle = () => {
                if (angular.isDefined(stopTime))
                    scope.stop();
                else
                    scope.start();
            };

            scope.$watch("exercise", (newExercise) => {
                if (newExercise == undefined)
                    return;
                var repsMode : boolean = scope.reps > 0;
                scope.current = 0;
                scope.initialDuration = newExercise.duration;
                scope.state = {
                    rest : false,
                    lastRest : false,
                    finished : false
                };
                scope.current = 0;

                if (!repsMode){
                   scope.start();
                }
            });
        };

        static factory(): ng.IDirectiveFactory {
            var directive: ng.IDirectiveFactory =
              (logger:blocks.logger.Logger, $interval : ng.IIntervalService) => new CoachChrono(logger, $interval);
            return directive;
        }
    }

    angular
        .module('app.widgets')
        .directive('coachChrono', CoachChrono.factory());
}
