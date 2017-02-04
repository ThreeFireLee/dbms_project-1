(function () {
    angular
        .module('App')
        .controller('RegisterController', RegisterController);

    function RegisterController(SharedService) {
        const vm = this;
        vm.shared = SharedService;
    }
})();
