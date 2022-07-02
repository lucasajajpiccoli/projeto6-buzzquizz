let otherQuizzesElement = document.querySelector(".sc1_otherQuizzes_content")

let quizzesPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

quizzesPromise.then(quizzesRender);

function quizzesRender (response) {
    for(let i = 0; i < response.data.length; i++) {
        otherQuizzesElement.innerHTML += 
        `
        <div class="sc1_thumbnail" style="background-image: linear-gradient(transparent 25%, black), url('${response.data[i].image}')">
            <div>${response.data[i].title}</div>
        </div>
        `
    }
}