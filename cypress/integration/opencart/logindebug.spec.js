///<reference types='cypress'/>
import * as utils from './utils.spec.js';
import * as urls from './urls.spec.js';
import * as register from './pages/registerPage.spec.js';
import * as login from './pages/loginPage.spec';

describe('debug', () => {
    it('debugs', () => {
 cy.visit(urls.baseUrl)
        utils.updateUserVar()
        cy.log('update')
        cy.readFile("cypress/fixtures/users.json").then((users)=>{
            utils.createUserApi(users.USER_VAR);
            utils.loginApi(users.USER_VAR);

        })

        cy.visit(urls.baseUrl);
        utils.createUserApi(USERx);
        //utils.createUserApi(utils.USER2);
        utils.logOut();
        utils.loginApi(USERx);
        //utils.loginApi(utils.USER2);
    })
})