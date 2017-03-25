(function () {
    angular
        .module('App')
        .factory('SellerService', SellerService);

    function SellerService($http) {
        return {
            createItem: createItem,
            listItems: listItems,
            loadOrders: loadOrders,
        };

        function createItem(uid, item) {
            return $http.post(`/api/seller/${uid}/item/create`, item);
        }

        function listItems(uid) {
            return $http.get(`/api/seller/${uid}/item/list`);
        }

        function loadOrders(uid) {
            return $http.get(`/api/seller/${uid}/order/list`);
        }
    }
})();
