let sc3_quizzTitle;
let sc3_quizzImgURL;
let sc3_quizzNumberOfQuestions;
let sc3_quizzNumberOfLevels;

document.querySelector(".screen_up").classList.add("screen1");

let sc1_HTML = document.querySelector(".screen1");

sc1Render();

//let sc3_HTML = document.querySelector(".screen3");

let otherQuizzesElement = document.querySelector(".sc1_otherQuizzes_content");

let quizzesPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
quizzesPromise.then(quizzesRender);

function sc1Render() {
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

function sc3_1_Render() {
    scHTML.innerHTML = "";
    if(scHTML.classList.contains("screen1")) {
        scHTML.classList.remove("screen1");
    }
    if(scHTML.classList.contains("screen2")) {
        scHTML.classList.remove("screen2");
    }
    scHTML.classList.add("screen3");
    
    scHTML.innerHTML = `
        <div class="sc3_content_1">
            <div class="sc3_title">Comece pelo começo</div>
            <div class="sc3_basicInfoBox">
                <input type="text" placeholder="Título do seu quizz">
                <input type="text" placeholder="URL da imagem do seu quizz">
                <input type="text" placeholder="Quantidade de perguntas do quizz">
                <input type="text" placeholder="Quantidade de níveis do quizz">
            </div>
            <div onClick='sc3_1_Validate();'>Prosseguir pra criar perguntas</div>
        </div>`
    }

    function sc3_1_Validate () {
        sc3_quizzTitle = document.querySelector(".sc3_basicInfoBox input:first-child").value;
        sc3_quizzImgURL = document.querySelector(".sc3_basicInfoBox input:nth-child(2)").value;
        sc3_quizzNumberOfQuestions = document.querySelector(".sc3_basicInfoBox input:nth-child(3)").value;
        sc3_quizzNumberOfLevels = document.querySelector(".sc3_basicInfoBox input:last-child").value;

    }