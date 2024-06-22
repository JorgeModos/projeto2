document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const searchInput = document.getElementById('search');
    const clearFormBtn = document.getElementById('clear-form');
    const clearAllBtn = document.getElementById('clear-all');

    loadUsers();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const date = new Date().toLocaleString();
        
        const user = { username, email, date };
        addUser(user);
        saveUser(user);
        form.reset();
    });

    clearFormBtn.addEventListener('click', () => {
        form.reset();
    });

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const li = e.target.parentElement;
            deleteUser(li);
        }
    });

    clearAllBtn.addEventListener('click', () => {
        userList.innerHTML = '';
        localStorage.removeItem('users');
    });

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        filterUsers(searchValue);
    });

    function addUser(user) {
        const li = document.createElement('li');
        li.textContent = `${user.date} - ${user.username} - ${user.email}`;
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
        users = users.filter(user => `${user.date} - ${user.username} - ${user.email}` !== li.textContent.replace('Excluir', '').trim());
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
