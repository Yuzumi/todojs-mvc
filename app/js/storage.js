
class Storage {
    static save(data, id) {
        const string = JSON.stringify(data);

        localStorage.setItem(id, string);
    }

    static load(id) {
        const string    = localStorage.getItem(id);
        const data      = JSON.parse(string);

        return data;
    }
};