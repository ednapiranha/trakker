'use strict';

/* Get a string of data and return the tracklist in JSON
 * Requires: content as a string, callback
 * Returns: JSON object if successful, error otherwise
 */
exports.generate = function(content, callback) {
  var trackLines = content.split(/\n|\r/);
  var trackList = [];
  var trackCount = 0;
  var POSITION_MATCH = /((\[|\(|\.)?)\d{1,}((\]|\)|\.)?)/i;
  var TIME_MATCH = /((\[|\(|\.)?)\d{2,}:\d{2}:\d{2}((\]|\)|\.)?)/i;

  var findPosition = function(tokenized) {
    var position = '';
    if (tokenized[0].match(POSITION_MATCH)) {
      position = tokenized[0].replace(/[^\d]/gi, '');
      tokenized.splice(0, 1);
    }
    return { result: position, tokenized: tokenized };
  };

  var findStartTime = function(tokenized) {
    var startTime = '';
    if (tokenized[0].match(TIME_MATCH)) {
      startTime = tokenized[0].replace(/[^(\d|:)]/gi, '');
      tokenized.splice(0, 1);
    }
    return { result: startTime, tokenized: tokenized };
  };

  trackLines.forEach(function(track) {
    var tokenized = track.split(/\s/);
    var newTokenized = [];

    tokenized.forEach(function(token) {
      if (token.trim().length > 0) {
        newTokenized.push(token);
      }
    });

    var positionToken = findPosition(newTokenized);
    var position = positionToken.result;

    var timeToken = findStartTime(positionToken.tokenized);
    var startTime = timeToken.result;
    var title = timeToken.tokenized.join(' ');

    var trackItem = {
      position: position,
      startTime: startTime,
      title: title
    };

    trackList.push(trackItem);

    if (trackList.length === trackLines.length) {
      callback(null, trackList);
    }
  });
};
