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
            vm.register = register;
        }

        function login() {
            UserService.login(vm.user).then(res => {
                if (res.data.length === 1) {
                    let uid = res.data[0].id;
                    UserService.findUserTypeById(uid).then(res => {
                        redir = {Buyer: "browse", Seller: "inventory"};
                        $location.path(vm.shared.getRoute(redir[res.data[0].type], {uid: uid}));
                    });
                } else {
                    vm.error = 'incorrect email or password';
                }
            });
        }

        function register() {
            $location.path(vm.shared.getRoute('register'));
        }
    }
})();
