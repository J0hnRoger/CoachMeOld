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
        state : { rest : boolean, lastRest : boolean, finished : boolean}
        
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
            'reps': '=',
            'whenFinish' : '='
        };
        
        constructor(private logger : blocks.logger.Logger, private $interval : ng.IIntervalService) {}
        
        link = (scope : IChronoScope, element : ng.IAugmentedJQuery, attrs : ng.IAttributes ) => {
            var stopTime : ng.IPromise<any>;
            var repsMode : boolean = scope.reps > 0;
            scope.current = 0;
            scope.initialDuration = scope.duration;
            
            scope.state = {
                rest : false,
                lastRest : false,                
                finished : false
            };
            
            if (!repsMode){
                scope.start = () => {
                    stopTime = this.$interval(() => {
                            scope.duration = scope.duration - 1;
                            if (scope.duration == 0){
                                if (scope.state.rest){
                                    scope.duration = scope.initialDuration;
                                }
                                else {
                                  scope.current++;
                                  scope.duration = scope.rest;
                                }
                                
                                scope.state.rest = !scope.state.rest;
                                //emettre sonnerie
                                //Finished conditions
                                if (scope.state.lastRest)
                                {
                                    this.$interval.cancel(stopTime);
                                    scope.state.finished = true;
                                    scope.whenFinish();                                    
                                }
                                
                                if (scope.current == scope.rounds)
                                {
                                    scope.duration = scope.restAfter;
                                    scope.state.lastRest = true;
                                }
                            }
                        }, 1000); 
                }
                
                function fireLastRest() {
                    
                }
                
                scope.stop = () => {
                    this.$interval.cancel(stopTime);
                    stopTime = undefined; 
                }
                
                scope.toggle = () => {
                    if (angular.isDefined(stopTime)) 
                        scope.stop();
                    else 
                        scope.start();
                }
            }
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
