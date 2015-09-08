namespace app.widgets {
    'use strict';
    
    interface IChronoScope {
        current : number;
        time : number;
        reps : number;
        rest : number;
        rounds : number
        duration : number;
        state : { rest : boolean, finished : boolean}
        
        start() : void;
        stop() : void;
        toggle() : void;
    }
    
    //Usage:
    //<coach-chrono duration="20" rest="25" reps="0" rounds="6"/>
    // Creates:
    class CoachChrono implements ng.IDirective {
        static $inject: Array<string> = ['logger', '$interval'];
        
        templateUrl: string = 'app/widgets/coach-chrono.html';
        restrict: string = 'EA';
        scope: {} = {
            'duration': '@',
            'rounds': '@',
            'rest': '@',
            'reps': '@',
            'whenFinish' : '='
        };
        
        constructor(private logger : blocks.logger.Logger, private $interval : ng.IIntervalService) {}
        
        link = (scope : IChronoScope, element : ng.IAugmentedJQuery, attrs : ng.IAttributes ) => {
            var stopTime : ng.IPromise<any>;
            var repsMode = scope.reps > 0;
            scope.current = 0;
            scope.time = scope.duration;
            
            scope.state = {
                rest : false,
                finished : false
            };
            
            if (!repsMode){
                scope.start = () => {
                    stopTime = this.$interval(() => {
                            scope.time = scope.time - 1;
                            if (scope.time == 0){
                                
                                if (scope.state.rest){
                                    scope.time = scope.duration
                                }
                                else {
                                  scope.current++;
                                  scope.time = scope.rest;
                                }
                                
                                scope.state.rest = !scope.state.rest;
                                //emettre sonnerie
                                if (scope.current == scope.rounds){
                                    this.$interval.cancel(stopTime);
                                    scope.state.finished = true;
                                    scope.whenFinish();                                    
                                }
                            }
                        }, 1000); 
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
