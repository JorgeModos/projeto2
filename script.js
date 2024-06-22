document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const searchInput = document.getElementById('search');
    const clearFormBtn = document.getElementById('clear-form');
    const clearAllBtn = document.getElementById('clear-all');

    // Carregar usuários do Local Storage
    loadUsers();

    // Adicionar usuário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const date = new Date().toLocaleString();
        const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const user = { id, date, username, email };
        addUser(user);
        saveUser(user);
        form.reset();
    });

    // Limpar campos do formulário
    clearFormBtn.addEventListener('click', () => {
        form.reset();
    });

    // Excluir um item da lista
    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const li = e.target.parentElement;
            deleteUser(li);
        }
    });

    // Excluir todos os itens da lista
    clearAllBtn.addEventListener('click', () => {
        userList.innerHTML = '';
        localStorage.removeItem('users');
    });

    // Pesquisar na lista
    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        filterUsers(searchValue);
    });

    function addUser(user) {
        const li = document.createElement('li');
        li.textContent = `${user.date} - ${user.username} - ${user.email}`;
        li.dataset.id = user.id;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    }

    function saveUser(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUsers() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUser(user));
    }

    function deleteUser(li) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(user => user.id !== li.dataset.id);
        localStorage.setItem('users', JSON.stringify(users));
        li.remove();
    }

    function filterUsers(searchValue) {
        const items = userList.getElementsByTagName('li');
        Array.from(items).forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchValue)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
});
