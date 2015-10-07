namespace app.authentification {
'use strict';


interface ILoginVm {
	title: string;
	authentificationService : stamplay.core.AuthentificationService;
}
	
export class LoginController implements ILoginVm {
	title: string = 'Log toi!';
	static $inject: Array<string> = [ 'logger', 'authentificationService'];
	constructor(private logger: blocks.logger.Logger, private authentificationService: stamplay.core.AuthentificationService) {
		this.title = "Login";
		this.authentificationService = authentificationService;
	}
} 

angular
	.module('app.authentification')
	.controller('loginController', LoginController);
	
}
