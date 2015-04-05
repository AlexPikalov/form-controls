;(function (window) {
    'use strict';

    var angular = window.angular;

    /**
     * @ngdoc directive
     * @name formControls.intInputStep:intInputStep
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
     *
     */

    angular.module('formControls.intInputStep', [ 'formControls.intInputStep.tpl' ]);
    angular.module('formControls.intInputStep').directive('intInputStep', intInputStepDirective);

    //functions
    intInputStepDirective.$inject = [ '$compile' ];
    function intInputStepDirective() {
        // DDO
        return {
            scope: {
                value: '=ngModel',
                ngChange: '='
            },
            templateUrl: 'templates/int-input-step.tpl.html',
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

            scope.$watch('value', setValidities);

            element.find('input').blur(function () {
                ngModelController.$untouched && ngModelController.$setTouched();
            });


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
                if (angular.isFunction(scope.ngChange)) {
                    scope.ngChange(newVal, oldVal);
                }
            }
        }
    }
})(window);