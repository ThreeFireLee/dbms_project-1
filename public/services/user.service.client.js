(function () {
    angular
        .module('App')
        .factory('UserService', UserService);

    function UserService($http) {
        return {
            register: register,
            findUserById: findUserById,
            login: login,
            updateProfile: updateProfile,
            findUserTypeById: findUserTypeById,
            getAddress: getAddress,
            deleteAddress: deleteAddress,
            deletePayment: deletePayment,
        };

        function register(user) {
            return $http.post('/api/user/register', user);
        }

        function findUserById(uid) {
            return $http.get(`/api/user/id/${uid}`);
        }

        function login(user) {
            return $http.post('/api/user/login', user);
        }

        function updateProfile(uid, user) {
            return $http.put(`/api/user/${uid}/profile/update`, user);
        }

        function findUserTypeById(uid){
            return $http.get(`/api/user/id/${uid}/type`);
        }

        function getAddress(aid) {
            return $http.get(`/api/user/get/address/${aid}`);
        }

        function deleteAddress(uid, aid) {
            return $http.delete(`/api/buyer/${uid}/address/delete/${aid}`);
        }

        function deletePayment(uid, pid) {
            return $http.delete(`/api/buyer/${uid}/payment/delete/${pid}`);
        }
    }
})();
