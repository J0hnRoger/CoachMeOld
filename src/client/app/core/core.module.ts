namespace app.core {
    'use strict';

    angular
        .module('app.core', [
            'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus', 'ngMockE2E'
        ]);
     
}
