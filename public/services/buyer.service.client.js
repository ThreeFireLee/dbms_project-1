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

        function addPayMethod(){

        }
    }
})();
