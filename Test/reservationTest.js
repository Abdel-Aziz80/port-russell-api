const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const reservationController = require('../services/reservations');
const Reservation = require('../models/reservation');
const Catway = require('../models/catway');
const { render } = require('pug');

describe('Reservation Controller - getAll', function() {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        id: new mongoose.Types.ObjectId().toString()
      }
    };
    res = {
      render: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render reservation page with reservation and catway data', async function() {
    const mockReservation = [
      { _id: new mongoose.Types.ObjectId(), name: 'Reservation 1' },
      { _id: new mongoose.Types.ObjectId(), name: 'Reservation 2' }
    ];
    const mockCatway = { _id: req.params.id, name: 'Test Catway' };

    sinon.stub(Reservation, 'find').resolves(mockReservation);
    sinon.stub(Catway, 'findById').resolves(mockCatway);

    await reservationController.getAll(req, res, next);

    expect(Reservation.find.calledOnce).to.be.true;
    expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledOnce).to.be.true;
    expect(res.status.firstCall.args[0]).to.equal('reservation');
    expect(res.status.firstCall.args[1]).to.deep.equal({
      title: 'Réservation',
      reservation: mockReservation,
      catway: mockCatway
    });
  });

  it('should return 500 status when Reservation.find fails', async function() {
    const error = new Error('Database error');
    sinon.stub(Reservation, 'find').rejects(error);

    await reservationController.getAll(req, res, next);

    expect(Reservation.find.calledOnce).to.be.true;
    expect(res.status.calledOnceWith(501)).to.be.true;
    expect(res.json.calledOnceWith(error)).to.be.true;
  });

  it('should return 500 status when Catway.findById fails', async function() {
    const error = new Error('Catway not found');
    sinon.stub(Reservation, 'find').resolves([]);
    sinon.stub(Catway, 'findById').rejects(error);

    await reservationController.getAll(req, res, next);

    expect(Reservation.find.calledOnce).to.be.true;
    expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith(error)).to.be.true;
  });

  it('should not render page when no reservation are found', async function() {
    sinon.stub(Reservation, 'find').resolves(null);
    const mockCatway = { _id: req.params.id, name: 'Test Catway' };
    sinon.stub(Catway, 'findById').resolves(mockCatway);

    await reservationController.getAll(req, res, next);

    expect(Reservation.find.calledOnce).to.be.true;
    expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.called).to.be.false;
  });
});

describe('Reservation Controller - getById', () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {
        params: {
          id: new mongoose.Types.ObjectId().toString(),
          idReservation: new mongoose.Types.ObjectId().toString()
        }
      };
      res = {
        render: sinon.spy(),
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      next = sinon.spy();
    });
  
    afterEach(() => {
      sinon.restore();
    });
  
    it('should render reservationInfo page with reservation and catway data', async () => {
      const mockCatway = { _id: req.params.id, name: 'Test Catway' };
      const mockReservation = { _id: req.params.idReservation, name: 'Test Reservation' };
  
      sinon.stub(Catway, 'findById').resolves(mockCatway);
      sinon.stub(Reservation, 'findById').resolves(mockReservation);
  
      await reservationController.getById(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(Reservation.findById.calledOnceWith(req.params.idReservation)).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.firstCall.args[0]).to.equal('reservationInfo');
      expect(res.status.firstCall.args[1]).to.deep.equal({
        title: 'Information réservation',
        reservation: mockReservation,
        catway: mockCatway
      });
    });
  
    it('should return 404 status when catway is not found', async () => {
      sinon.stub(Catway, 'findById').resolves(null);
  
      await reservationController.getById(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnceWith('catway-not-found')).to.be.true;
    });
  
    it('should return 404 status when reservation is not found', async () => {
      const mockCatway = { _id: req.params.id, name: 'Test Catway' };
      sinon.stub(Catway, 'findById').resolves(mockCatway);
      sinon.stub(Reservation, 'findById').resolves(null);
  
      await reservationController.getById(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(Reservation.findById.calledOnceWith(req.params.idReservation)).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnceWith('Aucune réservation trouvé')).to.be.true;
    });
  
    it('should return 500 status on database error', async () => {
      const error = new Error('Database error');
      sinon.stub(Catway, 'findById').rejects(error);
  
      await reservationController.getById(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith(error)).to.be.true;
    });
});

describe('Reservation Controller - add', () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: {
          reservationId: '123',
          clientName: 'John Doe',
          boatName: 'Sea Spirit',
          checkIn: '2023-06-01',
          checkOut: '2023-06-05'
        }
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      next = sinon.spy();
    });
  
    afterEach(() => {
      sinon.restore();
    });
  
    it('should add a new reservation and return 201 status on success', async () => {
      const mockCatway = { _id: req.params.id, catwayNumber: 5 };
      const mockReservation = { ...req.body, catwayNumber: mockCatway.catwayNumber };
  
      sinon.stub(Catway, 'findById').resolves(mockCatway);
      sinon.stub(Reservation, 'create').resolves(mockReservation);
  
      // Exécute les middlewares de validation
      for (const middleware of reservationController.add.slice(0, -1)) {
        await middleware(req, res, next);
      }
  
      // Exécute la fonction principale
      await reservationController.add[reservationController.add.length - 1](req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(Reservation.create.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith(mockReservation)).to.be.true;
    });
  
    it('should return 400 status with validation errors for invalid input', async () => {
      req.body.reservationId = 'not a number';
      req.body.clientName = 'Jo';
      req.body.checkIn = 'invalid date';
  
      // Exécute les middlewares de validation
      for (const middleware of reservationController.add.slice(0, -1)) {
        await middleware(req, res, next);
      }
  
      // Exécute la fonction principale
      await reservationController.add[reservationController.add.length - 1](req, res, next);
  
      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errors = res.json.firstCall.args[0].errors;
      expect(errors).to.be.an('array').that.has.lengthOf(3);
      expect(errors[0].msg).to.equal("L'id de réservation doit être un nombre.");
      expect(errors[1].msg).to.equal('Le nom du client doit contenir au moins 3 caractères');
      expect(errors[2].msg).to.equal('checkIn doit être une date');
    });
  
    it('should propagate error when Catway.findById fails', async () => {
        const error = new Error('Database error');
        sinon.stub(Catway, 'findById').rejects(error);
    
        // Exécute les middlewares de validation
        for (const middleware of reservationController.add.slice(0, -1)) {
          await middleware(req, res, next);
        }
    
        // Exécute la fonction principale
        try {
          await reservationController.add[reservationController.add.length - 1](req, res, next);
          // Si nous arrivons ici, le test devrait échouer car nous attendons une erreur
          expect.fail('Expected an error to be thrown');
        } catch (e) {
          expect(e).to.equal(error);
        }
    
        expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
    });
  
    it('should do nothing when catway is not found', async () => {
        sinon.stub(Catway, 'findById').resolves(null);
    
        // Exécute les middlewares de validation
        for (const middleware of reservationController.add.slice(0, -1)) {
          await middleware(req, res, next);
        }
    
        // Exécute la fonction principale
        await reservationController.add[reservationController.add.length - 1](req, res, next);
    
        expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
        expect(res.status.called).to.be.false;
        expect(res.json.called).to.be.false;
    });
});

describe('Reservation Controller - delete', () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {
        params: {
          id: new mongoose.Types.ObjectId().toString(),
          idReservation: new mongoose.Types.ObjectId().toString()
        }
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      next = sinon.spy();
    });
  
    afterEach(() => {
      sinon.restore();
    });
  
    it('should delete a reservation and return 204 status on success', async function() {
      const mockCatway = { _id: req.params.id };
      
      sinon.stub(Catway, 'findById').resolves(mockCatway);
      const deleteOneStub = sinon.stub(Reservation, 'deleteOne').resolves({ deletedCount: 1 });
  
      await reservationController.delete(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(deleteOneStub.calledOnceWith({ _id: req.params.idReservation })).to.be.true;
      expect(res.status.calledOnceWith(204)).to.be.true;
      expect(res.json.calledOnceWith('delete_ok')).to.be.true;
    });
  
    it('should return 500 status on database error', async () => {
      const mockCatway = { _id: req.params.id };
      const dbError = new Error('Database error');
      
      sinon.stub(Catway, 'findById').resolves(mockCatway);
      sinon.stub(Reservation, 'deleteOne').rejects(dbError);
  
      await reservationController.delete(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith(dbError)).to.be.true;
    });
  
    it('should do nothing when catway is not found', async () => {
      sinon.stub(Catway, 'findById').resolves(null);
      const deleteOneStub = sinon.stub(Reservation, 'deleteOne');
  
      await reservationController.delete(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(deleteOneStub.called).to.be.false;
      expect(res.status.called).to.be.false;
      expect(res.json.called).to.be.false;
    });
  
    it('should return 204 status even if no reservation was found to delete', async () => {
      const mockCatway = { _id: req.params.id };
      
      sinon.stub(Catway, 'findById').resolves(mockCatway);
      const deleteOneStub = sinon.stub(Reservation, 'deleteOne').resolves({ deletedCount: 0 });
  
      await Reservation.delete(req, res, next);
  
      expect(Catway.findById.calledOnceWith(req.params.id)).to.be.true;
      expect(deleteOneStub.calledOnceWith({ _id: req.params.idReservation })).to.be.true;
      expect(res.status.calledOnceWith(204)).to.be.true;
      expect(res.json.calledOnceWith('delete_ok')).to.be.true;
    });
});