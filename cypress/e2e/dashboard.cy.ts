describe('Personalized Content Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the dashboard with content', () => {
    cy.get('h2').contains('Your Personalized Feed').should('be.visible')
    
    // Wait for the mock API to return data
    cy.wait(1500)
    
    // Check if content cards are rendered (looking for Read Article, Play Now, or View Post)
    cy.get('a').should('exist')
  })

  it('can navigate to settings and toggle a category', () => {
    // Click Settings link in sidebar
    cy.get('nav').contains('Settings').click()
    cy.url().should('include', '/settings')
    
    cy.get('h2').contains('Content Preferences').should('be.visible')
    
    // Click a category
    cy.contains('Technology').click()
  })

  it('toggles dark mode', () => {
    // Assuming dark mode is default
    cy.get('html').should('have.class', 'dark')
    
    // Click theme toggle (it's the last button in the header)
    cy.get('header button').last().click()
    
    // Should remove dark class
    cy.get('html').should('not.have.class', 'dark')
  })
})
