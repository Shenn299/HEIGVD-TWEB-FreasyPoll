'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pollRoomCtrlStub = {
  index: 'pollRoomCtrl.index',
  show: 'pollRoomCtrl.show',
  create: 'pollRoomCtrl.create',
  upsert: 'pollRoomCtrl.upsert',
  patch: 'pollRoomCtrl.patch',
  destroy: 'pollRoomCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pollRoomIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './poll-room.controller': pollRoomCtrlStub
});

describe('PollRoom API Router:', function() {
  it('should return an express router instance', function() {
    expect(pollRoomIndex).to.equal(routerStub);
  });

  describe('GET /api/poll-rooms', function() {
    it('should route to pollRoom.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pollRoomCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/poll-rooms/:id', function() {
    it('should route to pollRoom.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pollRoomCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/poll-rooms', function() {
    it('should route to pollRoom.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pollRoomCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/poll-rooms/:id', function() {
    it('should route to pollRoom.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pollRoomCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/poll-rooms/:id', function() {
    it('should route to pollRoom.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pollRoomCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/poll-rooms/:id', function() {
    it('should route to pollRoom.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pollRoomCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
