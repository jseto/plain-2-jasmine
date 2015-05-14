'use strict';

var Plain2Jasmine = require('../lib/plain-2-jasmine');

xdescribe('Plain2Jasmine', function() {
    var activationPromise, ref, workspaceElement;
    ref = [], workspaceElement = ref[0], activationPromise = ref[1];

    beforeEach(function() {
        workspaceElement = atom.views.getView(atom.workspace);
        activationPromise = atom.packages.activatePackage('plain-2-jasmine');
    });

    describe('when the plain-2-jasmine:toggle event is triggered', function() {

        it('hides and shows the modal panel', function() {
            expect(workspaceElement.querySelector('.plain-2-jasmine')).not.toExist();
            atom.commands.dispatch(workspaceElement, 'plain-2-jasmine:toggle');
            waitsForPromise(function() {
                activationPromise;
            });
            runs(function() {
                var plain2JasmineElement, plain2JasminePanel;

                expect(workspaceElement.querySelector('.plain-2-jasmine')).toExist();
                plain2JasmineElement = workspaceElement.querySelector('.plain-2-jasmine');
                expect(plain2JasmineElement).toExist();
                plain2JasminePanel = atom.workspace.panelForItem(plain2JasmineElement);
                expect(plain2JasminePanel.isVisible()).toBe(true);
                atom.commands.dispatch(workspaceElement, 'plain-2-jasmine:toggle');

                expect(plain2JasminePanel.isVisible()).toBe(false);
            });
        });

        it('hides and shows the view', function() {
            jasmine.attachToDOM(workspaceElement);
            expect(workspaceElement.querySelector('.plain-2-jasmine')).not.toExist();
            atom.commands.dispatch(workspaceElement, 'plain-2-jasmine:toggle');
            waitsForPromise(function() {
                activationPromise;
            });
            runs(function() {
                var plain2JasmineElement;
                plain2JasmineElement = workspaceElement.querySelector('.plain-2-jasmine');
                expect(plain2JasmineElement).toBeVisible();
                atom.commands.dispatch(workspaceElement, 'plain-2-jasmine:toggle');
                expect(plain2JasmineElement).not.toBeVisible();
            });
        });
    });
});
