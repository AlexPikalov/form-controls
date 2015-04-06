;(function (window) {
    'use strict';
    var angular = window.angular;
    angular.module('formControls.intInput.tpl', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/int-input.tpl.html', '<input type="text" ng-model="value" ng-blur="onBlur()" /><button class="increment" ng-click="increment()">+</button><button class="decrement" ng-click="decrement()">-</button>');
    }]);
})(window);