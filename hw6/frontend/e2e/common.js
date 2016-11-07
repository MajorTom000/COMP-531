import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'qw12test',
    password: 'several-common-fruit'
}


exports.login = () =>
    sleep(500)
    .then(findId('username2').clear())
    .then(findId('password2').clear())
    .then(findId('username2').sendKeys(exports.creds.username))
    .then(findId('password2').sendKeys(exports.creds.password))
    .then(findId('login').click())
    .then(sleep(2000))


exports.logout = () => 

    sleep(500)
    .then(findId('logout').click())
    .then(sleep(500))
    .then(expect(findId('login')).to.be.ok)
    .then(sleep(500))