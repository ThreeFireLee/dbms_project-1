(function () {
    angular
        .module('App')
        .controller('LoginController', LoginController);

    function LoginController(SharedService) {
        const vm = this;
        vm.shared = SharedService;
    }
})();
