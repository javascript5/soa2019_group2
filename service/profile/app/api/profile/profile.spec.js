require('module-alias/register')

const Profile = require('./profile.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@root/server');
const jwt = require('jsonwebtoken');
const should = chai.should();
const SECRET = process.env.SECRET_KEY;
const JWT_EXPIRATION_MS = 60*1000;

const PAYLOAD = {
  'userId': '5cb440108941028067e414be',
  'username': 'test1234',
  'userType': 'student',
  'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
};

chai.use(chaiHttp);

describe('Profile-service integration test', () => {

  afterEach((done) => {
    Profile.deleteMany({}, (err) => { 
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET profile by user ID', () => {
    it('Should get profile information with exists user ID', (done) => {
      let profile = new Profile({
        _id: '5cb440108941028067e414be',
        userType: 'student',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'username@email.com',
        phoneNumber: '0801234567',
        highSchool: 'LN school',
        bachelor: 'KMITL',
        master: 'KMITL',
        doctoral: 'KMITL',
        majorInBachelor: 'IT',
        majorInMaster: 'IT',
        majorInDoctoral: 'IT',
        majorInHighSchool: 'Science-Math'
      });
      profile.save((err, profile) => {
        chai.request(server)
        .get('/5cb440108941028067e414be')  
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('profile');
          done();
        });
      })
    });
    it('Should not get profile information with non-exists user ID', (done) => {
      chai.request(server)
      .get('/5cb440108941028067e414be')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
  });

  /*
  * Test the /PUT route
  */
  describe('/PUT edit profile', () => {
    it('Should edit profile information with exists ID', (done) => {
      let profile = new Profile({
        _id: '5cb440108941028067e414be',
        userType: 'student',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'username@email.com',
        phoneNumber: '0801234567',
        highSchool: 'LN school',
        bachelor: 'KMITL',
        master: 'KMITL',
        doctoral: 'KMITL',
        majorInBachelor: 'IT',
        majorInMaster: 'IT',
        majorInDoctoral: 'IT',
        majorInHighSchool: 'Science-Math'
      });
      let editedProfile = {
        firstname: 'firstnameedited',
        lastname: 'lastnameedited',
        email: 'username@edited.com',
        phoneNumber: '0898765432'
      };
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      profile.save((err, profile) => {
        chai.request(server)
        .put('/5cb440108941028067e414be/edit')
        .set('Authorization', 'Bearer ' + token)
        .send(editedProfile)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('profile');
          res.body.profile.should.have.property('firstname').eql('firstnameedited')
          done();
        });
      })
    });
    it('Should not edit profile information with non-exists ID', (done) => {
      let editedProfile = {
        firstname: 'firstnameedited',
        lastname: 'lastnameedited',
        email: 'username@edited.com',
        phoneNumber: '0898765432'
      };
      let token = jwt.sign(JSON.stringify(PAYLOAD), SECRET);
      chai.request(server)
      .put('/5cb440108941028067e414be/edit')
      .set('Authorization', 'Bearer ' + token)
      .send(editedProfile)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not found');
        done();
      });
    });
  });
});