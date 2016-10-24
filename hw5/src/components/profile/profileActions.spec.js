import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as profileActions from './profileActions'
 
let resource, url
describe('Test profileActions', () => {

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').default
            url = require('../../actions')
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should update the headline', (done)=>{

        const username = 'someuser'
        const headline = 'a new headline'


        mock(`${url}/headline`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            json: {username, headline}
        })
        
        profileActions.updateHeadline('does not matter')(
            fn => fn(action => {
            expect(action).to.eql({ 
                headline, type: 'UPDATE_PROFILE'
            })
            done()
        }))
    })

})
