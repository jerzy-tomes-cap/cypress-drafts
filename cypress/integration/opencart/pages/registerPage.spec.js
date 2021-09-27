///<reference types='cypress'/>
const selectors = {
    inputFirstname: '#input-firstname',
    inputLastname: '#input-lastname',
    inputEmail: '#input-email',
    inputPhone: '#input-telephone',
    inputPassword: '#input-password',
    inputConfirm: '#input-confirm',
    checkboxNewsletter: 'input[value="1"][type="radio"][name="newsletter"]',
    checkboxPrivacy: "input[value='1'][type='checkbox'][name='agree']",
    buttonSubmit: "input[type='submit']"

}


export const fillUpTheForm = function (user) {
    cy.get(selectors.inputFirstname).type(user.firstname);
    cy.get(selectors.inputLastname).type(user.lastname);
    cy.get(selectors.inputEmail).type(user.email);
    cy.get(selectors.inputPhone).type(user.telephone);

    cy.get(selectors.inputPassword).type(user.password);
    cy.get(selectors.inputConfirm).type(user.password);

    if (user.newsletter == 1) {
        cy.get(selectors.checkboxNewsletter).check();
    } else {
        cy.get(selectors.checkboxNewsletter).check();
    }

    if (user.agree == 1) {
        cy.get(selectors.checkboxPrivacy).check();
    } else {
        cy.get(selectors.checkboxPrivacy).uncheck();
    }

    cy.get(selectors.buttonSubmit).click();
}