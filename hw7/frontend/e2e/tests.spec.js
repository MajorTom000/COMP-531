import { expect } from 'chai'
import { driver,maximize, go, sleep, findId, findCSS, By } from './selenium'
import common from './common'
const webdriver = require('selenium-webdriver')


describe('Test frontend application', ()=>{

    before('should log in', (done)=>{
        maximize().then(go()).then(common.login).then(done)
    })


    it('should log in as the test user', (done) => {
        sleep(500)
        .then(expect(findId('search')).to.be.ok)
        .then(done)
    })

    it('should post a new article', (done)=>{
        let originalLength = 0
        let article = "just an article"
        sleep(500)
        .then(findId('articlesList').findElements(webdriver.By.className('row')).then(
            (children)=>{
                expect(children.length).to.be.at.least(1)
                originalLength = children.length
            }
        ))
        .then(findId('post').clear())
        .then(findId('post').sendKeys(article))
        .then(findId('btnPost').click())
        .then(sleep(500))
        .then(findId('articlesList').findElements(webdriver.By.className('row')).then(
            (children)=>{
                expect(children.length).to.be.eql(originalLength+1)
            }
        ))
        .then(sleep(500))
        .then(done)
    })


        it('should edit an article', (done)=>{

        let originalText = 'just an article'
        let newArticle = 'new article'
        sleep(500)
        .then(findId('articlesList').findElements(webdriver.By.className('row')).then(

            (articles)=>{
                const article = articles[0]
                article.findElements(webdriver.By.className('articleEdit')).then(
                    (edits)=>{
                        const edit = edits[0]
                        edit.getText().then(text=> expect(text).to.eql(originalText))
                        .then(edit.clear())
                        .then(edit.sendKeys(newArticle))
                    }
                )
                article.findElements(webdriver.By.className('buttonEdit')).then(
                    (buttons)=>{
                        const button = buttons[0]
                        button.click()
                    }
                ).then(sleep(500))

                article.findElements(webdriver.By.className('articleEdit')).then(
                    (edits)=>{
                        const edit = edits[0]
                        edit.getText().then(text=> expect(text).to.eql(newArticle))
                        .then(edit.clear())
                        .then(edit.sendKeys(originalText))
                    }
                )
                article.findElements(webdriver.By.className('buttonEdit')).then(
                    (buttons)=>{
                        const button = buttons[0]
                        button.click()
                    }
                ).then(sleep(500))

                article.findElements(webdriver.By.className('articleEdit')).then(
                    (edits)=>{
                        const edit = edits[0]
                        edit.getText().then(text=>expect(text).to.eql(originalText))
                    }
                )
            }
        ))
        .then(done)

    })

    it('should update the headline', (done)=>{
        let originalHeadline = 'Test Account'
        let newheadline = 'new headline for test'
        sleep(500)
        .then(findId('status').getInnerHtml().then(
            text=>{
                expect(text).to.be.eql(originalHeadline)
            }
        ))
        .then(findId('statusinput').clear())
        .then(findId('statusinput').sendKeys(newheadline))
        .then(findId('btnStatus').click())
        .then(sleep(500))
        .then(findId('status').getInnerHtml().then(
            text=>{
                expect(text).to.be.eql(newheadline)
            }
        ))
        .then(findId('statusinput').clear())
        .then(findId('statusinput').sendKeys(originalHeadline))
        .then(findId('btnStatus').click())
        .then(sleep(500))
        .then(findId('status').getInnerHtml().then(
            text=>{
                expect(text).to.be.eql(originalHeadline)
            }
        ))
        .then(sleep(500))
        .then(done)
    })


    it('should search by keyword', (done)=>{
        let keyword = 'Only One Article Like This'

        sleep(500)
        .then(findId('articlesList').findElements(webdriver.By.className('row')).then(
            (children)=>{
                expect(children.length).to.be.at.least(2)
            }
        ))
        .then(findId('search').clear())
        .then(findId('search').sendKeys(keyword))
        .then(sleep(500))
        .then(findId('articlesList').findElements(webdriver.By.className('row')).then(
            (children)=>{
                expect(children.length).to.be.eql(1)
            }
        ))
        .then(findId('search').clear())
        .then(sleep(500))
        .then(done)
    })

    it('should add/remove a follower', (done)=>{
        let originalLength = 0
        let follower = 'Follower'
        sleep(500)
        .then(findId('followerList').findElements(webdriver.By.className('collection-item')).then(
            (followers)=>{
                originalLength = followers.length
                expect(followers.length).to.be.at.least(1)
            }
        ))
        .then(findId('inputFollow').clear())
        .then(findId('inputFollow').sendKeys(follower))
        .then(driver.executeScript('$(`side-nav`).scrollTop(500)'))
        .then(sleep(1000))
        .then(findId('btnFollow').click())
        .then(sleep(500))
        .then(findId('followerList').findElements(webdriver.By.className('collection-item')).then(
            (followers)=>{
                expect(followers.length).to.be.eql(originalLength+1)
            }
        ))
        .then(findId('followerList').findElements(webdriver.By.className('collection-item')).then(
            (elements) => {
                let newarr = elements.filter((element)=>{
                    return element.findElements(webdriver.By.className('title')).then(
                        (spans)=>{
                            const span = spans[0]
                            span.getInnerHtml().then(text=>{
                                return text == follower
                            })
                        }
                    )
                })
                console.log('array size: ' + newarr.length)
                const toremove = newarr[0]

                toremove.findElements(webdriver.By.className('remove')).then((icons)=>{
                    const icon = icons[0]
                    icon.click()
                })
            }
        ))
        .then(sleep(2000))
        .then(findId('followerList').findElements(webdriver.By.className('collection-item')).then(
            (followers)=>{
                expect(followers.length).to.be.eql(originalLength)
            }
        ))
        .then(done)

    })

    it('should navigate to profile', (done)=>{
        sleep(500)
        .then(findId('profile').click())
        .then(sleep(500))
        .then(expect(findId('home')).to.be.ok)
        .then(done)
    })

    it('should update profile - email', (done)=>{

        const oldemail = 'qw12test@rice.edu'
        const newemail = 'new@email.com'
        sleep(500)
        .then(findId('p_email').getInnerHtml().then(text=>{
            expect(text).to.be.ok
        }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys(newemail))
        .then(findId('update').click())
        .then(sleep(2000))
        .then(findId('p_email').getInnerHtml().then(text=>{
            expect(text).to.eql(newemail)
        }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys(oldemail))
        .then(findId('update').click())
        .then(sleep(500))
        .then(findId('p_email').getInnerHtml().then(text=>{
            expect(text).to.eql(oldemail)
        }))
        .then(done)
    })

    it('should update profile - zipcode', (done)=>{

        const oldzip = '77050'
        const newzip = '12345'
        sleep(500)
        .then(findId('p_zip').getInnerHtml().then(text=>{
            expect(text).to.be.ok
        }))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(newzip))
        .then(findId('update').click())
        .then(sleep(2000))
        .then(findId('p_zip').getInnerHtml().then(text=>{
            expect(text).to.eql(newzip)
        }))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(oldzip))
        .then(findId('update').click())
        .then(sleep(500))
        .then(findId('p_zip').getInnerHtml().then(text=>{
            expect(text).to.eql(oldzip)
        }))
        .then(done)
    })


    it('should update profile - password', (done)=>{
        const pass = "password"
        sleep(500)
        .then(findId('password').clear())
        .then(findId('passwordconf').clear())
        .then(findId('password').sendKeys(pass))
        .then(findId('passwordconf').sendKeys(pass))
        .then(findId('update').click())
        .then(sleep(100))
        .then(findId('toast-container').then(element=>{
            expect(element).to.be.ok
        }))
        .then(sleep(500))
        .then(done)
    })

    it('should navigate to home', (done)=>{
        sleep(500)
        .then(findId('home').click())
        .then(sleep(500))
        .then(expect(findId('logout')).to.be.ok)
        .then(done)
    })

    after('should log out', (done)=>{
        common.logout().then(done)
    })
})