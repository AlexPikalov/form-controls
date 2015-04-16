;(function (window) {
    'use strict';

    var angular = window.angular;

    /**
     * @ngdoc directive
     * @name formControls.intInputStep:intInput
     * @restrict A
     * @scope
     * @priority 0
     *
     * @description
     * Numerical input directive that provides with increment and decrement buttons.
     * As an usual Angular's `input[number]` sets `number` validation error if not a valid number.
     *
     * @param {string} ngModel Assignable angular expression to data-bind to.
     * @param {string=} name Property name of the form under which the control is published.
     * @param {string=} min Sets the `min` validation error key if the value entered is less than `min`.
     * @param {string=} max Sets the `max` validation error key if the value entered is greater than `max`.
     * @param {string=} required Sets `required` validation error key if the value is not entered.
     * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
     * the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
     * `required` when you want to data-bind to the `required` attribute.
     * @param {string=} pattern Similar to `ngPattern` except that the attribute value is the actual string
     * that contains the regular expression body that will be converted to a regular expression
     * as in the ngPattern directive.
     * @param {string=} ngPattern Sets `pattern` validation error key if the ngModel value
     * does not match a RegExp found by evaluating the Angular expression given in the
     * attribute value.
     * If the expression evaluates to a RegExp object then this is used directly.
     * If the expression is a string then it will be converted to a RegExp after wrapping it in
     * `^` and `$` characters. For instance, `"abc"` will be converted to `new RegExp('^abc$')`.
     * @param {string=} ngChange Link to a function that will be invoked on each value change.
     *
     * @example
        <example module="ex">
            <file name="index.js">
                angular.module('ex', [ 'formControls.intInput' ]).controller('ExampleIntInputCtrl', ['$scope', function ($scope) {
                    $scope.value = 0;
                    $scope.count = 0;
                    $scope.tick = function () {
                        $scope.count += 1;
                    };
                }]);
            </file>
            <file name="index.html">
                <form name="myForm" ng-controller="ExampleIntInputCtrl">
                    Count: <span>{{count}}</span>
                    <div name="myInput" ng-model="value" ng-change="tick" int-input min="0" max="5"></div>
                    <div>Form is valid - <b>{{myForm.$valid}}</b></div>
                    <div>Input is valid - <b>{{myForm.myInput.$valid}}</b></div>
                    <div>Input is touched - <b>{{myForm.myInput.$touched}}</b></div>
                    <div>Input is dirty - <b>{{myForm.myInput.$dirty}}</b></div>
                </form>
            </file>
        </example>
     *
     */

    angular.module('formControls.intInput', [ 'formControls.intInput.tpl' ]);
    angular.module('formControls.intInput').directive('intInput', intInputStepDirective);

    //functions
    intInputStepDirective.$inject = [ '$compile' ];
    function intInputStepDirective() {
        // DDO
        return {
            scope: {
                value: '=ngModel',
                ngChange: '&'
            },
            templateUrl: 'templates/int-input.tpl.html',
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        function link(scope, element, attrs, ngModelController) {

            scope.increment = function () {
                scope.value += 1;
                ngModelController.$untouched && ngModelController.$setTouched();
                ngModelController.$pristine && ngModelController.$setDirty();
            };

            scope.decrement = function () {
                scope.value -= 1;
                ngModelController.$untouched && ngModelController.$setTouched();
                ngModelController.$pristine && ngModelController.$setDirty();
            };

            scope.onBlur = function () {
                ngModelController.$untouched && ngModelController.$setTouched();
            };

            scope.$watch('value', setValidities);

            function setValidities(newVal, oldVal) {
                if (angular.isUndefined(newVal)) { return; }
                ngModelController.$pristine && ngModelController.$setDirty();
                if ('max' in attrs) {
                    ngModelController.$setValidity('max', newVal <= +(attrs.max));
                }
                if ('min' in attrs) {
                    ngModelController.$setValidity('min', newVal >= +(attrs.min));
                }
                if ('ngPattern' in attrs) {
                    ngModelController.$setValidity('pattern',
                        attrs.ngPattern.test(newVal.toString()));
                }
                if (angular.isFunction(scope.ngChange) && newVal !== oldVal) {
                    scope.ngChange();
                }
            }
        }
    }
})(window);