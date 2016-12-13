import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test frontend application', ()=>{

    before('should load the page', (done)=>{
        go().then(done)
    })


    it('should show the register message', (done) => {
        sleep(500)
        .then(findId('aname').sendKeys('sampleusername'))
        .then(findId('email').sendKeys('sample@email.com'))
        .then(findId('DOB').sendKeys('01011990'))
        .then(findId('zip').sendKeys('12345'))
        .then(findId('pass1').sendKeys('password'))
        .then(findId('pass2').sendKeys('password'))
        .then(findId('register').click())
        .then(sleep(500))
        .then(findId('toast-container').then((element)=>{
            expect(element).to.be.ok
        }))
        .then(sleep(500))
        .then(done)
    })



})