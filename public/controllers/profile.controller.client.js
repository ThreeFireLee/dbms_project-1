(function () {
    angular
        .module('App')
        .controller('ProfileController', ProfileController);

    function ProfileController(SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            UserService.findUserById(vm.uid).then(res => {
                vm.user = res.data[0];
            });
        }

    }
})();
