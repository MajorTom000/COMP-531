import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as authActions from './authActions'

let resource,url
describe('Validate authenticate actions', () => {
    
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').default
            url = require('../../actions').url
        }

    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    // it('should log in the user', (done)=>{

    //     const username = 'someuser'
    //     const password = 'somepassword'


    //     mock(`${url}/login`, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         json: {username, result:'success'}
    //     })

    //     authActions.LoginAction(username, password)(
    //         fn => fn(action=>{
    //             expect(action).to.eql({
    //                 type:'LOG_IN', username
    //             })

    //             done()
    //         })
    //     )



    // })

})
