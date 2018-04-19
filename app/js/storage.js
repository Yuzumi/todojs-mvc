
class Storage {
    static save(data) {
        const string = JSON.stringify(data);

        localStorage.setItem('todos', string);
    }

    static load() {
        const string    = localStorage.getItem('todos');
        const data      = JSON.parse(string);

        return data;
    }
};