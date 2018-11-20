//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let should = chai.should();


chai.use(chaiHttp);
// Our parent block
describe('Class Components', () => {
 /*
  * Test the /GET route
  */
  describe('/GET /school/classes/getall', () => {
      it('it should GET all available classes', (done) => {
        chai.request(server)
            .get('/school/classes/getall')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });

});
