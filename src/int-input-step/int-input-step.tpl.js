;(function (window) {
    'use strict';
    var angular = window.angular;
    angular.module('formControls.intInputStep.tpl', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/int-input-step.tpl.html', '<input type="number" ng-model="value" /><button class="increment" ng-click="increment()"></button><button class="decrement" ng-click="decrement()"></button>');
    }]);
})(window);