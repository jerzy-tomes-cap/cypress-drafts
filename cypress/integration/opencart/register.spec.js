///<reference types='cypress'/>
import * as utils from './utils.spec.js';
import * as urls from './urls.spec.js';
import * as register from './pages/registerPage.spec.js';
import * as login from './pages/loginPage.spec';

describe('registration and login process', function () {
    before(function () {
        cy.visit(urls.baseUrl);        
        cy.fixture("users").then((users) => {
            utils.createUserApi(users.USER_CONST);
        })
        utils.updateUserVar();

    })
    beforeEach(function () {
        cy.visit(urls.baseUrl);
        cy.fixture("users").then((users) => {
            this.users = users;
        })

    })

    afterEach(function () {
        utils.logOut();
    })

    it('opens the registration form', function () {
        cy.get('a.dropdown-toggle[title=\'My Account\']').click();
        cy.contains('Register').click();

        cy.get('form.form-horizontal').should('be.visible');
    })

    it('fills up the form and creates user correctly', function () {

        utils.visitSubsite('account', 'register');
        register.fillUpTheForm(this.users.USER_VAR);
        cy.contains('Your Account Has Been Created!').should('be.visible');
    })

    it('should not allow duplicating user', function () {
        utils.visitSubsite('account', 'register');
        register.fillUpTheForm(this.users.USER_CONST)
        cy.contains('Warning: E-Mail Address is already registered!').should('be.visible');
    })

    it('should not allow creating account without privacy policy agreement', function () {
        let userWrong = this.users.USER_CONST;
        userWrong.email = Date.now() + 'unique@email.vv';
        userWrong.agree = 0;

        utils.visitSubsite('account', 'register');
        register.fillUpTheForm(userWrong)
        cy.contains('Warning: You must agree to the Privacy Policy!').should('be.visible');
    })

    it('logs in with created credentials', function () {
        cy.get('a.dropdown-toggle[title=\'My Account\']').click();
        cy.contains('Login').click();
        cy.contains('Returning Customer').should('be.visible');

        login.login(this.users.USER_CONST);
        cy.contains('My Account').should('be.visible');
    })

    it("it doesn't log in with wrong credentails", function () {
        let wrongPassword = this.users.USER_CONST;
        wrongPassword.password = 'ddddddd';
        utils.visitSubsite('account', 'login');

        login.login(wrongPassword);
        cy.contains('Warning: No match for E-Mail Address and/or Password.')

    })

})