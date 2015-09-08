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
                    'duration': '@',
                    'rounds': '@',
                    'rest': '@',
                    'reps': '@',
                    'whenFinish': '='
                };
                this.link = function (scope, element, attrs) {
                    var stopTime;
                    var repsMode = scope.reps > 0;
                    scope.current = 0;
                    scope.time = scope.duration;
                    scope.state = {
                        rest: false,
                        finished: false
                    };
                    if (!repsMode) {
                        scope.start = function () {
                            stopTime = _this.$interval(function () {
                                scope.time = scope.time - 1;
                                if (scope.time == 0) {
                                    if (scope.state.rest) {
                                        scope.time = scope.duration;
                                    }
                                    else {
                                        scope.current++;
                                        scope.time = scope.rest;
                                    }
                                    scope.state.rest = !scope.state.rest;
                                    //emettre sonnerie
                                    if (scope.current == scope.rounds) {
                                        _this.$interval.cancel(stopTime);
                                        scope.state.finished = true;
                                        scope.whenFinish();
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