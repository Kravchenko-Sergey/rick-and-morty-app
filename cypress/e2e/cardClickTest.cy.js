describe('Goes to homepage', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173')
	})
	it('Goes to the homepage', () => {
		cy.visit('http://localhost:5173')
	})
	it('Clicks the Add Element Button', () => {
		cy.get('._items_15h2n_24').children().first().click()
	})
})
