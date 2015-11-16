'use strict';

module.exports = function( str, lineEnding ){
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
		var describeText = 'describe \'';

		return [ str.slice( 0, pos ), describeText, str.trimRight().slice( pos ) ].join('');
	}

	function insertIt( str, pos ){
		var itText = 'it \'';

		return [ str.slice( 0, pos ), itText, str.trimRight().slice( pos ) ].join('');
	}

	function functionStr(){
		return '\', ->';
	}

	function insertJasmine( lines, tabs ){
		var result = [];
		var pendingClose = [];

		for ( var i=0; i<lines.length; ++i ){
			if ( i===0 ){
				result.push( insertDescribe( lines[i], tabs[i] ) + functionStr() );
			}
			else {
				if ( ( i >= lines.length - 1 ) || tabs[ i+1 ] <= tabs[i] ) {
					result.push( insertIt( lines[i], tabs[i] ) + functionStr() );
				}
				else {
					result.push( insertDescribe( lines[i], tabs[i] ) + functionStr() );
				}
			}
		}
		return result;
	}
};
