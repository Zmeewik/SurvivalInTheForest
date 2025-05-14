document.getElementById("suggestionForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Отклонение стандатного отправления пустых значений
    document.getElementById("message").textContent = "Submitting..";
    document.getElementById("message").style.display = "block";
    document.getElementById("submit-button").disabled = true;

    // Получаем информацию с формы
    var formData = new FormData(this);
    var keyValuePairs = [];

    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&");

    // Отправляем Post запрос в Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbz7fMbOzW-C1HnfM80irKqmSp-UQfghT0a0vWYZ_23wUiutPT5tEreCaPWoLoQYWMY/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        mode: "no-cors"  // Режим дебага
      }
    )
      .then(function (response) {
        if (response) {
          return response;
        } else {
          alert("Предложение не отправлено :(");
          throw new Error("Failed to submit the form.");
        }
      })
      .then(function (data) {
        // Успешная отправка
        alert("Предложение успешно отправлено :)");
        document.getElementById("suggestionForm").reset();

        setTimeout(function () {
          document.getElementById("message").textContent = "";
        }, 2600);
      })
      .catch(function (error) {
        //Обработка ошибок
        console.error(error);
      });
  });