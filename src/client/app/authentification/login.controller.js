var app;
(function (app) {
    var authentification;
    (function (authentification) {
        'use strict';
        var LoginController = (function () {
            function LoginController(logger, authentificationService) {
                this.logger = logger;
                this.authentificationService = authentificationService;
                this.title = 'Log toi!';
                this.title = "Login";
                this.authentificationService = authentificationService;
            }
            LoginController.$inject = ['logger', 'authentificationService'];
            return LoginController;
        })();
        authentification.LoginController = LoginController;
        angular
            .module('app.authentification')
            .controller('loginController', LoginController);
    })(authentification = app.authentification || (app.authentification = {}));
})(app || (app = {}));
//# sourceMappingURL=login.controller.js.map