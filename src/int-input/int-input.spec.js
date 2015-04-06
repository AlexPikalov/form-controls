describe('int-input', function () {
    'use strict';

    var element;
    var scope;

    beforeEach(module('formControls.intInput'));

    describe('with default config', function () {
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            element = '<form name="testForm"><div name="testInput" ng-model="val" int-input></div></form>';
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should contain an input', function () {
            expect(element.find('input').length).toBe(1);
        });

        it('should contain an increment button', function () {
            expect(element.find('button.increment').length).toBe(1);
        });

        it('should contain a decrement button', function () {
            expect(element.find('button.decrement').length).toBe(1);
        });

        it('should register new control within a form wrapper', function () {
            expect(scope.testForm.testInput).toBeDefined();
        });

        it('should be untouched', function () {
            expect(scope.testForm.testInput.$untouched).toBe(true);
        });

        it('should be pristine', function () {
            expect(scope.testForm.testInput.$pristine).toBe(true);
        });

        it('should bind a model to the input', function () {
            scope.val = 1;
            scope.$digest();
            expect(element.find('input').val()).toBe(scope.val.toString());
        });

        it('should mark control as $touched on blur', function () {
            element.find('input').focus();
            element.find('input').blur();

            expect(scope.testForm.testInput.$touched).toBe(true);
        });

        it('should mark control as $touched on click over the increment button', function () {
            element.find('.increment').click();
            expect(scope.testForm.testInput.$touched).toBe(true);
        });

        it('should mark controller as $touched on click over the decrement button', function () {
            element.find('.decrement').click();
            expect(scope.testForm.testInput.$touched).toBe(true);
        });

        it('should be dirty after input any values', function () {
            element.find('input').val(2).trigger('change');
            expect(scope.testForm.testInput.$dirty).toBe(true);
        });

        it('should be dirty after clicking over the increment button', function () {
            scope.val = 1;
            scope.$digest();
            element.find('.increment').click();
            expect(scope.testForm.testInput.$dirty).toBe(true);
        });

        it('should be dirty after clicking over the decrement button', function () {
            scope.val = 1;
            scope.$digest();
            element.find('.decrement').click();
            expect(scope.testForm.testInput.$dirty).toBe(true);
        });

        it('should increment value on a click over the increment button', function () {
            var initVal = 1;

            scope.val = initVal;
            scope.$digest();

            element.find('.increment').click();
            expect(scope.val).toBe(initVal + 1);
        });

        it('should increment value on a click over the decrement button', function () {
            var initVal = 1;

            scope.val = initVal;
            scope.$digest();

            element.find('.decrement').click();
            expect(scope.val).toBe(initVal - 1);
        });
    });

    describe('with validation config', function () {
        var $compile;

        beforeEach(inject(function ($rootScope, _$compile_) {
            scope = $rootScope.$new();
            $compile = _$compile_;
        }));

        it('should mark controls as invalid if the model value is more then max attribute value', function () {
            scope.val = 3;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" max="2" int-input></div></form>';
            $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.max).toBe(true);


        });

        it('should mark controls as invalid if the view value is more then max attribute value', function () {
            scope.val = 1;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" max="2" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            el.find('input').val(3).trigger('change');

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.max).toBe(true);
        });

        it('should mark controls as invalid if the model value is more then min attribute value', function () {
            scope.val = 1;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" min="2" int-input></div></form>';
            $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.min).toBe(true);


        });

        it('should mark controls as invalid if the view value is more then min attribute value', function () {
            scope.val = 3;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" min="2" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            el.find('input').val(1).trigger('change');

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.min).toBe(true);
        });

        it('should mark controls as invalid if the view value is undefined and required="true"', function () {
            var el = '<form name="testForm"><div name="testInput" ng-model="val" required="true" int-input></div></form>';
            $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.required).toBe(true);
        });

        it('should mark controls as valid if the view value is undefined and required="false"', function () {
            var el = '<form name="testForm"><div name="testInput" ng-model="val" required="false" int-input></div></form>';
            $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.required).toBe(true);
        });

        it('should mark controls as invalid if the view value is undefined and ng-required="true"', function () {
            var el = '<form name="testForm"><div name="testInput" ng-model="val" ng-required="true" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.required).toBe(true);
        });

        it('should mark controls as valid if the view value is undefined and ng-required="false"', function () {
            var el = '<form name="testForm"><div name="testInput" ng-model="val" ng-required="false" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$valid).toBe(true);
            expect(scope.testForm.testInput.$valid).toBe(true);
        });

        it('should use an evaluated value of `ng-required` attribute', function () {
            scope.required = false;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" ng-required="required" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$valid).toBe(true);
            expect(scope.testForm.testInput.$valid).toBe(true);
        });

        it('should mark controls as valid if the view value matches a RegExp from `ng-pattern` attribute', function () {
            scope.val = 22;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" ng-pattern="/[0-9]{2}/" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$valid).toBe(true);
            expect(scope.testForm.testInput.$valid).toBe(true);
        });

        it('should mark controls as invalid if the view value does not match a RegExp from `ng-pattern` attribute', function () {
            scope.val = 1;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" ng-pattern="/[0-9]{2}/" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.pattern).toBe(true);
        });

        it('should use an evaluated value of `ng-pattern` attribute', function () {
            scope.val = 1;
            scope.pattern = /[0-9]{2}/;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" ng-pattern="pattern" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.pattern).toBe(true);
        });

        it('should mark controls as valid if the view value matches a RegExp from `pattern` attribute', function () {
            scope.val = 22;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" pattern="[0-9]{2}" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$valid).toBe(true);
            expect(scope.testForm.testInput.$valid).toBe(true);
        });

        it('should mark controls as invalid if the view value does not match a RegExp from `pattern` attribute', function () {
            scope.val = 1;
            var el = '<form name="testForm"><div name="testInput" ng-model="val" pattern="[0-9]{2}" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            expect(scope.testForm.$invalid).toBe(true);
            expect(scope.testForm.testInput.$invalid).toBe(true);
            expect(scope.testForm.testInput.$error.pattern).toBe(true);
        });

        it('should call a callback that is defined as `ng-change` on each change', function () {
            scope.cb = angular.noop;
            scope.val = 555;
            spyOn(scope, 'cb');

            var el = '<form name="testForm"><div name="testInput" ng-model="val" ng-change="cb" int-input></div></form>';
            el = $compile(el)(scope);
            scope.$digest();

            el.find('input').val(121).trigger('change');

            expect(scope.cb).toHaveBeenCalled();
        });
    });
});