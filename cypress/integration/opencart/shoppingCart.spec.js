///<reference types='cypress'/>
import * as utils from './utils.spec.js';
import * as urls from './urls.spec.js';
import * as cart from './pages/cartPage.spec';

import iPhone from '../../fixtures/iPhone.json'
import macBook from '../../fixtures/macBook.json';
import { login } from './pages/loginPage.spec.js';
import { fillUpTheForm } from './pages/registerPage.spec.js';

describe('shopping process', ()=>{

    beforeEach(()=>{
        cy.visit(urls.baseUrl)
        utils.updateUserVar();
        cy.readFile("cypress/fixtures/users.json").then((users)=>{
            // terrible workaround as I can't bring account creation by api to work for some reason
            utils.visitSubsite('account', 'register')
            fillUpTheForm(users.USER_VAR);
            cy.visit(urls.baseUrl);
            //utils.createUserApi(users.USER_VAR);
            utils.loginApi(users.USER_VAR);
        })
        
    })

    afterEach(()=>{
        utils.logOut();
    })

    it('adds 1 product to cart', ()=>{
        let products = new Map();
        products.set(iPhone.name, '1');


        cart.addToCart(iPhone, products.get(iPhone.name));
        cy.get('#cart-total').invoke('text').should('contain', '1 item');
        cy.get('#cart-total').click();
        cy.contains('View Cart').click();
        
        cart.verifyCartTable(products);

    })

    it('adds 2 types of product', ()=>{
        let products = new Map();
        products.set(iPhone.name, '1');
        products.set(macBook.name, '1');

        cart.addToCart(macBook, products.get(macBook.name));
        cart.addToCart(iPhone, products.get(iPhone.name));

        cy.get('#cart-total').invoke('text').should('contain', '2 item');
        cy.get('#cart-total').click();
        cy.contains('View Cart').click();

        cart.verifyCartTable(products);
    })

    it('adds some quantity of product and then removes it', ()=>{
        let products = new Map();
        products.set(iPhone.name, '5');

        utils.addToCartAction(iPhone, 5);
        cy.get('#cart-total').invoke('text').should('contain', '5 item');

        utils.visitSubsite('checkout', 'cart');
        cart.verifyCartTable(products);

        products.set(iPhone.name, '3');
        cart.updateCart(products);
        cy.contains('Success: You have modified your shopping cart!');
        cart.verifyCartTable(products);
    })
    
    it('adds some product and removes all of it', ()=>{
        let products = new Map();
        products.set(iPhone.name, '5');

        utils.addToCartAction(iPhone, 5);
        cy.get('#cart-total').invoke('text').should('contain', '5 item');

        utils.visitSubsite('checkout', 'cart');
        cart.verifyCartTable(products);

        cart.removeProduct(iPhone);
        cy.get(cart.selectors.table).should('not.exist');

    })

})