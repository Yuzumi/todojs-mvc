
class Controller {
    constructor(model, view) {
        this.model  = model;
        this.view   = view;

        view.attach('add'   , this.addTodo.bind(this));
        view.attach('edit'  , this.editTodo.bind(this));
        view.attach('toggle', this.toggleTodo.bind(this));
        view.attach('delete', this.deleteTodo.bind(this));
    }

    addTodo(title) {
        const todo = this.model.addItem({
            id: Date.now(),
            title: title,
            completed: false

        });

        this.view.addItem(todo);
    }

    editTodo({ id, title}) {
        const todo = this.model.updateItem(id, { title });

        this.view.editItem(todo);
    }

    toggleTodo({ id, completed }) {
        const todo = this.model.updateItem(id, { completed });

        this.view.toggleItem(todo);
    }

    deleteTodo(id) {
        this.model.deleteItem(id);
        this.view.removeItem(id);
    }
};

export default Controller;