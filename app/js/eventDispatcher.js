
class EventDispatcher {
    constructor() {
        this.events = {};
    }

    attach(type, callback) {
        if (this.events[type] === undefined) {
            this.events[type] = [];
        }
        this.events[type].push(callback);
    }

    notify(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(arg));
        }
    };
};