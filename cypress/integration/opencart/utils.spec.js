///<reference types='cypress'/>
import * as urls from './urls.spec.js';

import iPhone from '../../fixtures/iPhone.json';
import macBook from '../../fixtures/macBook.json';

export const USER1 = {
    firstname: 'jerzy',
    lastname: 'jwojdw',
    email: Date.now() + 'uefe@fiejfe.vo',
    telephone: '683691830',
    password: 'ihwrwwj2801830',
    newsletter: 0,
    agree: 1
}
export const USER2 = {
    firstname: 'user2',
    lastname: 'jwojdw',
    email: 'fdwgur@fiejfe.vo',
    telephone: '683691830',
    password: 'ihwrwwj2801830',
    newsletter: 1,
    agree: 1
}

export function updateUserVar(){
    cy.readFile('cypress/fixtures/users.json').then((obj) => {
        cy.log('before '+ obj.USER_VAR.email);
        obj.USER_VAR.email = Date.now() + "uefe@fiejfe.vo";
        cy.log('after '+ obj.USER_VAR.email);
        cy.writeFile('cypress/fixtures/users.json', obj);
    });
}


export const createUserApi = function (user) {

    // use for setup with correct user
    cy.request({
        method: 'POST',
        form: true,
        url: urls.getRouteUrl('account') + 'register',
        body: user
    })
        .then((response) => {
            expect(response.status).to.eq(200);
        })
    cy.getCookie('OCSESSID').should('exist');
}


export const logOut = function () {
    cy.request({
        method: 'GET',
        url: urls.acountRouteUrl + 'logout'
    })
        .then((response) => {
            expect(response.status).to.eq(200);
        })
}




export const loginApi = function (user) {
    let body = {
        email: user.email,
        password: user.password
    };
    cy.request({
        method: 'POST',
        url: urls.getRouteUrl('account')+'login',
        form: true,
        body: body
    })
        .then((response) => {
            expect(response.status).to.eq(200);
        })
    cy.getCookie('OCSESSID').should('exist');
    cy.reload();
}


export const visitSubsite = function (route, subsite) {
    cy.visit(urls.getRouteUrl(route) + subsite);
}



export const addToCartAction = function (product, quantity) {
    cy.intercept(urls.cartInfoUrl).as('cartInfo');
    for (let i = 0; i < quantity; i++) {
        cy.window().then(({ cart }) => {
            cart.add(product.id);
            cy.wait('@cartInfo');
        })
    }
}



export const addToWishlistClick = function (name) {
    cy.intercept(urls.getRouteUrl('account') +'/wishlist/add').as('add');
    cy.contains(name).last().closest('div.product-thumb').find('button i.fa-heart').click();
    cy.wait('@add');
}

export const addToWishlistAction = function (id) {

    cy.intercept(urls.getRouteUrl('account') +'/wishlist/add').as('add');
    cy.window().then(({ wishlist }) => {
        wishlist.add(id);
    })
    cy.wait('@add');
}

export function removeFromWishlist(product) {
    cy.get(`div.table-responsive tr:contains(${product}) a.btn-danger`).click();
}
export function clearWishlist() {
    cy.request(urls.getRouteUrl('account') +'wishlist&remove=' + iPhone.id)
    cy.request(urls.getRouteUrl('account') +'wishlist&remove=' + macBook.id);
}

export function addToCartFromWishlist(product) {
    cy.get(`div.table-responsive tr:contains(${product}) button`).click();
}


export function clearCart() {
    cy.get('#cart-total').click();
    
    cy.get('button[title="Remove"]').each(($button, index) => {
        cy.wrap($button).click();
        cy.get('#cart-total').click();
    })

    //    cy.window().then((win)=>{
    //        //win.eval(`cart.remove("${iPhone.key}");`);
    //        win.eval('cart.remove("740138");');
    //        win.eval('cart.remove("742635");');
    //
    //        //win.eval(`cart.remove("${macBook.key}");`);
    //    })

}
