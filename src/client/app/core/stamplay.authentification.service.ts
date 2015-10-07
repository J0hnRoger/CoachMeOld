namespace stamplay.core {
'use strict';

export class AuthentificationService {
	public settings : any; 
	
	static $inject: Array<string> = ['$http', '$q', 'exception', 'logger'];
	constructor(private $http: ng.IHttpService, private $q: ng.IQService, private exception: blocks.exception.IException, private logger: blocks.logger.Logger)
	{
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
		}
		
		this.settings.data = {"email" : "", "password" : "", "success_url" : "/dashboard", "error_url" : "/error"};	
	}

	login : (login : string, password : string ) => ng.IPromise<any> = (login : string, password : string) => {
            var defer = this.$q.defer();
			console.log("Try Login : " + login + password);
			this.settings.data.password = password;
			this.settings.data.email = login;
			
           this.$http.post('/api/cobject/v1/seance/', this.settings)
                .then((response : any) => {
                    console.log("LOGIN!")
                    defer.resolve();
                });
            return defer.promise;
        };

}

angular
	.module('stamplay.core')
	.service('authentificationService', AuthentificationService);
}
