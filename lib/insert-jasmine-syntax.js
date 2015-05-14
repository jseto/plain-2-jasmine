'use strict';

module.exports = function( str ){
    var lines = str.split('\n');
    var tabs = retrieveTabsForEachLine( lines );

    return insertJasmine( lines, tabs );



    function retrieveTabsForEachLine( lines ) {
        var tabs=[];
        for ( var i=0; i<lines.length; ++i ){
            tabs[i] = lines[i].replace(/^(\s*).*$/, '$1').length;
        }
        return tabs;
    }

    function insertDescribe( str, pos ){
        var describeText = 'describe( \'';

        return [ str.slice( 0, pos ), describeText, str.slice( pos ) ].join('');
    }

    function insertIt( str, pos ){
        var describeText = 'it( \'';

        return [ str.slice( 0, pos ), describeText, str.slice( pos ) ].join('');
    }

    function indent( toLine ){
        return lines[ toLine ].slice( 0, tabs[ toLine ] );
    }

    function insertJasmine( lines, tabs ){
        var functionStr = '\', function() {';
        var closingStatement = '});'
        var result = [];

        for ( var i=0; i<lines.length; ++i ){
            if ( i===0 ){
                result.push( insertDescribe( lines[i], tabs[i] ) + functionStr );
            }
            else {
                if ( tabs[i] > tabs[ i-1 ] ) {
                    result.push( insertIt( lines[i], tabs[i] ) + functionStr );
                    result.push( indent( i ) + closingStatement );
                }
                else {
                    result.push( insertDescribe( lines[i], tabs[i] ) + functionStr );
                }
            }
        }
        result.push( closingStatement );

        return result;
    }
};
