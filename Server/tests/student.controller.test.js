//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let should = chai.should();


chai.use(chaiHttp);
// Our parent block
describe('Student Components', () => {
 /*
  * Test the /GET route
  */
  describe('/GET /school/students/getallstudents', () => {
      it('it should GET all the enrolled students', (done) => {
        chai.request(server)
            .get('/school/students/getallstudents')
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
 describe('POST /school/students/student_class ', () => {
  it('Students search for their current classes', (done) => {
      let email = 'Student4@gmail.com';

        chai.request(server)
            .post('/school/students/student_class')
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
 describe('POST /school/students/students_class_teachers ', () => {
    it('Teachers can search for ONLY their own current classes with list of students', (done) => {
        let email = 'Teacher4@gmail.com';
  
          chai.request(server)
              .post('/school/students/students_class_teachers')
              .send(email)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
              });
          });
      });

});
