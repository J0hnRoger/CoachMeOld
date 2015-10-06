namespace app.widgets {
    'use strict';

    interface IChronoScope {
        current : number;
        initialDuration : number;
        state : {   rest : boolean;
                    lastRest : boolean;
                };
        exercise : app.domain.Exercise;
        showRestButton : boolean;
        start() : void;
        stop() : void;
        toggle() : void;
        finishSerie() : void;
        whenFinish() : void;
    }

    //Usage:
    //<chrono-reps duration="20" rest="25" reps="0" rounds="6"/>
    // Creates:
    class RepsChrono implements ng.IDirective {


        templateUrl: string = 'app/widgets/reps-chrono.html';
        restrict: string = 'EA';
        scope = {
            'exercise' : '=',
            'whenFinish' : '=',
            'start' : '='
        };

        static $inject: Array<string> = ['logger', '$interval'];
        constructor(private logger : blocks.logger.Logger, private $interval : ng.IIntervalService) {}

        link = (scope : IChronoScope, element : ng.IAugmentedJQuery ) => {
            var stopTime : ng.IPromise<any>;

            scope.state = {
                rest : true,
                lastRest : false,
                finished : false
            };

            scope.start = () => {
                if (stopTime != undefined)
                    return;
                stopTime = this.$interval(() => {
                    scope.exercise.rest = scope.exercise.rest - 1;
                    if (scope.exercise.rest == 0){
                        scope.exercise.rest = scope.initialRest;

                        //Finished conditions
                        if (scope.state.lastRest)
                        {
                            scope.stop();
                            scope.state.finished = true;
                            scope.whenFinish();
                        }

                        if (scope.current == scope.exercise.rounds - 1)
                        {
                            scope.exercise.rest = scope.exercise.restAfter;
                            scope.state.lastRest = true;
                        }
                        scope.state.rest = false;
                        scope.stop();
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

            scope.finishSerie = () => {
                scope.current++;
                scope.state.rest = true;
                scope.start();
            };

            scope.range = (n) => {
              return new Array(n);
            };

            scope.$watch("exercise", (newExercise) => {
                if (newExercise == undefined || newExercise.reps == 0)
                    return;
                scope.current = 0;

                scope.state.rest = false;
                scope.state.lastRest = false;
                scope.initialRest = newExercise.rest;
            });
        };

        static factory(): ng.IDirectiveFactory {
            var directive: ng.IDirectiveFactory =
                (logger:blocks.logger.Logger, $interval : ng.IIntervalService) => new RepsChrono(logger, $interval);
            return directive;
        }
    }

    angular
        .module('app.widgets')
        .directive('repsChrono', RepsChrono.factory());
}
