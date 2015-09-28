/*jshint node:true*/

namespace data {

    'use strict';

    interface IPeople {
        id: number;
        firstName: string;
        lastName: string;
        age: number;
        location: string;
    }

    export function getPeople() {
        var people: Array<IPeople> = [
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
    };

    export function getWorkout() {
        var workout = {"_id":"55eff12af835d9b85836c590","workout_date":"2015-09-14T00:00:00.000Z","appId":"coachcoach","cobjectId":"seance","__v":0,"exercices":[{"_id":"55ef5ada3815f6cd3b44101d","IsReps":false,"duration":45,"familly":"Echauffement","name":"corde à sauter","reps":0,"rest":30,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"restAfter":120,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:43:51.458Z","dt_create":"2015-09-08T22:02:02.105Z","id":"55ef5ada3815f6cd3b44101d"},{"_id":"55eff1bff835d9b85836c591","IsReps":false,"duration":60,"familly":"Bas du corps","name":"A - Squats (rapprochés, extérieur, écartés)","rest":5,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"restAfter":120,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:47:24.414Z","dt_create":"2015-09-09T08:45:51.525Z","id":"55eff1bff835d9b85836c591"},{"_id":"55eff2baf835d9b85836c592","IsReps":true,"familly":"Bas du corps","name":"B - Squat 1 Jambe 45° (droite)","reps":10,"rest":120,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"restAfter":120,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:44:32.887Z","dt_create":"2015-09-09T08:50:02.908Z","id":"55eff2baf835d9b85836c592"},{"_id":"55eff2d5f835d9b85836c593","familly":"Bas du corps","name":"B - Squat 1 Jambe 45° (gauche)","reps":10,"rest":120,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"IsReps":true,"restAfter":120,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:46:14.979Z","dt_create":"2015-09-09T08:50:29.592Z","id":"55eff2d5f835d9b85836c593"},{"_id":"55eff337f835d9b85836c594","familly":"Bas du corps","name":"C - Sauts groupés","reps":5,"rest":120,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"IsReps":true,"restAfter":120,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:48:07.466Z","dt_create":"2015-09-09T08:52:07.563Z","id":"55eff337f835d9b85836c594"},{"_id":"55eff3e9f835d9b85836c595","IsReps":true,"familly":"Entrainement poitrine","name":"P - pompes chaises","reps":5,"rest":90,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"restAfter":90,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:50:42.575Z","dt_create":"2015-09-09T08:55:05.500Z","id":"55eff3e9f835d9b85836c595"},{"_id":"55eff430f835d9b85836c596","familly":"Entrainement poitrine","name":"R - Descente assise","reps":5,"rest":90,"rounds":3,"appId":"coachcoach","cobjectId":"exercices","__v":0,"IsReps":true,"restAfter":90,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:50:49.268Z","dt_create":"2015-09-09T08:56:16.966Z","id":"55eff430f835d9b85836c596"},{"_id":"55f1d1bf9370b34c174328f7","familly":"Entrainement ventre","name":"I1 - Inspiration sur le dos","rest":0,"rounds":1,"restAfter":25,"appId":"coachcoach","cobjectId":"exercices","__v":0,"reps":1,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:55:40.739Z","dt_create":"2015-09-10T18:53:51.290Z","id":"55f1d1bf9370b34c174328f7"},{"_id":"55f1d20c9370b34c174328f8","familly":"Entrainement ventre","name":"I2 - Expiration en poussant la jambe","reps":1,"rest":0,"rounds":1,"restAfter":25,"appId":"coachcoach","cobjectId":"exercices","__v":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:55:08.659Z","dt_create":"2015-09-10T18:55:08.659Z","id":"55f1d20c9370b34c174328f8"},{"_id":"55f1d2839370b34c174328f9","familly":"Entrainement ventre","name":"I4 - Inspiration jambes levées","reps":1,"rest":0,"rounds":1,"restAfter":25,"appId":"coachcoach","cobjectId":"exercices","__v":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T18:57:07.195Z","dt_create":"2015-09-10T18:57:07.195Z","id":"55f1d2839370b34c174328f9"}],"name":"Petite Prépa Mignonne","description":"On s\'arrache les jambes, on se fait mal aux pec\' et on commence tranquillement le ventre","actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T19:20:50.000Z","dt_create":"2015-09-09T08:43:22.232Z","id":"55eff12af835d9b85836c590"};
        return workout;
    }

    export function getWorker() {
        var worker = {"_id":"55eff9a4f835d9b85836c59d","workout_date":"2015-09-14T00:00:00.000Z","appId":"coachcoach","cobjectId":"users","__v":0,"seances":["55eff12af835d9b85836c590"],"Worker":"55eff8a0eb5d4c4c58deb2ff","planned_workout":[{"_id":"55eff12af835d9b85836c590","workout_date":"2015-09-14T00:00:00.000Z","appId":"coachcoach","cobjectId":"seance","__v":0,"exercices":["55ef5ada3815f6cd3b44101d","55eff1bff835d9b85836c591","55eff2baf835d9b85836c592","55eff2d5f835d9b85836c593","55eff337f835d9b85836c594","55eff3e9f835d9b85836c595","55eff430f835d9b85836c596","55f1d1bf9370b34c174328f7","55f1d20c9370b34c174328f8","55f1d2839370b34c174328f9"],"name":"Petite Prépa Mignonne","description":"On s'arrache les jambes, on se fait mal aux pec' et on commence tranquillement le ventre","actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-10T19:20:50.000Z","dt_create":"2015-09-09T08:43:22.232Z","id":"55eff12af835d9b85836c590"}],"performance":0,"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-09T11:10:44.246Z","dt_create":"2015-09-09T09:19:32.605Z","id":"55eff9a4f835d9b85836c59d"};
        return worker;
    }

    export function getLastRecord() {
        var record = {"data":[{"_id":"5608cd64b0fb023f29c2e2eb","worker":"55eff8a0eb5d4c4c58deb2ff","workout_date":"2015-09-14T00:00:00.000Z","workout":["55eff12af835d9b85836c590"],"appId":"coachcoach","cobjectId":"workoutrecord","__v":0,"exercicesScore":"{55eff1bff835d9b85836c591 : 60, 55eff2baf835d9b85836c592 : 6, 55eff2d5f835d9b85836c593 : 8, 55eff337f835d9b85836c594 : 4 55eff3e9f835d9b85836c595 : 9 55eff430f835d9b85836c596 : 3 55f1d1bf9370b34c174328f7 : 5 55f1d20c9370b34c174328f8 : 4, 55f1d2839370b34c174328f9 : 3}","exercisesScores":{"55eff1bff835d9b85836c591":"60","55eff2baf835d9b85836c592":"6-6-6","55eff2d5f835d9b85836c593":"8-7-6","55eff337f835d9b85836c594":"4-4-4","55eff3e9f835d9b85836c595":"9-6-4","55eff430f835d9b85836c596":"3-9-2","55f1d1bf9370b34c174328f7":"5-6-5","55f1d20c9370b34c174328f8":"4-4-4","55f1d2839370b34c174328f9":"3-4-3"},"actions":{"comments":[],"ratings":{"users":[],"avg":0,"total":0},"votes":{"users_downvote":[],"users_upvote":[],"users":[],"total":0}},"dt_update":"2015-09-28T21:22:05.380Z","dt_create":"2015-09-28T05:17:24.390Z","id":"5608cd64b0fb023f29c2e2eb"}]};
        return record;
    }

    data.getPeople = getPeople;
    data.getWorker= getWorker;
    data.getWorkout = getWorkout;
    data.getLastRecord = getLastRecord;
}

export = data;
