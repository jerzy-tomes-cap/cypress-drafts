///<reference types='cypress'/>

const selectors = {
    inputEmail: '#input-email',
    inputPassword: '#input-password',
    buttonLogin: "input[value='Login']"
}

export const login = function (user) {
    cy.get(selectors.inputEmail).type(user.email);
    cy.get(selectors.inputPassword).type(user.password);
    cy.get(selectors.buttonLogin).click();
}