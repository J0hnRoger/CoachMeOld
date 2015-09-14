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
                    'reps': '=',
                    'whenFinish': '='
                };
                this.link = function (scope, element, attrs) {
                    var stopTime;
                    var repsMode = scope.reps > 0;
                    scope.current = 0;
                    scope.initialDuration = scope.duration;
                    scope.state = {
                        rest: false,
                        lastRest: false,
                        finished: false
                    };
                    if (!repsMode) {
                        scope.start = function () {
                            stopTime = _this.$interval(function () {
                                scope.duration = scope.duration - 1;
                                if (scope.duration == 0) {
                                    if (scope.state.rest) {
                                        scope.duration = scope.initialDuration;
                                    }
                                    else {
                                        scope.current++;
                                        scope.duration = scope.rest;
                                    }
                                    scope.state.rest = !scope.state.rest;
                                    //emettre sonnerie
                                    //Finished conditions
                                    if (scope.state.lastRest) {
                                        _this.$interval.cancel(stopTime);
                                        scope.state.finished = true;
                                        scope.whenFinish();
                                    }
                                    if (scope.current == scope.rounds) {
                                        scope.duration = scope.restAfter;
                                        scope.state.lastRest = true;
                                    }
                                }
                            }, 1000);
                        };
                        function fireLastRest() {
                        }
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
                    }
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