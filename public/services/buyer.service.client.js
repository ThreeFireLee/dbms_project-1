(function () {
    angular
        .module('App')
        .factory('BuyerService', BuyerService);

    function BuyerService($http) {
        return {
            loadFeaturedItems: loadFeaturedItems,
            loadOrders: loadOrders,
            loadShoppingCart: loadShoppingCart,
            addItemToCart: addItemToCart,
            addPayMethod: addPayMethod,
            listPayments: listPayments,
            listAddresses: listAddresses,
            addAddress: addAddress,
            loadShippingAddresses: loadShippingAddresses,
            placeOrder: placeOrder,
        };

        function loadFeaturedItems() {
            return $http.get(`/api/buyer/items/featured`);
        }

        function loadOrders(uid) {
            return $http.get(`/api/buyer/${uid}/order/list`);
        }

        function loadShoppingCart(uid) {
            return $http.get(`/api/buyer/${uid}/shoppingcart/list`);
        }

        function addItemToCart(uid, iid, quantity) {
            let item = {iid: iid, quantity: quantity || 1};
            return $http.post(`/api/buyer/${uid}/shoppingcart/add`, item);
        }

        function addPayMethod(uid, paymethod) {
            return $http.post(`/api/buyer/${uid}/payment/create`, paymethod);
        }

        function listPayments(uid){
            return $http.get(`/api/buyer/${uid}/payment/list`);
        }

        function listAddresses(uid) {
            return $http.get(`/api/buyer/${uid}/address/list`);
        }

        function addAddress(uid, address) {
            return $http.post(`/api/buyer/${uid}/address/create`, address);
        }

        function loadShippingAddresses(uid) {
            return $http.get(`/api/buyer/${uid}/address/list`);
        }
        function  placeOrder(uid, order) {
            return $http.post(`/api/buyer/${uid}/checkout`, order);
        }
    }
})();
