describe('Goes to homepage', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173')
	})
	it('Goes to the homepage', () => {
		cy.visit('http://localhost:5173')
	})
	it('select data', () => {
		cy.get('.MuiSwitch-root').click()
	})
})
