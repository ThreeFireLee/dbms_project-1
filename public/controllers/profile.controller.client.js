(function () {
    angular
        .module('App')
        .controller('ProfileController', ProfileController);

    function ProfileController(SharedService, UserService, BuyerService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.showAddAddress = false;
            vm.showAddPaymethod = false;
            vm.newAddress = {};
            vm.newPaymethod = {};
            vm.updateProfile = updateProfile;
            vm.addAddress = addAddress;
            vm.addPayMethod = addPayMethod;
            vm.loadAddresses = loadAddresses;
            vm.loadPayMethods = loadPayMethods;

            UserService.findUserById(vm.uid).then(res => {
                vm.user = res.data[0];
                vm.greeting = `Hello, ${vm.user.first}`;
            });
            vm.loadAddresses();
            vm.loadPayMethods();
        }

        function updateProfile() {
            UserService.updateProfile(vm.uid, vm.user).then(res => {
                vm.greeting = `Hello, ${vm.user.first}`;
                console.log('profile updated');
            });
        }

        function addAddress() {
            BuyerService.addAddress(vm.uid, vm.newAddress).then(res => {
                vm.showAddAddress = false;
                vm.newAddress = {};
                vm.loadAddresses();
            });
        }

        function loadAddresses() {
            BuyerService.listAddresses(vm.uid).then(res => {
                vm.addresses = res.data;
            });
        }

        function addPayMethod() {
            BuyerService.addPayMethod(vm.uid, vm.newPaymethod).then(res => {
                vm.showAddPaymethod = false;
                vm.newPaymethod = {};
                vm.loadPayMethods();
            });
        }

        function loadPayMethods() {
            BuyerService.listPayments(vm.uid).then(res => {
                vm.paymethods = res.data;
            });
        }
    }
})();
