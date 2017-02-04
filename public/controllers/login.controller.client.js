(function () {
    angular
        .module('App')
        .controller('LoginController', LoginController);

    function LoginController(SharedService, $location, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.user = {};
            vm.login = login;
        }

        function login() {
            UserService.login(vm.user).then(
                res => {
                    if (res.data.length === 1) {
                        let uid = res.data[0].id;
                        $location.path('/profile/' + uid);
                    } else {
                        vm.error = 'incorrect username or password';
                    }
                }
            );
        }
    }
})();
