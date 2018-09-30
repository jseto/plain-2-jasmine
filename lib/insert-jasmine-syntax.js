'use strict';

module.exports = function( str, lineEnding, ts ){
	lineEnding = lineEnding || '\n';

	var lines = purgueEmptyLines( str.split( lineEnding ) );
	var tabs = retrieveTabsForEachLine( lines );

	return insertJasmine( lines, tabs );

	function purgueEmptyLines( lines ) {
		var result = [];
		for( var i in lines ){
			if ( lines[i].trim().length ){
				result.push( lines[i] );
			}
		}
		return result;
	}

  function retrieveTabsForEachLine( lines ) {
		var tabs=[];
		for ( var i=0; i<lines.length; ++i ){
			tabs[i] = lines[i].replace(/^(\s*).*$/, '$1').length;
		}
		return tabs;
	}

	function insertDescribe( str, pos ){
		var describeText = 'describe( \'';
		if ( ts ) {
			describeText = 'describe( \'\\n';
		}

		return [ str.slice( 0, pos ), describeText, str.slice( pos ) ].join('');
	}

	function insertIt( str, pos ){
		var itText = 'it( \'';
		if ( ts ) {
			itText = 'xit( \'';
		}

		return [ str.slice( 0, pos ), itText, str.slice( pos ) ].join('');
	}

	function indent( toLine ){
		return lines[ toLine ].slice( 0, tabs[ toLine ] );
	}

	function functionStr(){
		if ( ts ) {
			return '\', ()=> {';
		}
		else {
			return '\', function() {';
		}
	}

	function closingStatement(){
		return '});';
	}

	function insertJasmine( lines, tabs ){
		var result = [];
		var pendingClose = [];

		for ( var i=0; i<lines.length; ++i ){
			if ( i===0 ){
				result.push( insertDescribe( lines[i], tabs[i] ) + functionStr() );
				pendingClose.push( i );
			}
			else {
				if ( ( i >= lines.length - 1 ) || tabs[ i+1 ] <= tabs[i] ) {
					insertPendingClose( i, pendingClose, tabs, result );
					result.push( insertIt( lines[i], tabs[i] ) + functionStr() );
					result.push( indent( i ) + closingStatement() );
				}
				else {
					insertPendingClose( i, pendingClose, tabs, result );
					result.push( insertDescribe( lines[i], tabs[i] ) + functionStr() );
					pendingClose.push( i );
				}
			}
		}

		for( i = pendingClose.length - 1; i >= 0; --i ){
			result.push( indent( pendingClose[ i ] ) + closingStatement() );
		}

		return result;
	}

	function insertPendingClose( i, pendingClose, tabs, result ){
		var closePos = pendingClose.pop();
		while ( tabs[ closePos ] >= tabs[i] ){
			result.push( indent( closePos ) + closingStatement() );
			closePos = pendingClose.pop();
		}
		if ( typeof closePos !== 'undefined' ) {
			pendingClose.push( closePos );
		}
	}
};
