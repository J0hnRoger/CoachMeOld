var app;
(function (app) {
    var widgets;
    (function (widgets) {
        'use strict';
        //Usage:
        //<coach-chrono duration="20" rest="25" reps="0" rounds="6"/>
        // Creates:
        var CoachChrono = (function () {
            function CoachChrono(logger, $interval) {
                var _this = this;
                this.logger = logger;
                this.$interval = $interval;
                this.templateUrl = 'app/widgets/coach-chrono.html';
                this.restrict = 'EA';
                this.scope = {
                    'duration': '=',
                    'rounds': '=',
                    'rest': '=',
                    'restAfter': '=',
                    'exercise': '=',
                    'whenFinish': '=',
                    'start': '='
                };
                this.link = function (scope, element, attrs) {
                    var stopTime;
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
                                    _this.$interval.cancel(stopTime);
                                    scope.state.finished = true;
                                    stopTime = null;
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
                        if (newExercise == undefined)
                            return;
                        var repsMode = scope.reps > 0;
                        scope.current = 0;
                        scope.initialDuration = newExercise.duration;
                        scope.state = {
                            rest: false,
                            lastRest: false,
                            finished: false
                        };
                        scope.current = 0;
                        if (!repsMode) {
                            scope.start();
                        }
                    });
                };
            }
            CoachChrono.factory = function () {
                var directive = function (logger, $interval) { return new CoachChrono(logger, $interval); };
                return directive;
            };
            CoachChrono.$inject = ['logger', '$interval'];
            return CoachChrono;
        })();
        angular
            .module('app.widgets')
            .directive('coachChrono', CoachChrono.factory());
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=coach-chrono.directive.js.map