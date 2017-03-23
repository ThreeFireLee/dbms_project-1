(function () {
    angular
        .module('App')
        .controller('RegisterController', RegisterController);

    function RegisterController(SharedService, $location, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.user = {
                type: 'Buyer',
            };
            vm.login = login;
            vm.register = register;
        }

        function login() {
            $location.path(vm.shared.getRoute('login'));
        }

        function register() {
            UserService.register(vm.user).then(res => {
                console.log(res);
                let uid = res.data.insertId;
                $location.path(vm.shared.getRoute('profile', {uid: uid}));
            });
        }
    }

})();
