namespace app.widgets {
    'use strict';

    interface IChronoScope {
        current : number;
        initialDuration : number;
        state : { rest : boolean, lastRest : boolean, finished : boolean};
        exercise : app.domain.Exercise;
        showRestButton : boolean;
        start() : void;
        stop() : void;
        toggle() : void;
        whenFinish() : void;
    }

    //Usage:
    //<coach-chrono duration="20" rest="25" reps="0" rounds="6"/>
    // Creates:
    class DurationChrono implements ng.IDirective {
        static $inject: Array<string> = ['logger', '$interval'];

        templateUrl: string = 'app/widgets/coach-chrono.html';
        restrict: string = 'EA';
        scope = {
            'exercise' : '=',
            'whenFinish' : '=',
            'start' : '='
        };

        constructor(private logger : blocks.logger.Logger, private $interval : ng.IIntervalService) {}

        link = (scope : IChronoScope, element : ng.IAugmentedJQuery, attrs : ng.IAttributes ) => {
            var stopTime : ng.IPromise<any>,
                restTime : ng.IPromise<any>;
            scope.state = {
                rest : false,
                lastRest : false,
                finished : false
            };

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
                            scope.stop();
                            scope.state.finished = true;
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
                if (newExercise == undefined || newExercise.reps > 0)
                    return;
                scope.current = 0;
                scope.state.lastRest = false;
                scope.initialDuration = newExercise.duration;
                scope.start();
            });
        };

        static factory(): ng.IDirectiveFactory {
            var directive: ng.IDirectiveFactory =
              (logger:blocks.logger.Logger, $interval : ng.IIntervalService) => new DurationChrono(logger, $interval);
            return directive;
        }
    }

    angular
        .module('app.widgets')
        .directive('durationChrono', DurationChrono.factory());
}
