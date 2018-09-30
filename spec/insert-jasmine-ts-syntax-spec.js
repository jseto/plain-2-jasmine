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
			'xdescribe( \'\\nthe first describe\', ()=> {',
			'    xdescribe( \'\\na description again\', ()=> {',
			'        xit( \'another it\', ()=> {',
			'        });',
			'    });',
			'    xit( \'another it\', ()=> {',
			'    });',
			'    xdescribe( \'\\na description\', ()=> {',
			'        xit( \'an it\', ()=> {',
			'        });',
			'    });',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
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
			'xdescribe( \'\\nthe first describe\', ()=> {',
			'    xdescribe( \'\\na description again\', ()=> {',
			'        xit( \'another it\', ()=> {',
			'        });',
			'    });',
			'    xdescribe( \'\\na description\', ()=> {',
			'        xit( \'an it\', ()=> {',
			'        });',
			'    });',
			'});',
			'xdescribe( \'\\nother main description\', ()=> {',
			'    xdescribe( \'\\na sub-description\', ()=> {',
			'        xit( \'an it here\', ()=> {',
			'        });',
			'    });',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
	});

	it( 'should not include blank lines', function(){
		var buffer = [
			'a trivial buffer',
			'\tshould return proper jasmine',
			''
		].join('\n');

		var expectation = [
			'xdescribe( \'\\na trivial buffer\', ()=> {',
			'\txit( \'should return proper jasmine\', ()=> {',
			'\t});',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
		buffer += '    ';
		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
	});

	it( 'should insert jasmine syntax in a trivial buffer with hard-tabs', function(){
		var buffer = [
			'a trivial buffer',
			'\tshould return proper jasmine'
		].join('\n');

		var expectation = [
			'xdescribe( \'\\na trivial buffer\', ()=> {',
			'\txit( \'should return proper jasmine\', ()=> {',
			'\t});',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
	});

	it( 'should insert jasmine syntax in a trivial buffer with soft-tabs', function(){
		var buffer = [
			'a trivial buffer',
			'  should return proper jasmine'
		].join('\n');

		var expectation = [
			'xdescribe( \'\\na trivial buffer\', ()=> {',
			'  xit( \'should return proper jasmine\', ()=> {',
			'  });',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
	});

	it( 'should insert in describe-decribe-it pattern', function(){
		var buffer = [
			'the first describe',
			'   should be followed by a second describe',
			'       and an it function'
		].join('\n');

		var expectation = [
			'xdescribe( \'\\nthe first describe\', ()=> {',
			'   xdescribe( \'\\nshould be followed by a second describe\', ()=> {',
			'       xit( \'and an it function\', ()=> {',
			'       });',
			'   });',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
	});

	it( 'should insert in describe-it-decribe-it pattern', function(){
		var buffer = [
			'the first describe',
			'   should be followed by it',
			'   and an a description',
			'       and other it'
		].join('\n');

		var expectation = [
			'xdescribe( \'\\nthe first describe\', ()=> {',
			'   xit( \'should be followed by it\', ()=> {',
			'   });',
			'   xdescribe( \'\\nand an a description\', ()=> {',
			'       xit( \'and other it\', ()=> {',
			'       });',
			'   });',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
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
			'xdescribe( \'\\nthe first describe\', ()=> {',
			'   xit( \'should be followed by it\', ()=> {',
			'   });',
			'   xit( \'should be followed by another it\', ()=> {',
			'   });',
			'   xdescribe( \'\\nand an a description\', ()=> {',
			'       xit( \'and other it\', ()=> {',
			'       });',
			'       xdescribe( \'\\na description again\', ()=> {',
			'           xit( \'another it\', ()=> {',
			'           });',
			'           xit( \'and one more it\', ()=> {',
			'           });',
			'       });',
			'   });',
			'});'
		].join('\n');

		expect( insertJasmineSyntax( buffer, '\n', true ).join('\n') ).toBe( expectation );
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
			'xdescribe( \'\\nthe first describe\', ()=> {',
			'    xdescribe( \'\\na description again\', ()=> {',
			'        xit( \'another it\', ()=> {',
			'        });',
			'    });',
			'    xit( \'another it\', ()=> {',
			'    });',
			'    xdescribe( \'\\na description\', ()=> {',
			'        xit( \'an it\', ()=> {',
			'        });',
			'    });',
			'});'
		].join('\r\n');

		expect( insertJasmineSyntax( buffer, '\r\n', true ).join('\r\n') ).toBe( expectation );
	});

});
