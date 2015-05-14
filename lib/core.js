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

    function insertJasmine( lines, tabs ){
        var result = [];

        for ( var i=0; i<lines.length; ++i ){
            if ( i===0 ){
                result[i] = insertDescribe( lines[i], tabs[i] );
            }
            else {
                if ( tabs[i] > tabs[ i-1 ] ) {
                    result[i] = insertIt( lines[i], tabs[i] );
                }
                else {
                    result[i] = insertDescribe( lines[i], tabs[i] );
                }
            }
        }

        return result;
    }
};
