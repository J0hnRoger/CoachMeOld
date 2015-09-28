var app;
(function (app) {
    var widgets;
    (function (widgets) {
        'use strict';
        //Usage:
        //<coach-chrono duration="20" rest="25" reps="0" rounds="6"/>
        // Creates:
        var DurationChrono = (function () {
            function DurationChrono(logger, $interval) {
                var _this = this;
                this.logger = logger;
                this.$interval = $interval;
                this.templateUrl = 'app/widgets/coach-chrono.html';
                this.restrict = 'EA';
                this.scope = {
                    'exercise': '=',
                    'whenFinish': '=',
                    'start': '='
                };
                this.link = function (scope, element, attrs) {
                    var stopTime, restTime;
                    scope.state = {
                        rest: false,
                        lastRest: false,
                        finished: false
                    };
                    scope.start = function () {
                        if (stopTime != undefined)
                            return;
                        stopTime = _this.$interval(function () {
                            scope.exercise.duration = scope.exercise.duration - 1;
                            if (scope.exercise.duration == 0) {
                                if (scope.state.rest) {
                                    scope.exercise.duration = scope.initialDuration;
                                }
                                else {
                                    scope.current++;
                                    scope.exercise.duration = scope.exercise.rest;
                                }
                                scope.state.rest = !scope.state.rest;
                                //emettre sonnerie
                                //Finished conditions
                                if (scope.state.lastRest) {
                                    scope.stop();
                                    scope.state.finished = true;
                                    scope.whenFinish();
                                }
                                if (scope.current == scope.exercise.rounds) {
                                    scope.exercise.duration = scope.exercise.restAfter;
                                    scope.state.lastRest = true;
                                }
                            }
                        }, 1000);
                    };
                    scope.stop = function () {
                        _this.$interval.cancel(stopTime);
                        stopTime = undefined;
                    };
                    scope.toggle = function () {
                        if (angular.isDefined(stopTime))
                            scope.stop();
                        else
                            scope.start();
                    };
                    scope.$watch("exercise", function (newExercise) {
                        if (newExercise == undefined || newExercise.reps > 0)
                            return;
                        scope.current = 0;
                        scope.state.lastRest = false;
                        scope.initialDuration = newExercise.duration;
                        scope.start();
                    });
                };
            }
            DurationChrono.factory = function () {
                var directive = function (logger, $interval) { return new DurationChrono(logger, $interval); };
                return directive;
            };
            DurationChrono.$inject = ['logger', '$interval'];
            return DurationChrono;
        })();
        angular
            .module('app.widgets')
            .directive('durationChrono', DurationChrono.factory());
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=coach-chrono.directive.js.map