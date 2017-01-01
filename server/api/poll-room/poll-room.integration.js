'use strict';

var app = require('../..');
import request from 'supertest';

var newPollRoom;

describe('PollRoom API:', function() {
  describe('GET /api/poll-rooms', function() {
    var pollRooms;

    beforeEach(function(done) {
      request(app)
        .get('/api/poll-rooms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pollRooms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pollRooms).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/poll-rooms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/poll-rooms')
        .send({
          name: 'New PollRoom',
          info: 'This is the brand new pollRoom!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPollRoom = res.body;
          done();
        });
    });

    it('should respond with the newly created pollRoom', function() {
      expect(newPollRoom.name).to.equal('New PollRoom');
      expect(newPollRoom.info).to.equal('This is the brand new pollRoom!!!');
    });
  });

  describe('GET /api/poll-rooms/:id', function() {
    var pollRoom;

    beforeEach(function(done) {
      request(app)
        .get(`/api/poll-rooms/${newPollRoom._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pollRoom = res.body;
          done();
        });
    });

    afterEach(function() {
      pollRoom = {};
    });

    it('should respond with the requested pollRoom', function() {
      expect(pollRoom.name).to.equal('New PollRoom');
      expect(pollRoom.info).to.equal('This is the brand new pollRoom!!!');
    });
  });

  describe('PUT /api/poll-rooms/:id', function() {
    var updatedPollRoom;

    beforeEach(function(done) {
      request(app)
        .put(`/api/poll-rooms/${newPollRoom._id}`)
        .send({
          name: 'Updated PollRoom',
          info: 'This is the updated pollRoom!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPollRoom = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPollRoom = {};
    });

    it('should respond with the updated pollRoom', function() {
      expect(updatedPollRoom.name).to.equal('Updated PollRoom');
      expect(updatedPollRoom.info).to.equal('This is the updated pollRoom!!!');
    });

    it('should respond with the updated pollRoom on a subsequent GET', function(done) {
      request(app)
        .get(`/api/poll-rooms/${newPollRoom._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pollRoom = res.body;

          expect(pollRoom.name).to.equal('Updated PollRoom');
          expect(pollRoom.info).to.equal('This is the updated pollRoom!!!');

          done();
        });
    });
  });

  describe('PATCH /api/poll-rooms/:id', function() {
    var patchedPollRoom;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/poll-rooms/${newPollRoom._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched PollRoom' },
          { op: 'replace', path: '/info', value: 'This is the patched pollRoom!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPollRoom = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPollRoom = {};
    });

    it('should respond with the patched pollRoom', function() {
      expect(patchedPollRoom.name).to.equal('Patched PollRoom');
      expect(patchedPollRoom.info).to.equal('This is the patched pollRoom!!!');
    });
  });

  describe('DELETE /api/poll-rooms/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/poll-rooms/${newPollRoom._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pollRoom does not exist', function(done) {
      request(app)
        .delete(`/api/poll-rooms/${newPollRoom._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
