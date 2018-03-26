const modalWindowController = function(){
    this.noContentClickPropagate = ($event) => {
        $event.stopPropagation()
    }
};
//modalWindowController.$inject = [];
export const modalWindowComponent = {
    template: require('./modal-window.component.html'),
    transclude: true,
    styleUrls: [require('./modal-window.component.css')],
    controller: modalWindowController
};
