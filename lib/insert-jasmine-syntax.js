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
        var pendingClose = []

        for ( var i=0; i<lines.length; ++i ){
            if ( i===0 ){
                result.push( insertDescribe( lines[i], tabs[i] ) + functionStr );
                pendingClose.push( i );
            }
            else {
                if ( ( i >= lines.length - 1 ) || tabs[ i+1 ] <= tabs[i] ) {
                    result.push( insertIt( lines[i], tabs[i] ) + functionStr );
                    result.push( indent( i ) + closingStatement );
                }
                else {
                    var closePos = pendingClose.pop();
                    while ( closePos > tabs[i] ){
                        result.push( indent( closePos ) + closingStatement );
                        closePos = pendingClose.pop();
                    }
                    pendingClose.push( closePos );

                    result.push( insertDescribe( lines[i], tabs[i] ) + functionStr );
                    pendingClose.push( i );
                }
            }
        }

        for( i = pendingClose.length - 1; i >= 0; --i ){
            result.push( indent( pendingClose[ i ] ) + closingStatement );
        }

        return result;
    }
};