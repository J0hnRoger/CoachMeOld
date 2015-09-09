var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        var WorkoutService = (function () {
            function WorkoutService($http, $q, exception, logger, coachMeUrl) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.coachMeUrl = coachMeUrl;
                this.getCurrentWorker = function (userId) {
                    return _this.$http.get(_this.coachMeUrl + '/api/cobject/v1/users/' + userId + '?populate=true')
                        .then(_this.success)
                        .catch(_this.fail);
                };
                this.success = function (response) {
                    var worker = new app.domain.Worker(response.data);
                    return worker;
                };
                this.fail = function (error) {
                    var msg = error.data.description;
                    var reason = 'query for get current worker failed.';
                    _this.exception.catcher(msg)(reason);
                    return _this.$q.reject(msg);
                };
            }
            WorkoutService.$inject = ['$http', '$q', 'exception', 'logger', 'coachMeUrl'];
            return WorkoutService;
        })();
        core.WorkoutService = WorkoutService;
        angular
            .module('app.core')
            .service('workoutservice', WorkoutService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=workout.service.js.map