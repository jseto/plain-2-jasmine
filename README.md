Plain to Jasmine Atom Package
=============================

**Wraps Jasmine syntax around plain text specifications**

*A package inspired by Chris Wheatley [Jasmine Scaffold](https://github.com/swirlycheetah/jasmine-scaffold-sublime-text)*

This package helps to write Jasmine test by writing your specifications in plain human language. Once you have your specifications written, activate the package and it will insert all the Jasmine syntax.

![plain-2-jasmine demo](https://raw.githubusercontent.com/jseto/plain-2-jasmine/master/plain-2-jasmine-demo.gif)

### Install

Use the Atom package manager, which can be found in the Settings view or run

```
apm install plain-2-jasmine
```

from the command line.

### Write your specifications

Just write your specifications in an indented manner in plain English or any other human language.

```
My awesome package
    when select Plain to Jasmine from context menu
        should insert Jasmine syntax in selected text
    when select Plain to Jasmine from package menu
        should insert Jasmine syntax in selected text
    when ctrl-shift-j pressed
        should insert Jasmine syntax in selected text
```

### Activate the package

Select the text containing your specifications and use any of the following methods to activate the package:

-	Chose `Plain to Jasmine` option under the Package main menu
-	Right click on the selected text and chose `Plain to Jasmine` option
-	<kbd>Ctrl</kbd> <kbd>Shift</kbd> + <kbd>J</kbd>
-	Select `Plain 2 Jasmine` from the command palette

### Fill up your test code

Once the package is executed you will have inserted the Jasmine syntax code with your specifications.

```js
describe( 'My awesome package', function() {

    describe( 'when select Plain to Jasmine from context menu', function() {

        it( 'should insert Jasmine syntax in selected text', function() {

        });

    });

    describe( 'when select Plain to Jasmine from package menu', function() {

        it( 'should insert Jasmine syntax in selected text', function() {

        });

    });

    describe( 'when ctrl-shift-j pressed', function() {

        it( 'should insert Jasmine syntax in selected text', function() {

        });

    });

});
```

CoffeeScript is supported as well:

```coffee
describe 'My awesome package', ->

    describe 'when select Plain to Jasmine from context menu', ->

        it 'should insert Jasmine syntax in selected text', ->

    describe 'when select Plain to Jasmine from package menu', ->

        it 'should insert Jasmine syntax in selected text', ->

    describe 'when ctrl-shift-j pressed', ->

        it 'should insert Jasmine syntax in selected text', ->
```

Enjoy your testings

Contribute
----------

If you find a bug, please report it by opening a new [issue](https://github.com/jseto/plain-2-jasmine/issues)

Contributions are very appreciated. Just fork the [repo](https://github.com/jseto/plain-2-jasmine) and issue a pull request. Opening an issue about the planned contribution is advisable so we can discuss about it.

Contributions should have tests and description about the new or changed functionality.

License
-------

*Plain to Jasmine* is distributed under the [MIT license](http://opensource.org/licenses/MIT)
