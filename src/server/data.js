/*jshint node:true*/
var data;
(function (data) {
    'use strict';
    function getPeople() {
        var people = [
            { id: 1, firstName: 'John', lastName: 'Papa', age: 27, location: 'Florida' },
            { id: 2, firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
            { id: 3, firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
            { id: 4, firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
            { id: 5, firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
            { id: 6, firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
            { id: 7, firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' },
            { id: 8, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22, location: 'Utah' }
        ];
        return people;
    }
    data.getPeople = getPeople;
    ;
    function getWorkout() {
        var workout = '{"_id":"55eff12af835d9b85836c590","workout_date":"2015-09-14T00:00:00.000Z","appId":"coachcoach","cobjectId":"seance","__v":0,"exercices":[{"_id":"55ef5ada3815f6cd3b44101d","IsReps":false,"duration":45,"familly":"Echauffement","name":"corde à sauter","reps":0,"rest":30,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T08:57:18.491Z","dt_create":"2015-09-08T22:02:02.105Z","id":"55ef5ada3815f6cd3b44101d"},{"_id":"55eff1bff835d9b85836c591","IsReps":false,"duration":60,"familly":"Bas du corps","name":"A - Squats (rapprochés, extérieur, écartés)","rest":0,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T08:45:51.525Z","dt_create":"2015-09-09T08:45:51.525Z","id":"55eff1bff835d9b85836c591"},{"_id":"55eff2baf835d9b85836c592","IsReps":true,"familly":"Bas du corps","name":"B - Squat 1 Jambe 45° (droite)","reps":10,"rest":120,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T08:50:02.908Z","dt_create":"2015-09-09T08:50:02.908Z","id":"55eff2baf835d9b85836c592"},{"_id":"55eff2d5f835d9b85836c593","familly":"Bas du corps","name":"B - Squat 1 Jambe 45° (gauche)","reps":10,"rest":120,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"IsReps":true,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T08:51:02.221Z","dt_create":"2015-09-09T08:50:29.592Z","id":"55eff2d5f835d9b85836c593"},{"_id":"55eff337f835d9b85836c594","familly":"Bas du corps","name":"C - Sauts groupés","reps":5,"rest":120,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"IsReps":true,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T08:52:27.384Z","dt_create":"2015-09-09T08:52:07.563Z","id":"55eff337f835d9b85836c594"},{"_id":"55eff3e9f835d9b85836c595","IsReps":true,"familly":"Entrainement poitrine","name":"P - pompes chaises","reps":5,"rest":90,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T08:55:05.500Z","dt_create":"2015-09-09T08:55:05.500Z","id":"55eff3e9f835d9b85836c595"},{"_id":"55eff430f835d9b85836c596","familly":"Entrainement poitrine","name":"R - Descente assise","reps":5,"rest":90,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"IsReps":true,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T08:56:28.027Z","dt_create":"2015-09-09T08:56:16.966Z","id":"55eff430f835d9b85836c596"}],"name":"Bas du corps + poitrine + ventre","actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T22:12:47.070Z","dt_create":"2015-09-09T08:43:22.232Z","id":"55eff12af835d9b85836c590"}';
        return workout;
    }
    data.getWorkout = getWorkout;
    function getWorker() {
        var worker = { "_id": "55eff9a4f835d9b85836c59d", "workout_date": "2015-09-14T00:00:00.000Z", "appId": "coachcoach", "cobjectId": "users", "__v": 0, "seances": ["55eff12af835d9b85836c590"], "Worker": "55eff8a0eb5d4c4c58deb2ff", "planned_workout": [{ "_id": "55eff12af835d9b85836c590", "workout_date": "2015-09-14T00:00:00.000Z", "appId": "coachcoach", "cobjectId": "seance", "__v": 0, "exercices": ["55eff430f835d9b85836c596", "55eff3e9f835d9b85836c595", "55eff337f835d9b85836c594", "55eff2d5f835d9b85836c593", "55eff2baf835d9b85836c592", "55eff1bff835d9b85836c591", "55ef5ada3815f6cd3b44101d"], "name": "Bas du corps + poitrine + ventre", "actions": { "comments": [], "ratings": { "users": [], "avg": 0, "total": 0 }, "votes": { "users_downvote": [], "users_upvote": [], "users": [], "total": 0 } }, "dt_update": "2015-09-09T09:19:10.755Z", "dt_create": "2015-09-09T08:43:22.232Z", "id": "55eff12af835d9b85836c590" }], "performance": 0, "actions": { "comments": [], "ratings": { "users": [], "avg": 0, "total": 0 }, "votes": { "users_downvote": [], "users_upvote": [], "users": [], "total": 0 } }, "dt_update": "2015-09-09T11:10:44.246Z", "dt_create": "2015-09-09T09:19:32.605Z", "id": "55eff9a4f835d9b85836c59d" };
        return worker;
    }
    data.getWorker = getWorker;
    data.getPeople = getPeople;
    data.getWorker = getWorker;
    data.getWorkout = getWorkout;
})(data || (data = {}));
module.exports = data;
//# sourceMappingURL=data.js.map