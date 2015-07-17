'use strict';

var CompositeDisposable, Plain2Jasmine;

CompositeDisposable = require('atom').CompositeDisposable;
var insertJasmineSyntax = require('./insert-jasmine-syntax.js');
var insertJasmineCoffeeSyntax = require('./insert-jasmine-coffee-syntax.js');

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

  getGrammar: function (currentTextEditor){
    if (currentTextEditor && currentTextEditor.getGrammar())
      return currentTextEditor.getGrammar().name;
    else
      return null;
  },

  toggle: function() {
    var editor = atom.workspace.getActivePaneItem();
    var specifications = editor.getSelectedText();

    var result = null;

    // If not sure, assume Javascript by default.
    var grammar = this.getGrammar(atom.workspace.getActiveTextEditor()) || 'Javascript';

    // using switch, in case more language scopes are added
    switch (grammar){
      case "CoffeeScript":
        result = insertJasmineCoffeeSyntax( specifications );
        break;
      default:
        result = insertJasmineSyntax( specifications );
        break;
    }

    return editor.insertText( result.join('\n\n') );
  }
};
