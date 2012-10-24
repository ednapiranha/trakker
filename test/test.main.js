'use strict';

var should = require('should');
var fs = require('fs');
var trakker = require('../index');

var readFile = function(filename, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      console.log(err)
      callback(new Error('Could not read file: ', filename));
    } else {
      callback(null, data);
    }
  });
};

describe('trakker', function() {
  it('generates tracklist type 1', function(done) {
    readFile('test/tracklist1.txt', function(err, data) {
      if (err) {
        console.error('Error reading tracklist1.txt');
      } else {
        var trackList = trakker.generate(data);

        trackList.should.have.length(3);
        trackList[0].id.should.equal('01');
        trackList[0].startTime.should.equal('00:10:00');
        trackList[0].title.should.equal('Track 1 [By DJ Meow Meow]');
        trackList[1].id.should.equal('02');
        trackList[1].startTime.should.equal('20:30:10');
        trackList[1].title.should.equal('Track 2 [By MC Woof]');
        trackList[2].id.should.equal('03');
        trackList[2].startTime.should.equal('202:31:10');
        trackList[2].title.should.equal('Track 3 -- [By DJ Scratchy]');

        done();
      }
    });
  });

  it('generates tracklist type 2', function(done) {
    readFile('test/tracklist2.txt', function(err, data) {
      if (err) {
        console.error('Error reading tracklist2.txt');
      } else {
        var trackList = trakker.generate(data);

        trackList.should.have.length(3);
        trackList[0].id.should.equal('01');
        trackList[0].startTime.should.equal('');
        trackList[0].title.should.equal('Track 1 [By DJ Meow Meow]');
        trackList[1].id.should.equal('02');
        trackList[1].startTime.should.equal('');
        trackList[1].title.should.equal('Track 2 [By MC Woof]');
        trackList[2].id.should.equal('03');
        trackList[2].startTime.should.equal('');
        trackList[2].title.should.equal('Track 3 -- [By DJ Scratchy]');

        done();
      }
    });
  });

  it('generates tracklist type 3', function(done) {
    readFile('test/tracklist3.txt', function(err, data) {
      if (err) {
        console.error('Error reading tracklist3.txt');
      } else {
        var trackList = trakker.generate(data);

        trackList.should.have.length(3);
        trackList[0].id.should.equal('01');
        trackList[0].startTime.should.equal('');
        trackList[0].title.should.equal('– Track 1 [By DJ Meow Meow]');
        trackList[1].id.should.equal('02');
        trackList[1].startTime.should.equal('');
        trackList[1].title.should.equal('– Track 2 [By MC Woof]');
        trackList[2].id.should.equal('03');
        trackList[2].startTime.should.equal('');
        trackList[2].title.should.equal('– Track 3 -- [By DJ Scratchy]');

        done();
      }
    });
  });

  it('generates tracklist type 4', function(done) {
    readFile('test/tracklist4.txt', function(err, data) {
      if (err) {
        console.error('Error reading tracklist4.txt');
      } else {
        var trackList = trakker.generate(data);

        trackList.should.have.length(3);
        trackList[0].id.should.equal('');
        trackList[0].startTime.should.equal('');
        trackList[0].title.should.equal('Track 1 [By DJ Meow Meow]');
        trackList[1].id.should.equal('');
        trackList[1].startTime.should.equal('');
        trackList[1].title.should.equal('Track 2 [By MC Woof]');
        trackList[2].id.should.equal('');
        trackList[2].startTime.should.equal('');
        trackList[2].title.should.equal('?');

        done();
      }
    });
  });
})