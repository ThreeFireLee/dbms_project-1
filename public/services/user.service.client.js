(function () {
    angular
        .module('App')
        .factory('UserService', UserService);

    function UserService($http) {
        return {
            register: register,
            findUserById: findUserById,
            login: login,
        };

        function register(user) {
            return $http.post('/api/user/register', user);
        }

        function findUserById(uid) {
            return $http.get(`/api/user/${uid}`);
        }

        function login(user) {
            return $http.post('/api/user/login', user);
        }

    }
})();
