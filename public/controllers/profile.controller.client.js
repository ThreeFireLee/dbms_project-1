(function () {
    angular
        .module('App')
        .controller('ProfileController', ProfileController);

    function ProfileController(SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.update = update;

            UserService.findUserById(vm.uid).then(res => {
                vm.user = res.data[0];
            });
        }

        function update(){
            UserService.updateProfile(vm.uid, vm.user).then(res => {
                console.log('profile updated');
            });
        }

    }
})();
