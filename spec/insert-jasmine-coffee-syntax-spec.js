'use strict';

var insertJasmineCoffeeSyntax = require('../lib/insert-jasmine-coffee-syntax.js');

describe( 'insertJasmineCoffeeSyntax module', function(){
	it( 'should insert in unindent it after same level describe block pattern', function(){
		var buffer = [
			'the first describe',
			'    a description again',
			'        another it',
			'    another it',
			'    a description',
			'        an it'
		].join('\n');

		var expectation = [
			'describe \'the first describe\', ->',
			'    describe \'a description again\', ->',
			'        it \'another it\', ->',
			'    it \'another it\', ->',
			'    describe \'a description\', ->',
			'        it \'an it\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should insert in unindent pattern', function(){
		var buffer = [
			'the first describe',
			'    a description again',
			'        another it',
			'    a description',
			'        an it',
			'other main description',
			'    a sub-description',
			'        an it here'
		].join('\n');

		var expectation = [
			'describe \'the first describe\', ->',
			'    describe \'a description again\', ->',
			'        it \'another it\', ->',
			'    describe \'a description\', ->',
			'        it \'an it\', ->',
			'describe \'other main description\', ->',
			'    describe \'a sub-description\', ->',
			'        it \'an it here\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should strip out trailing whitespace', function(){
		var buffer = [
			'a trivial buffer',
			'\tshould return proper jasmine'
		].join('\n');

		var expectation = [
			'describe \'a trivial buffer\', ->',
			'\tit \'should return proper jasmine\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
		buffer += '   ';
		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should insert jasmine syntax in a trivial buffer with hard-tabs', function(){
		var buffer = [
			'a trivial buffer',
			'\tshould return proper jasmine'
		].join('\n');

		var expectation = [
			'describe \'a trivial buffer\', ->',
			'\tit \'should return proper jasmine\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should insert jasmine syntax in a trivial buffer with soft-tabs', function(){
		var buffer = [
			'a trivial buffer',
			'  should return proper jasmine'
		].join('\n');

		var expectation = [
			'describe \'a trivial buffer\', ->',
			'  it \'should return proper jasmine\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should insert in describe-decribe-it pattern', function(){
		var buffer = [
			'the first describe',
			'   should be followed by a second describe',
			'     and an it function'
		].join('\n');

		var expectation = [
			'describe \'the first describe\', ->',
			'   describe \'should be followed by a second describe\', ->',
			'     it \'and an it function\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should insert in describe-it-decribe-it pattern', function(){
		var buffer = [
			'the first describe',
			'   should be followed by it',
			'   and an a description',
			'     and other it'
		].join('\n');

		var expectation = [
			'describe \'the first describe\', ->',
			'   it \'should be followed by it\', ->',
			'   describe \'and an a description\', ->',
			'     it \'and other it\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should insert in describe-it-it-decribe-it-describe-it-it pattern', function(){
		var buffer = [
			'the first describe',
			'   should be followed by it',
			'   should be followed by another it',
			'   and an a description',
			'       and other it',
			'       a description again',
			'           another it',
			'           and one more it'
		].join('\n');

		var expectation = [
			'describe \'the first describe\', ->',
			'   it \'should be followed by it\', ->',
			'   it \'should be followed by another it\', ->',
			'   describe \'and an a description\', ->',
			'       it \'and other it\', ->',
			'       describe \'a description again\', ->',
			'           it \'another it\', ->',
			'           it \'and one more it\', ->'
		].join('\n');

		expect( insertJasmineCoffeeSyntax( buffer ).join('\n') ).toBe( expectation );
	});

	it( 'should work for windows line endings', function(){
		var buffer = [
			'the first describe',
			'    a description again',
			'        another it',
			'    another it',
			'    a description',
			'        an it'
		].join('\r\n');

		var expectation = [
			'describe \'the first describe\', ->',
			'    describe \'a description again\', ->',
			'        it \'another it\', ->',
			'    it \'another it\', ->',
			'    describe \'a description\', ->',
			'        it \'an it\', ->'
				].join('\r\n');

		expect( insertJasmineCoffeeSyntax( buffer, '\r\n' ).join('\r\n') ).toBe( expectation );
	});

});
