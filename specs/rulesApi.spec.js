const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../')
const db = require('../data')

const {
	expect
} = chai

chai.use(chaiHttp)

describe('rules api', () => {

	before(() => {

		db.reset()

	})

	describe('asd', () => {
		it('criar uma regra', (done) => {
			chai.request(server).post('/api/rules').type('json').send({
				'type': 'daily',
				'intervals': [{
					'start': '07:00',
					'end': '09:00'
				}]
			}).end((err, res) => {

				expect(res).to.have.status(200)
				done()
			})
		})

	})

})