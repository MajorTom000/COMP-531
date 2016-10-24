import {expect} from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Test resource', () => {

	beforeEach(() => {
		global.fetch = fetch
	})

	afterEach(() => {
		while (document.body.children.length) {
			document.body.removeChild(document.body.children[0])
		}
	})

})