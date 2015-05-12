# Trakker

Convert tracklists to a list of objects.

## Tracklist Assumptions

Your tracklist is generally in the format of:

    01. [00:00:10] Some track title and/or Producer

Or

    01.) Some track title and/or Producer

Or

    Some track title and/or Producer

Trakker only accepts a string input, not a file. Figure that out separately - or check the test for an example.

## Installation

npm install trakker

## Example of reading a text file

var fs = require('fs');
var trakker = require('trakker');

fs.readFile('tracklist.txt', 'utf8', function (err, data) {
  var trackList = trakker.generate(data);

  console.log(trackList);
});

## Tests

npm test
