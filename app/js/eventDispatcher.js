
class EventDispatcher {
    constructor() {
        this.events = {};
    }

    attach(type, listener) {
        if (this.events[type] === undefined) {
            this.events[type] = [];
        }
        this.events[type].push(listener);
    }

    notify(type, arg) {
        this.events[type].forEach(listener => listener(arg));
    };
};