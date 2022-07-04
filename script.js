document.querySelector(".screen_up").classList.add("screen1");

let sc1_HTML = document.querySelector(".screen1");

sc1Render();
buscarAllQuizzes();
//let sc3_HTML = document.querySelector(".screen3");

let otherQuizzesElement = document.querySelector(".sc1_otherQuizzes_content")

function buscarAllQuizzes(){
    let quizzesPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    quizzesPromise.then(quizzesRender);
}

function sc1Render() {
    // document.querySelector("body").classList.remove("screen2");
    sc1_HTML.innerHTML = 
    `
    <div class="sc1_firstQuizz">
        <div>Você não criou nenhum quizz ainda :(</div>
        <div>Criar Quizz</div>
    </div>

    <div class="sc1_userQuizzes">
        <div class="sc1_userQuizzes_title">
            <span>Seus Quizzes</span>
            <ion-icon name="add-circle"></ion-icon>
        </div>
        <div class="sc1_userQuizzes_content"></div>
    </div>

    <div class="sc1_otherQuizzes">
        <div class="sc1_otherQuizzes_title">Todos os Quizzes</div>
        <div class="sc1_otherQuizzes_content"></div>
    </div>
    `;
}

function quizzesRender(response) {
    for (let i = 0; i < response.data.length; i++) {
        otherQuizzesElement.innerHTML +=
            `
        <div class="sc1_thumbnail" style="background-image: linear-gradient(transparent 25%, black), url('${response.data[i].image}')" onClick="openSelectedQuizz(${response.data[i].id})">
            <div>${response.data[i].title}</div>
        </div>
        `;
        if (i % 3 !== 2) {
            otherQuizzesElement.querySelector(`div:nth-child(${i + 1})`).classList.add("sc1_thumbnail_margin_right");
        }
    }
}