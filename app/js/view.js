
class View extends EventDispatcher {
    constructor() {
        super();

        this.form   = document.getElementById('todo-form');
        this.list   = document.getElementById('todo-list');
        this.input  = document.getElementById('todo-input');

        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`)
    }

    display(todos) {
        todos.forEach(todo => {
            const listItem = this.createListItem(todo);

            this.list.appendChild(listItem);
        });
    }

    addItem(todo) {
        const listItem = this.createListItem(todo);
        
        this.input.value = '';
        this.list.appendChild(listItem);
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id);
        const checkbox = listItem.querySelector('input.checkbox');

        checkbox.checked = todo.completed;

        todo.completed 
            ? listItem.classList.add('completed')
            : listItem.classList.remove('completed');
    }

    editItem(todo) {
        const listItem      = this.findListItem(todo.id);
        const label         = listItem.querySelector('.title');
        const input         = listItem.querySelector('.text-field');
        const editButton    = listItem.querySelector('button.edit');

        label.textContent       = todo.title;
        editButton.textContent  = 'Edit';
        listItem.classList.remove('editing');
    }

    deleteItem(id) {
        const listItem = this.findListItem(id);
        this.list.removeChild(listItem);
    }

    createElement(tag, properties, ...children) {
        const element = document.createElement(tag);

        Object.keys(properties).forEach(key => {
            key.startsWith('data-')
                ? element.setAttribute(key, properties[key])
                : element[key] = properties[key];
        });

        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
        return element;
    }

    createListItem(todo) {
        const checkbox = this.createElement('input', { 
            type        : 'checkbox', 
            className   : 'checkbox',
            checked     : todo.completed ? 'checked' : ''
        });

        const editInput = this.createElement('input', {
            type: 'text',
            className: 'text-field'
        })

        const label         = this.createElement('label', { className: 'title' }, todo.title);
        const editButton    = this.createElement('button', { className: 'edit' }, 'Edit');
        const deleteButton  = this.createElement('button', { className: 'delete' }, 'Delete');

        const item          = this.createElement('li', { 
            className: `todo-item${ todo.completed ? ' completed' : '' }`, 
            'data-id': todo.id 
        }, checkbox, label, editInput, editButton, deleteButton);

        return this.addEventListeners(item);
    }

    addEventListeners(item) {
        const checkbox      = item.querySelector('.checkbox');
        const editButton    = item.querySelector('button.edit');
        const deleteButton  = item.querySelector('button.delete');

        checkbox.addEventListener('change', this.handleToggle.bind(this));
        editButton.addEventListener('click', this.handleEdit.bind(this));
        deleteButton.addEventListener('click', this.handleDelete.bind(this));

        return item;
    }

    handleToggle({ target }) {
        const listItem      = target.parentNode;
        const id            = listItem.getAttribute('data-id');
        const completed     = target.checked;

        this.notify('toggle', { id, completed });
    }

    handleEdit({ target }) {
        const listItem      = target.parentNode;
        const id            = listItem.getAttribute('data-id');
        const label         = listItem.querySelector('.title');
        const input         = listItem.querySelector('.text-field');
        const editButton    = listItem.querySelector('button.edit');
        const title         = input.value;
        const isEditing     = listItem.classList.contains('editing');

        if (isEditing) {
            this.notify('edit', { id, title });
        } else {
            input.value = label.textContent;
            editButton.textContent = 'Save';
            listItem.classList.add('editing');
        }
    }

    handleDelete({ target }) {
        const listItem = target.parentNode;
        
        this.notify('delete', listItem.getAttribute('data-id'));
    }

    handleAdd(event) {
        event.preventDefault();

        if ( ! this.input.value) return alert('Please, enter the task');

        const value = this.input.value;

        this.notify('add', value);
    }
};