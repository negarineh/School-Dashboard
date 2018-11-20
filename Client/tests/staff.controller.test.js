//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let should = chai.should();


chai.use(chaiHttp);
// Our parent block
describe('Staffs Components', () => {
 /*
  * Test the /GET route
  */
  describe('/GET /school/staffs/getall', () => {
      it('it should GET all the registered staffs', (done) => {
        chai.request(server)
            .get('/school/staffs/getall')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });

 /*
  * Test the /POST route
  */
 describe('POST /school/staffs/staffs_class ', () => {
  it('Teachers search for their current classes', (done) => {
      let email = 'Teacher4@gmail.com';

        chai.request(server)
            .post('/school/staffs/teacher_class')
            .send(email)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            });
        });
    });

 /*
  * Test the /POST route
  */
 describe('POST /school/staffs/teachers_class_students', () => {
    it('Teachers can search for ONLY their own current classes with list of students', (done) => {
        let email = 'Teacher4@gmail.com';
  
          chai.request(server)
              .post('/school/staffs/teachers_class_students')
              .send(email)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
              });
          });
      });

});
