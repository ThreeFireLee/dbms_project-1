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
            return $http.put(`'/api/user/${uid}/update/profile'`, user);
        }

    }
})();
