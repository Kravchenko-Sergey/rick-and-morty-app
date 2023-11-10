describe('Goes to homepage', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173')
	})
	it('Goes to the homepage', () => {
		cy.visit('http://localhost:5173')
	})
	it('textField data', () => {
		cy.get('#outlined-basic').type('Rick')
	})
})
