import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

 
let resource, url
describe('Test resource', () => {

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('./actions').default
            url = require('./actions').url
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should be able to login/POST', (done)=>{

        const username = 'someuser'
        const password = 'somepassword'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username, result:'success'}
        })

        resource('POST', 'login', {username, password})
        .then((response)=>{
            expect(response.username).to.eql(username)
            expect(response.result).to.eql('success')
        })
        .then(done)
        .catch(done)
    })

    it('should be able to GET resource', (done)=>{
        const headlines = [{username:'qw12', headline:'something'}]

        mock(`${url}/headlines`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: JSON.stringify(headlines)
        })

        resource('GET','headlines')
        .then((response)=>{
           expect(response.username).to.eql(headlines.username)
           expect(response.headline).to.eql(headlines.headline) 
        })
        .then(done)
        .catch(done)

    })

    // it('should not let user to log in without correct credential', (done)=>{
    //     const username = 'wrongusername'
    //     const password = 'wrongpass'

    //     mock(`${url}/login`,{
    //         method:'POST',
    //         headers: {'Content-Type':'text/plain'},
    //         status: 401,
    //         text: 'Unauthorized'
    //     })

    //     resource('POST', 'login', {username, password})
    //     .then(done)
    //     .catch(done)

    // })

})