///<reference types='cypress'/>
import * as urls from '../urls.spec'


export const selectors = {
    table: 'div.table-responsive tbody tr',
    productDiv: 'div.product-thumb',
    cartButton: 'button i.fa-shopping-cart',
    inputNumberofProducts: function (productName) {
        return `div.table-responsive tr:contains(${productName}) input`;
    },
    updateBtn: function (productName) {
        return `div.table-responsive tr:contains(${productName}) button.btn-primary`
    },

    delBtn: function (productName) {
        return `div.table-responsive tr:contains(${productName}) button.btn-danger`;
    }
}


export function addToCart(product, quantity) {
    cy.intercept(urls.cartInfoUrl).as('cartInfo');
    for (let i = 0; i < quantity; i++) {
        cy.contains(product.name).last().closest(selectors.productDiv).find(selectors.cartButton).click();
    }
    cy.wait('@cartInfo');

}


export function verifyCartTable(productsToQuantities) {
    cy.get(selectors.table).as('table');
    cy.get('@table').should('have.length', productsToQuantities.size);
    productsToQuantities.forEach((value, key) => {
        cy.get('@table').should('contain.text', key);
        cy.get('@table').find('input').invoke('val').should('equal', value);
    })


}

export function updateCart(products) {
    products.forEach((value, key) => {
        cy.get(selectors.inputNumberofProducts(key)).clear().type(value);
        cy.get(selectors.updateBtn(key)).click();

    })
}
export function removeProduct(product) {
    cy.get(selectors.delBtn(product.name)).click();
}