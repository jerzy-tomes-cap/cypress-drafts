///<reference types='cypress'/>
export const baseUrl = 'https://demo.opencart.com/';
export const acountRouteUrl = 'https://demo.opencart.com/index.php?route=account/';
export const checkoutRouteUrl ='https://demo.opencart.com/index.php?route=checkout/';
export const commonRouteUrl ='https://demo.opencart.com/index.php?route=common/';

export const cartInfoUrl = 'https://demo.opencart.com/index.php?route=common/cart/info';

export const getRouteUrl = function(route){
    switch (route) {
        case 'base':
            return baseUrl; 
        case 'account':
            return acountRouteUrl;
        case 'checkout':
            return checkoutRouteUrl;
        case 'common':
            return commonRouteUrl;
    
        default:
            return '';
    } 
}