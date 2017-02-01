(function () {
    angular
        .module('App')
        .controller('ProfileController', ProfileController);

    function ProfileController(SharedService) {
        const vm = this;
        vm.shared = SharedService;
    }
})();
