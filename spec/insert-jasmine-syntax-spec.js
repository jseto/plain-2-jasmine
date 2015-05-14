'use strict';

var insertJasmineSyntax = require('../lib/insert-jasmine-syntax.js');

describe( 'insertJasmineSyntax module', function(){
    it( 'should insert jasmine syntax in a trivial buffer with hard-tabs', function(){
        var buffer = [
            'a trivial buffer',
            '\tshould return proper jasmine'
        ].join('\n');

        var expectation = [
            'describe( \'a trivial buffer\', function() {',
            '\tit( \'should return proper jasmine\', function() {',
            '\t});',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
    });

    it( 'should insert jasmine syntax in a trivial buffer with soft-tabs', function(){
        var buffer = [
            'a trivial buffer',
            '  should return proper jasmine'
        ].join('\n');

        var expectation = [
            'describe( \'a trivial buffer\', function() {',
            '  it( \'should return proper jasmine\', function() {',
            '  });',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
    });
});
