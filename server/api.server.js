module.exports = function (app, services) {

    app.get('/api/user/id/:uid', services.user.findUserById);
    app.get('/api/user/id/:uid/type', services.user.findUserTypeById);
    app.post('/api/user/register', services.user.register);
    app.post('/api/user/login', services.user.login);
    app.put('/api/user/:uid/profile/update', services.user.updateProfile);

    app.post('/api/seller/:uid/item/create', services.seller.createItem);
    app.get('/api/seller/:uid/item/list', services.seller.listItems);
    app.put('/api/seller/:uid/item/edit/:iid', services.seller.editItem);
    app.delete('/api/seller/:uid/item/delete/:iid', services.seller.deleteItem);
    app.get('/api/seller/:uid/order/list', services.seller.listOrders);
    app.get('/api/seller/:uid/order/:oid/items', services.seller.getOrderItems);

    app.get('/api/buyer/search/item/:keywords', services.buyer.searchItem);
    app.post('/api/buyer/:uid/checkout', services.buyer.checkout);
    app.get('/api/buyer/:uid/address/list', services.buyer.listAddresses);
    app.post('/api/buyer/:uid/address/create', services.buyer.createAddress);
    app.put('/api/buyer/:uid/address/edit/:aid', services.buyer.editAddress);
    app.delete('/api/buyer/:uid/address/delete/:aid', services.buyer.deleteAddress);
    app.get('/api/buyer/:uid/payment/list', services.buyer.listPayments);
    app.post('/api/buyer/:uid/payment/create', services.buyer.createPayment);
    app.put('/api/buyer/:uid/payment/edit/:pid', services.buyer.editPayment);
    app.delete('/api/buyer/:uid/payment/delete/:pid', services.buyer.deletePayment);
    app.get('/api/buyer/:uid/order/list', services.buyer.listOrders);
    app.get('/api/buyer/:uid/order/:oid/items', services.buyer.getOrderItems);
    app.get('/api/buyer/items/featured', services.buyer.featuredItems);
    app.get('/api/buyer/:uid/shoppingcart/list', services.buyer.listShoppingCartItems);
    app.post('/api/buyer/:uid/shoppingcart/add', services.buyer.addItemToCart);
    app.delete('/api/buyer/:uid/shoppingcart/remove/:iid', services.buyer.removeItemFromCart);
    app.put('/api/buyer/:uid/shoppingcart/update', services.buyer.updateItemInCart);
    app.get('/api/buyer/items/search', services.buyer.searchItem);
};
