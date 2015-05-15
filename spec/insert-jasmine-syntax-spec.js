'use strict';

var insertJasmineSyntax = require('../lib/insert-jasmine-syntax.js');

describe( 'insertJasmineSyntax module', function(){
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
            'describe( \'the first describe\', function() {',
            '    describe( \'a description again\', function() {',
            '        it( \'another it\', function() {',
            '        });',
            '    });',
            '    it( \'another it\', function() {',
            '    });',
            '    describe( \'a description\', function() {',
            '        it( \'an it\', function() {',
            '        });',
            '    });',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
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
            'describe( \'the first describe\', function() {',
            '    describe( \'a description again\', function() {',
            '        it( \'another it\', function() {',
            '        });',
            '    });',
            '    describe( \'a description\', function() {',
            '        it( \'an it\', function() {',
            '        });',
            '    });',
            '});',
            'describe( \'other main description\', function() {',
            '    describe( \'a sub-description\', function() {',
            '        it( \'an it here\', function() {',
            '        });',
            '    });',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
    });

    it( 'should not include blank lines', function(){
        var buffer = [
            'a trivial buffer',
            '\tshould return proper jasmine',
            ''
        ].join('\n');

        var expectation = [
            'describe( \'a trivial buffer\', function() {',
            '\tit( \'should return proper jasmine\', function() {',
            '\t});',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
        buffer += '    ';
        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
    });

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

    it( 'should insert in describe-decribe-it pattern', function(){
        var buffer = [
            'the first describe',
            '   should be followed by a second describe',
            '       and an it function'
        ].join('\n');

        var expectation = [
            'describe( \'the first describe\', function() {',
            '   describe( \'should be followed by a second describe\', function() {',
            '       it( \'and an it function\', function() {',
            '       });',
            '   });',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
    });

    it( 'should insert in describe-it-decribe-it pattern', function(){
        var buffer = [
            'the first describe',
            '   should be followed by it',
            '   and an a description',
            '       and other it'
        ].join('\n');

        var expectation = [
            'describe( \'the first describe\', function() {',
            '   it( \'should be followed by it\', function() {',
            '   });',
            '   describe( \'and an a description\', function() {',
            '       it( \'and other it\', function() {',
            '       });',
            '   });',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
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
            'describe( \'the first describe\', function() {',
            '   it( \'should be followed by it\', function() {',
            '   });',
            '   it( \'should be followed by another it\', function() {',
            '   });',
            '   describe( \'and an a description\', function() {',
            '       it( \'and other it\', function() {',
            '       });',
            '       describe( \'a description again\', function() {',
            '           it( \'another it\', function() {',
            '           });',
            '           it( \'and one more it\', function() {',
            '           });',
            '       });',
            '   });',
            '});'
        ].join('\n');

        expect( insertJasmineSyntax( buffer ).join('\n') ).toBe( expectation );
    });
});
