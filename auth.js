let currentUser = "";
const toolsContainer = document.getElementById('tools-container');

// Сохраним изначальный порядок карточек, чтобы возвращать их на место
const originalOrder = Array.from(document.querySelectorAll('.card'));

async function register() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: user, password: pass})
    });
    const result = await response.json();
    document.getElementById('auth-status').innerText = result.message;
}

async function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: user, password: pass})
    });
    const result = await response.json();
    if (result.status === 'success') {
        currentUser = user;
        document.getElementById('auth-status').innerText = "Привет, " + user + "!";
        syncFavorites(); // Теперь мы не просто грузим текст, а синхронизируем карточки
    } else {
        document.getElementById('auth-status').innerText = "Ошибка: " + result.message;
    }
}

// ГЛАВНАЯ ФУНКЦИЯ: Синхронизация карточек с БД
async function syncFavorites() {
    if (!currentUser) return;

    const response = await fetch(`/api/profile/favorites/${currentUser}`);
    const data = await response.json();
    const favIds = data.favorites; // Список ID избранных инструментов (например, ["tool-pass"])

    // Сначала сбросим все звезды и вернем всё в исходный порядок
    originalOrder.forEach(card => {
        const star = card.querySelector('.star');
        star.style.fill = "none";
        star.classList.remove('is-active');
        toolsContainer.appendChild(card);
    });

    // Теперь пройдемся по избранным и поднимем их вверх
    favIds.forEach(id => {
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (card) {
            const star = card.querySelector('.star');
            star.style.fill = "gold";
            star.classList.add('is-active');
            toolsContainer.prepend(card); // Перемещаем в начало контейнера
        }
    });
}

// Обработка клика по звезде (Добавление/Удаление)
document.addEventListener('click', async (e) => {
    const star = e.target.closest('.star');
    if (!star) return;

    if (!currentUser) {
        alert("Войдите в аккаунт!");
        return;
    }

    const card = star.closest('.card');
    const toolId = card.getAttribute('data-id');
    const isActive = star.classList.contains('is-active');

    if (isActive) {
        // УДАЛЯЕМ
        await fetch(`/api/profile/favorites/${currentUser}/remove?tool_id=${toolId}`, {
            method: 'DELETE'
        });
    } else {
        // ДОБАВЛЯЕМ (используем tool_id вместо названия для точности)
        await fetch(`/api/profile/favorites/${currentUser}/add?tool=${toolId}`, {
            method: 'POST'
        });
    }

    // После каждого действия перерисовываем состояние
    syncFavorites();
});
