let quizzDados;
let arrayQuestion = [];
let arrayAnswers = [];
let i; let j; let w;
let layout; 
const sc2_HTML = document.querySelector(".sc2_content");  
let quizzID = 9436;
// quizzID = 9436;

function buscarDados(){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzID}`);
    promise.then(buscarQuizz);
}

function buscarQuizz(response){
    // console.log(response);
    sc1_HTML.innerHTML = "";
    quizzDados = response.data;
    renderBanner();
    renderQuestions();
    // resultLevel();
}

function openSelectedQuizz(element){
    quizzID = element;
    buscarDados();
}

function renderBanner(){
    
    // sc2_HTML.innerHTML = "";

    layout = `
    <div class="sc2_banner" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${quizzDados.image}')">
    <h1>${quizzDados.title}</h1></div>`;
        
    sc2_HTML.innerHTML += layout;    
}

function renderQuestions(){
    arrayQuestion = quizzDados.questions;

    for(i=0; arrayQuestion.length > i; i++){
        
        layout = `
        <div class="sc2_question" style ="background-color:${arrayQuestion[i].color}">
        <h1>${arrayQuestion[i].title}</h1></div>`;               

        sc2_HTML.innerHTML += layout;

        renderAnswers();
    }
}

function renderAnswers(){
    arrayAnswers = arrayQuestion[i].answers;

    for(j=0; arrayAnswers.length/2 >=j; j+=2){   
             
        layout = `
        <div class="boxAnswers">
            <span onclick="responseBehavior(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
                <img src="${arrayAnswers[j].image}">
                <p>${arrayAnswers[j].text}</p>
            </span>
            <span onclick="responseBehavior(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
                <img src="${arrayAnswers[j+1].image}")>
                <p>${arrayAnswers[j+1].text}</p>
            </span>
        </div>`;

        sc2_HTML.innerHTML += layout;
    }

    if((arrayAnswers.length)%2 !== 0 && j>arrayAnswers.length/2){
        layout = `
        <div class="boxAnswers">
            <span onclick="responseBehavior(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
                <img src="${arrayAnswers[j].image}">
                <p>${arrayAnswers[j].text}</p>
            </span>
        </div>`;
        sc2_HTML.innerHTML += layout;
    }
}

function responseBehavior(selectedAnswer){
    arrayAnswers.forEach(txt_answer => {
        if (txt_answer.isCorrectAnswer == true)
        txt_answer.document.querySelector("p").style.color = "green";
        else if (txt_answer.isCorrectAnswer == "false")
        txt_answer.document.querySelector("p").style.color = "red"});

    let parentAnswer = selectedAnswer.parentElement;
    let all_answers = parentAnswer.querySelectorAll(".answer");
        all_answers.forEach(ans => {ans.classList.add("opacity")});

        selectedAnswer.classList.remove("opacity");

    // setTimeout(function (){scrollNextQuestion(parentAnswer)},2000);
    
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

function scrollNextQuestion(element){
    let questionContainer = element.parentElement;
    questionContainer.nextSibling.scrollIntoView();
}

/*
function resultLevel(){
    const level = quizz.Dados.levels;
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
*/

