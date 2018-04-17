
class View {
    constructor() {
        this.form   = document.getElementById('todo-control');
        this.input  = document.getElementById('task-input');
        this.button = document.getElementById('task-add');
        this.list   = document.getElementById('todo-list');

        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    addItem(todo) {
        const listItem = this.createListItem(todo);

        this.input.value = '';
        this.list.appendChild(listItem);
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id);
        const checkbox = listItem.querySelector('.checkbox');

        checkbox.checked = todo.completed;

        todo.completed 
            ? listItem.classList.add('completed')
            : listItem.classList.remove('completed');
    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}]"`);
    }

    editItem(todo) {
        const listItem = this.findListItem(todo.id);
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.text-field');
        const editButton = listItem.querySelector('.edit');

        label.textContent = todo.title;
        editButton.textContent = 'Change';
        listItem.classList.remove('editing');
    }

    removeItem(id) {
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
        const editButton    = this.createElement('button', { className: 'edit' }, 'Change');
        const deleteButton  = this.createElement('button', { className: 'delete' }, 'Delete');

        const item          = this.createElement('li', { 
            className: `todo-item${ todo.completed ? ' completed' : '' }`, 
            'data-id': todo.id 
        }, checkbox, label, editInput, editButton, deleteButton);

        return this.addEventListeners(item);
    }

    addEventListeners(item) {
        const checkbox      = listItem.querySelector('.checkbox');
        const editButton    = listItem.querySelector('.edit');
        const deleteButton  = listItem.querySelector('.delete');

        checkbox.addEventListener('change', this.handleToggle.bind(this));
        editButton.addEventListener('click', this.handleEdit.bind(this));
        deleteButton.addEventListener('click', this.handleDelete.bind(this));

        return item;
    }

    handleToggle({ target }) {
        const listItem      = target.parentNode;
        const id            = listItem.getAttribute('data-id');
        const completed     = target.completed;

        // update model
    }

    handleEdit({ target }) {
        const id            = listItem.getAttribute('data-id');
        const label         = listItem.querySelector('.title');
        const input         = listItem.querySelector('.text-field');
        const editButton    = listItem.querySelector('.edit');
        const title         = input.value;
        const isEditing     = listItem.classList.contains('editing');

        if (isEditing) {
            // update model
        } else {
            input.value = label.textContent;
            editButton.textContent = 'Save';
            listItem.classList.add('editing');
        }
    }

    handleDelete({ target }) {
        const listItem      = target.parentNode;
    }

    handleAdd(event) {
        event.preventDefault();

        if ( ! this.input.value) {
            return alert('Please, enter the task');
        }

        const value = this.input.value;

        // add item to model
    }
};

export default View;