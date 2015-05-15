'use strict';

var CompositeDisposable, Plain2Jasmine;

CompositeDisposable = require('atom').CompositeDisposable;
var insertJasmineSyntax = require('./insert-jasmine-syntax.js');

module.exports = Plain2Jasmine = {
    modalPanel: null,
    subscriptions: null,

    activate: function(state) {
        var _this = this;
        this.subscriptions = new CompositeDisposable();
        return this.subscriptions.add( atom.commands.add( 'atom-workspace', {
                                            'plain-2-jasmine:toggle': function() {
                                                return _this.toggle();
                                            }
                                        }));
    },

    deactivate: function() {
        return this.subscriptions.dispose();
    },

    serialize: function() {},

    toggle: function() {
        console.log('Plain2Jasmine was toggled!--------------');

        var editor = atom.workspace.getActivePaneItem();
        var specifications = editor.getSelectedText();
        var result = insertJasmineSyntax( specifications );

        return editor.insertText( result.join('\n\n') );
    }
};
