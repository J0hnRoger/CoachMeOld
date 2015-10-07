var stamplay;
(function (stamplay) {
    var core;
    (function (core) {
        'use strict';
        var AuthentificationService = (function () {
            function AuthentificationService($http, $q, exception, logger) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.login = function (login, password) {
                    var defer = _this.$q.defer();
                    console.log("Try Login : " + login + password);
                    _this.settings.data.password = password;
                    _this.settings.data.email = login;
                    _this.$http.post('/api/cobject/v1/seance/', _this.settings)
                        .then(function (response) {
                        console.log("LOGIN!");
                        defer.resolve();
                    });
                    return defer.promise;
                };
                this.settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://coachcoach.stamplayapp.com/auth/v1/local/login",
                    "method": "POST",
                    "headers": {
                        "accept": "application/json",
                        "content-type": "application/json"
                    },
                    "processData": false,
                };
                this.settings.data = { "email": "", "password": "", "success_url": "/dashboard", "error_url": "/error" };
            }
            AuthentificationService.$inject = ['$http', '$q', 'exception', 'logger'];
            return AuthentificationService;
        })();
        core.AuthentificationService = AuthentificationService;
        angular
            .module('stamplay.core')
            .service('authentificationService', AuthentificationService);
    })(core = stamplay.core || (stamplay.core = {}));
})(stamplay || (stamplay = {}));
//# sourceMappingURL=stamplay.authentification.service.js.map