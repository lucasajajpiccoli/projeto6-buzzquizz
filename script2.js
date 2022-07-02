let Dados;
let i; let j; let w;
let layout; 
const sc2_HTML = document.querySelector(".sc2_content");  

function buscarDados(){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzID}`);
    promise.then(recebeDados);
}

function buscarQuizz(response){
    // console.log("Os dados chegaram!");
    // console.log(response);
    sc1_HTML = "";
    Dados = response.data;

renderBanner(response);
}

function renderBanner(response){
    
    // sc2_HTML.innerHTML = "";

    layout = `
    <div class="sc2_banner" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${response.image}')>
    <h1>${response.title}</h1></div>`;
        
    sc2_HTML.innerHTML += layout;

    renderQuestions();
    resultLevels();
    }
}

function renderQuestions(){
    let arrayQuestion = [];
    arrayQuestion = response.questions;

    // const boxquestion = document.querySelector(".sc2_content.sc2_boxquestion");

    for(i=0; arrayQuestion.length > i; i++){
        
        layout = `
        <div class="sc2_question" style ="background-color:${arrayQuestion[i].color}">
        <h1>${arrayQuestion[i].title}</h1></div>`;               

        sc2_HTML.innerHTML += layout;

        renderAnswers();
    }
}

function renderAnswers(){
    let arrayAnswers = [];
    arrayAnswers = arrayQuestion[i].answers;

    for(j=0; arrayAnswers.length/2 >=j; j++){   
             
        layout = `
        <div class="boxAnswers">
            <span onclick="behav_answer(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
                <img scr="${arrayAnswers[j].image}">;
                <p>${arrayAnswers[j].text}</p>
            </span>
            <span onclick="behav_answer(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
                <img scr="${arrayAnswers[j+1].image}">;
                <p>${arrayAnswers[j+1].text}</p>
            </span>
        </div>`;

        sc2_HTML.innerHTML += layout;
        j+=1;
    }

    if((arrayAnswers.length)%2 !== 0 && j>arrayAnswers.length){
        layout = `
        <div class="boxAnswers">
        <span onclick="behav_answer(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
            <img scr="${arrayAnswers[j].image}">;
            <p>${arrayAnswers[j].text}</p>
        </span>
        </div>`;
        sc2_HTML.innerHTML += layout;
    }
}

function behav_answer(selectedAnswer){
    arrayAnswers.forEach(txt_answer => {
        if (txt_answer.isCorrectAnswer == "true")
        txt_answer.document.querySelector("p").style.color = "green";
        else if (txt_answer.isCorrectAnswer == "false")
        txt_answer.document.querySelector("p").style.color = "red"});

        // txt_answer.document.querySelector.setAttribute("class", "p"))
        // txt_answer.document.querySelector(".answer.true p").style.color = "green";

    // if (selectedAnswer.classList.contains("true"))
    //     selectedAnswer.querySelector("p").style.color = "green";
    // else if (selectedAnswer.classList.contains("false"))
    // selectedAnswer.querySelector("p").style.color = "red";

    // let txt_answer = selectedAnswer.parentElement.querySelectorAll(".answer.false p");
    // let redAnswers = txt_answer.map( textRed => {textRed.style.color = "red"});

    // selectedAnswer.parentElement.style.opacity = "50%";
    // selectedAnswer.classList.remove(".opacity");    
   
}

function resultLevels(){
    const level = quizzes.data[i].levels;
    for(w=0; level.length > w; w++){
        if (result > minValue){
            layout = `
            <div class="sc2_level">${level[w].title}</div>;
            <div class="sc2_answers">${level[w].image}</div>
            <div class="sc2_answers">${level[w].text}</div>`;

            sc2_HTML.innerHTML += layout;
        }
    }
}