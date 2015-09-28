var app;
(function (app) {
    var widgets;
    (function (widgets) {
        'use strict';
        //Usage:
        //<chrono-reps duration="20" rest="25" reps="0" rounds="6"/>
        // Creates:
        var RepsChrono = (function () {
            function RepsChrono(logger, $interval) {
                var _this = this;
                this.logger = logger;
                this.$interval = $interval;
                this.templateUrl = 'app/widgets/reps-chrono.html';
                this.restrict = 'EA';
                this.scope = {
                    'exercise': '=',
                    'whenFinish': '=',
                    'start': '='
                };
                this.link = function (scope, element, attrs) {
                    var stopTime;
                    scope.state = {
                        rest: true,
                        lastRest: false,
                        finished: false
                    };
                    scope.start = function () {
                        if (stopTime != undefined)
                            return;
                        stopTime = _this.$interval(function () {
                            scope.exercise.rest = scope.exercise.rest - 1;
                            if (scope.exercise.rest == 0) {
                                scope.exercise.rest = scope.initialRest;
                                //emettre sonnerie
                                //Finished conditions
                                if (scope.state.lastRest) {
                                    scope.stop();
                                    scope.state.finished = true;
                                    scope.whenFinish();
                                }
                                if (scope.current == scope.exercise.rounds - 1) {
                                    scope.exercise.rest = scope.exercise.restAfter;
                                    scope.state.lastRest = true;
                                }
                                scope.state.rest = false;
                                scope.stop();
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
                    scope.finishSerie = function () {
                        scope.current++;
                        scope.state.rest = true;
                        scope.start();
                    };
                    scope.range = function (n) {
                        return new Array(n);
                    };
                    scope.$watch("exercise", function (newExercise) {
                        if (newExercise == undefined || newExercise.reps == 0)
                            return;
                        scope.current = 0;
                        scope.state.rest = false;
                        scope.state.lastRest = false;
                        scope.initialRest = newExercise.rest;
                    });
                };
            }
            RepsChrono.factory = function () {
                var directive = function (logger, $interval) { return new RepsChrono(logger, $interval); };
                return directive;
            };
            RepsChrono.$inject = ['logger', '$interval'];
            return RepsChrono;
        })();
        angular
            .module('app.widgets')
            .directive('repsChrono', RepsChrono.factory());
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=reps-chrono.directive.js.map