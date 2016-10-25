import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


let resource,url, authActions
describe('Validate authenticate actions', () => {
    
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').default
            url = require('../../actions').url
            authActions = require('./authActions')
        }

    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should log in the user', (done)=>{

        const username = 'someuser'
        const password = 'somepassword'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

        mock(`${url}/headlines`,{
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })

        var callCount = 0
        authActions.LoginAction(username, password)(
            (action)=>{
                if (callCount == 0){
                    expect(action).to.eql({
                        type:'LOG_IN',
                        username
                    })
                    callCount++
                }
                else if (callCount == 1){
                    //not testing subsequent calls
                    done()
                }
            }
        )
    })

    it('should log out the user when OK', (done)=>{
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })


        authActions.LogoutAction()(
            (action)=>{
                expect(action).to.eql({
                    type:'TO_OUT'
                })
                done()
            }
        )
        
    })


    it('should navigate to main page after loggin in', (done)=>{
        const username = 'someuser'
        const headline = 'someheadline'

        const headlines = [{username, headline}]

        mock(`${url}/headlines`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: JSON.stringify(headlines)
        })

        authActions.init()(
            action=>{
                expect(action).to.eql({
                    type:'TO_HOME'
                })
                done()
            }
        )

    })

    it('should register', (done)=>{
        mock(`${url}/register`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'}
        })

        authActions.Register(null)(
            action=>{
                expect(action).to.eql({
                    type:'ON_SUCCESS',
                    success: 'successfully registered'
                })
                done()
            }
        )
    })

})
