```js
/// <reference types="cypress" />

describe('Hover card behavior', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=task-item]').first().as('firstTask');
  });

  it('remains visible when moving the cursor from the task to the hover card placed below', () => {
    // show hover card
    cy.get('@firstTask').trigger('mouseenter');
    cy.get('[data-cy=hover-card]').should('be.visible').as('hoverCard');

    // move cursor into the hover card (below the task)
    cy.get('@hoverCard').then($card => {
      const rect = $card[0].getBoundingClientRect();
      cy.get('@firstTask')
        .trigger('mousemove', {
          clientX: rect.left + 5,
          clientY: rect.top + 5,
          force: true,
        });
    });

    // card should still be visible
    cy.get('@hoverCard').should('be.visible');
  });

  it('hides after the cursor leaves both the task and the hover card', () => {
    cy.get('@firstTask').trigger('mouseenter');
    cy.get('[data-cy=hover-card]').should('be.visible');

    // move cursor far away from both elements
    cy.get('body')
      .trigger('mousemove', { clientX: 0, clientY: 0, force: true });

    // wait for the hide delay defined in the component
    cy.wait(250);
    cy.get('[data-cy=hover-card]').should('not.exist');
  });
});
```