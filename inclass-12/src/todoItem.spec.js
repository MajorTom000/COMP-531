import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text='hello' done={false} toggle={_=>_} remove={_=>_}/>
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(elements.children.length).to.equal(3)
		expect(elements.children[1].className).to.equal('')
		expect(elements.children[1].innerHTML).to.equal('hello')
		// use TestUtils.renderIntoDocument
		// findDOMNode and assert 3 children of the ToDoItem element
		// assert the className is ''
		// assert the innerHTML of the todo is the text you initially set
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text='something' done={false} toggle={()=>{toggled=true}} remove={_=>_}/>
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(toggled).to.be.false
		TestUtils.Simulate.click(elements.children[0])
		expect(toggled).to.be.true
		// use TestUtils.renderIntoDocument
		// when the checkbox is clicked via TestUtils.Simulate.click()
		// we expect the variable toggled to be true
	})

	it('should remove an item when clicked', () => {
		let removed = false
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text='something' done={false} remove={()=>{removed=true}} toggle={_=>_}/>
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(removed).to.be.false
		TestUtils.Simulate.click(elements.children[2])
		expect(removed).to.be.true
		// use TestUtils.renderIntoDocument
		// when the remove button is clicked via TestUtils.Simulate.click()
		// we expect the variable removed to be true
	})

	it('should display a completed ToDo', () => {
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text='something' done={true} toggle={_=>_} remove={_=>_}/>
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(elements.children[1].className).to.equal('completed')
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		// assert that the rendered className is "completed"
	})

})
