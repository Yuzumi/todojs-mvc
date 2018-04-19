
class Model extends EventDispatcher {
    constructor(storage = []) {
        super();

        this.storage = storage;
    }

    getItem(id) {
        return this.storage.find(item => item.id == id);
    }

    addItem(item) {
        this.storage.push(item);
        this.notify('change', this.storage);

        return item;
    }

    updateItem(id, data) {
        const item = this.getItem(id);

        Object.keys(data).forEach(key => item[key] = data[key]);

        this.notify('change', this.storage);

        return item;
    }

    deleteItem(id) {
        const index = this.storage.findIndex(item => item.id == id);
        
        if (index > -1) {
            this.storage.splice(index , 1);
            this.notify('change', this.storage);
        }
    }
};