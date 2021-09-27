///<reference types='cypress'/>
import * as utils from './utils.spec.js';
import * as urls from './urls.spec.js';

describe('wishlist', () => {
    before(() => {
        //cy.visit(urls.baseUrl);
        //utils.createUserApi(utils.USER2);
    })

    beforeEach(() => {
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
        //utils.clearWishlist()
        //cy.visit(urls.baseUrl)
        //utils.loginApi(utils.USER2);
    })

    afterEach(() => {
        //utils.clearWishlist()
        //utils.clearCart();

        utils.logOut();
    })

    it('adds a product to wishlist', ()=>{
        utils.addToWishlistClick('iPhone');
        utils.visitSubsite('account', 'wishlist');
        cy.contains('iPhone').should('exist');
       cy.get('div.table-responsive tbody tr').should('have.length', 1);
    })

   it('adds multiple products to wishlist', ()=>{
       utils.addToWishlistClick('iPhone');
       utils.addToWishlistClick('MacBook');
       utils.visitSubsite('account', 'wishlist');

       cy.contains('iPhone').should('exist');
       cy.contains('MacBook').should('exist');
       cy.get('div.table-responsive tbody tr').should('have.length', 2);

       }) 
    
    it('adds multiple items then removes one', ()=>{
        utils.addToWishlistAction('40');
        utils.addToWishlistAction('43');
        utils.visitSubsite('account', 'wishlist');
        
        cy.contains('iPhone').should('exist');
        cy.contains('MacBook').should('exist');
        cy.get('div.table-responsive tbody tr').should('have.length', 2);

        utils.removeFromWishlist('iPhone');

        cy.get('div.table-responsive tbody tr').contains('iPhone').should('not.exist');
        cy.get('div.table-responsive tbody tr').contains('MacBook').should('exist');
        cy.get('div.table-responsive tbody tr').should('have.length', 1);

    })

    it('adds item from wishlist to cart', ()=>{
        utils.addToWishlistAction('40');
        utils.visitSubsite('account', 'wishlist');

        utils.addToCartFromWishlist('iPhone');
        let products = new Map();
        products.set('iPhone', '1');
        utils.visitSubsite('checkout', 'cart')
        utils.verifyCartTable(products)

        cy.get('button.btn-danger').click();

    })
})