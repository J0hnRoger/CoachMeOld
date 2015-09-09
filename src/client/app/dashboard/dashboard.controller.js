var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        'use strict';
        var DashboardController = (function () {
            function DashboardController($q, workoutservice, logger) {
                this.$q = $q;
                this.workoutservice = workoutservice;
                this.logger = logger;
                this.title = 'Coach Me';
                var promises = [];
                this.getCurrentWorker();
                this.$q.all(promises).then(function () {
                    logger.info('Activated Dashboard View');
                });
            }
            DashboardController.prototype.getCurrentWorker = function () {
                var _this = this;
                var userTestId = "55eff9a4f835d9b85836c59d";
                return this.workoutservice.getWorker(userTestId)
                    .then(function (data) {
                    _this.currentWorker = data;
                    _this.currentWorker.getNextWorkout();
                });
            };
            DashboardController.$inject = ['$q', 'workoutservice', 'logger'];
            return DashboardController;
        })();
        dashboard.DashboardController = DashboardController;
        angular
            .module('app.dashboard')
            .controller('DashboardController', DashboardController);
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=dashboard.controller.js.map