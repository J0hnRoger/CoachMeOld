/* jshint -W079 */
var mockData = (function() {
    return {
        getStamPlayUser: getStamPlayUser
    };

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    function getStamPlayUser() {
        return {"_id":"55eff9a4f835d9b85836c59d","workout_date":"2015-09-14T00:00:00.000Z","appId":"coachcoach","cobjectId":"users","__v":0,"seances":["55eff12af835d9b85836c590"],"Worker":"55eff8a0eb5d4c4c58deb2ff","planned_workout":[{"_id":"55eff12af835d9b85836c590","workout_date":"2015-09-14T00:00:00.000Z","appId":"coachcoach","cobjectId":"seance","__v":0,"exercices":["55eff430f835d9b85836c596","55eff3e9f835d9b85836c595","55eff337f835d9b85836c594","55eff2d5f835d9b85836c593","55eff2baf835d9b85836c592","55eff1bff835d9b85836c591","55ef5ada3815f6cd3b44101d"],"name":"Bas du corps + poitrine + ventre","actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T09:19:10.755Z","dt_create":"2015-09-09T08:43:22.232Z","id":"55eff12af835d9b85836c590"}],"performance":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T11:10:44.246Z","dt_create":"2015-09-09T09:19:32.605Z","id":"55eff9a4f835d9b85836c59d"};
    }
})();
