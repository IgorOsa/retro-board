import { getGreeting } from '../support/app.po';

describe('retroboard', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('john@example.com', 'password');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('RetroBoard');
  });
});
