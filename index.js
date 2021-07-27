const parseCsvLine = line => {
    return line.match( /\s*(\".*?\"|'.*?'|[^,]+)\s*(,|$)/g ).map( line => {
      let matchLine;
      if ( matchLine = line.match( /^\s*\"(.*?)\"\s*,?$/ ) ) return matchLine[ 1 ]; // Double Quoted Text
      if ( matchLine = line.match( /^\s*'(.*?)'\s*,?$/ ) ) return matchLine[ 1 ]; // Single Quoted Text
      if ( matchLine = line.match( /^\s*(true|false)\s*,?$/ ) ) return matchLine[ 1 ] === "true"; // Boolean
      if ( matchLine = line.match( /^\s*((?:\+|\-)?\d+)\s*,?$/ ) ) return parseInt( matchLine[ 1 ] ); // Integer Number
      if ( matchLine = line.match( /^\s*((?:\+|\-)?\d*\.\d*)\s*,?$/ ) ) return parseFloat( matchLine[ 1 ] ); // Floating Number
      if ( matchLine = line.match( /^\s*(.*?)\s*,?$/ ) ) return matchLine[ 1 ]; // Unquoted Text
      return line;
    } );
  }

exports.parse = csv => {
    const splitCsvByLine = csv.split( "\n" );
    // const columnHeaders = splitCsvByLine[ 0 ];
    return splitCsvByLine.slice( 1 ).map( parseCsvLine );
};