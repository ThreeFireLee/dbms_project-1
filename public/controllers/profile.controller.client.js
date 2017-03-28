(function () {
    angular
        .module('App')
        .controller('ProfileController', ProfileController);

    function ProfileController(SharedService, UserService, BuyerService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.newAddress = {};
            vm.newPaymethod = {};
            vm.updateProfile = updateProfile;
            vm.addAddress = addAddress;
            vm.addPayMethod = addPayMethod;
            vm.reloadAddresses = reloadAddresses;
            vm.reloadPayMethods = reloadPayMethods;

            UserService.findUserById(vm.uid).then(res => {
                vm.user = res.data[0];
            });
            vm.reloadAddresses();
            vm.reloadPayMethods();
        }

        function updateProfile() {
            UserService.updateProfile(vm.uid, vm.user).then(res => {
                console.log('profile updated');
            });
        }

        function addAddress() {
            BuyerService.addAddress(vm.uid, vm.newAddress).then(res => {
                vm.newAddress = {};
                vm.reloadAddresses();
            });
        }

        function reloadAddresses() {
            BuyerService.listAddresses(vm.uid).then(res => {
                vm.addresses = res.data;
            });
        }

        function addPayMethod(){
            BuyerService.addPayMethod(vm.uid, vm.newPaymethod).then(res => {
                vm.newPaymethod = {};
                vm.reloadPayMethods();
            });
        }
        function reloadPayMethods(){
            BuyerService.listPayments(vm.uid).then(res => {
                vm.paymethods = res.data;
            });
        }
    }
})();
