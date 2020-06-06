const tokenKey = "accessToken";

// отпавка запроса к контроллеру AccountController для получения токена
async function getTokenAsync() {

    // получаем данные формы и формируем объект для отправки
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password-input").value;
    const hashValue = window.sha256(password);
    const welcomeSubtitle = document.querySelector('.welcome-subtitle');
    const invalidTitles = document.querySelectorAll('.invalid-fields');

    welcomeSubtitle.style.display = 'block';
    for (let title of invalidTitles) {
        title.style.display = 'none';
    }

    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", hashValue);

    // отправляет запрос и получаем ответ
    const response = await fetch("https://offficemap.azurewebsites.net/api/account/get-token", {
        method: "POST",
        headers: {"Accept": "application/json"},
        body: formData
    });



    if (response.ok === true) {
        const data = await response.json();
        // сохраняем в хранилище sessionStorage токен доступа
        sessionStorage.setItem(tokenKey, data.access_token);

        window.location = 'map.html';
    } else {
        // если произошла ошибка, из errorText получаем текст ошибки
        console.log("Error: ", response.status);

        welcomeSubtitle.style.display = 'none';
        for (let title of invalidTitles) {
            title.style.display = 'block';
        }
    }
}

const submitButton = document.getElementById("submit-login");
submitButton.onclick = (e) => {
    e.preventDefault();
    getTokenAsync();
};