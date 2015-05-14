var CompositeDisposable, JasmineScaffold;

CompositeDisposable = require('atom').CompositeDisposable;

module.exports = JasmineScaffold = {
    modalPanel: null,
    subscriptions: null,

    activate: function(state) {
        var _this = this;
        this.subscriptions = new CompositeDisposable;
        return this.subscriptions.add( atom.commands.add( 'atom-workspace', {
                                            'jasmine-scaffold:toggle': function() {
                                                return _this.toggle();
                                            }
                                        }));
    },

    deactivate: function() {
        return this.subscriptions.dispose();
    },

    serialize: function() {},

    toggle: function() {
        console.log('JasmineScaffold was toggled!--------------');

        var editor = atom.workspace.getActivePaneItem();
        var specifications = editor.getSelectedText();
        var result = insertJasmine( lines, tabs );

        return editor.insertText( result.join('\n') );
    }
};
