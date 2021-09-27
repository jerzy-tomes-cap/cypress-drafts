    cy.get("body").then($body => {
        if ($body.find("button[data-cy=appDrawerOpener]").length > 0) {   
            //evaluates as true
        }
    });