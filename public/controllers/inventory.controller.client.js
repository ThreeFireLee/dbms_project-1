(function () {
    angular
        .module('App')
        .controller('InventoryController', InventoryController);

    function InventoryController(SharedService, $location, SellerService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.showAddInventory = false;
            vm.newItem = {};
            vm.inventory = [];
            vm.createItem = createItem;
            vm.loadInventory = loadInventory;

            vm.loadInventory();
        }

        function createItem() {
            vm.newItem.seller = vm.uid;
            SellerService.createItem(vm.uid, vm.newItem).then(res => {
                vm.newItem = {};
                vm.loadInventory();
            });
        }

        function loadInventory() {
            SellerService.listItems(vm.uid).then(res => {
                vm.inventory = res.data;
            });
        }
    }

})();
