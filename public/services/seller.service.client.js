(function () {
    angular
        .module('App')
        .factory('SellerService', SellerService);

    function SellerService($http) {
        return {
            createItem: createItem,
            listItems: listItems,
            deleteItem:deleteItem,
            updateItem: updateItem,
            loadOrders: loadOrders,
            getOrderItems: getOrderItems,
        };

        function createItem(uid, item) {
            return $http.post(`/api/seller/${uid}/item/create`, item);
        }

        function listItems(uid) {
            return $http.get(`/api/seller/${uid}/item/list`);
        }

        function deleteItem(uid, iid) {
            return $http.delete(`/api/seller/${uid}/item/delete/${iid}`);
        }

        function updateItem(uid, iid, item) {
            return $http.put(`/api/seller/${uid}/item/edit/${iid}`, item);
        }

        function loadOrders(uid) {
            return $http.get(`/api/seller/${uid}/order/list`);
        }

        function  getOrderItems(uid, oid) {
            return $http.get(`/api/seller/${uid}/order/${oid}/items`);
        }
    }
})();
