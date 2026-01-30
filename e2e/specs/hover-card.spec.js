```javascript
// e2e/specs/hover-card.spec.js

describe('Hover Card behavior', () => {
  beforeEach(() => {
    // Adjust the URL to match the page where the task list is rendered
    cy.visit('/');
  });

  it('stays visible when moving cursor from task row to the hover card', () => {
    // Hover over the first task row
    cy.get('[data-cy=task-row]').first().trigger('mouseenter');

    // Hover card should appear
    cy.get('[data-cy=hover-card]').should('be.visible');

    // Move cursor onto the hover card itself
    cy.get('[data-cy=hover-card]').trigger('mouseenter');

    // Small wait to let any timers settle
    cy.wait(150);

    // Hover card must still be visible
    cy.get('[data-cy=hover-card]').should('be.visible');

    // Leave the task row but keep the cursor on the hover card
    cy.get('[data-cy=task-row]').first().trigger('mouseleave');

    // Ensure the card remains visible after the row's mouseleave
    cy.wait(150);
    cy.get('[data-cy=hover-card]').should('be.visible');

    // Finally, move the cursor away from the hover card
    cy.get('[data-cy=hover-card]').trigger('mouseleave');

    // Card should disappear after the hide delay
    cy.wait(300);
    cy.get('[data-cy=hover-card]').should('not.exist');
  });
});
```