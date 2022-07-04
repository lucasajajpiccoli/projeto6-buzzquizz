let quizzDados;
let arrayQuestion = [];
let arrayAnswers = [];
let i; let j; let w;
let layout; 
let sc2_HTML;
let quizzID;
let count = 0; let qtdclicks = 0;
// quizzID = 9923;

function openSelectedQuizz(element){
    document.querySelector(".screen_up").classList.remove("screen1");
    document.querySelector(".screen_up").classList.add("screen2");
    sc2_HTML = document.querySelector(".screen2"); 
    quizzID = 9923;
    buscarDados();
}

function buscarDados(){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzID}`);
    promise.then(buscarQuizz);
}

function buscarQuizz(response){
    sc1_HTML.innerHTML = "";
    quizzDados = response.data;
    renderBanner();
    renderQuestions();
}

function renderBanner(){
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

    document.querySelector("body").scrollIntoView(true);
}

function embaralhar() {
	return Math.random() - 0.5;
}

function renderAnswers(){

    arrayAnswers = arrayQuestion[i].answers;
    arrayAnswers.sort(embaralhar);

    for(j=0; arrayAnswers.length/2 >=j; j+=2){     

        layout = `
        <div class="boxAnswers">
            <span onclick="responseBehavior(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
                <img src="${arrayAnswers[j].image}">
                <p>${arrayAnswers[j].text}</p>
            </span>
            <span onclick="responseBehavior(this)" class="answer ${arrayAnswers[j].isCorrectAnswer}">
                <img src="${arrayAnswers[j+1].image}">
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

let parentAnswer;
let box_answers;
let neighborSibling;

function responseBehavior(selectedAnswer){
    parentAnswer = selectedAnswer.parentElement;
    box_answers = parentAnswer.querySelectorAll(".answer");

    if (selectedAnswer.classList.contains("true")){ 
        selectedAnswer.querySelector("p").style.color = "green";
        count++;
    }else if (selectedAnswer.classList.contains("false")) 
        selectedAnswer.querySelector("p").style.color = "red";

    opacityReaction(selectedAnswer);

    qtdclicks++;
    runLevels();
}

function scrollNextStep(element){
    setTimeout(function (){element.scrollIntoView()},2000);
}

function opacityReaction(selectedAnswer){

    box_answers.forEach(ans => {ans.classList.add("opacity")});
    selectedAnswer.classList.remove("opacity");
    box_answers.forEach(ans => {ans.setAttribute("onClick", "")});

    neighborSibling = parentAnswer.previousElementSibling;

    while (neighborSibling.classList.contains("boxAnswers")) {
        neighborSibling.classList.add("opacity");
        neighborSibling.querySelectorAll(".answer").forEach(ans => {ans.setAttribute("onClick", "")});
        neighborSibling = neighborSibling.previousElementSibling;
    }

    neighborSibling = parentAnswer.nextElementSibling;

    while (neighborSibling !== null && neighborSibling.classList.contains("boxAnswers")) {
        neighborSibling.classList.add("opacity");
        neighborSibling.querySelectorAll(".answer").forEach(ans => {ans.setAttribute("onClick", "")});
        neighborSibling = neighborSibling.nextElementSibling;
    }
    
    scrollNextStep(neighborSibling);
}

function runLevels(){
    if (qtdclicks === arrayQuestion.length)
    resultLevel();
    let scrollToLevel = document.querySelector(".sc2_leveltopo");
    scrollNextStep(scrollToLevel);
}

function resultLevel(){
    const arrayLevels = quizzDados.levels;
    const result = Math.round(count/qtdclicks *100);

    for(w=0; arrayLevels.length > w; w++){

        if (result >= arrayLevels[w].minValue && w === arrayLevels.length-1){
            layout = `
            <div class="sc2_level">
                <div class="sc2_leveltopo">
                    <h1>${level[w].title}</h1>
                </div>
                <div>
                    <img src="${arrayLevels[w].image}">
                    <span>${arrayLevels[w].text}</span>
                </div>            
            </div>`;        
        }
        else if (result >= arrayLevels[w].minValue && result < arrayLevels[w+1].minValue){
            layout = `
            <div class="sc2_level">
                <div class="sc2_leveltopo">
                    <h1>${result}% de acerto: ${arrayLevels[w].title}</h1>
                </div>
                <div>
                    <img src="${arrayLevels[w].image}">
                    <span>${arrayLevels[w].text}</span>
                </div>            
            </div>`;                           
        }

    }

    layout += `
    <div class="sc2_restart" onclick="runRestart(this)">
        <h1>Reiniciar Quizz</h1>
    </div>
    <div class="sc2_buttonHome" onclick="backToHomePg(this)">Voltar para home</div>`;

    sc2_HTML.innerHTML += layout;
}

function runRestart(){
    document.querySelector("body").scrollIntoView(true);
    count=0; qtdclicks=0;
    buscarDados();
}

function backToHomePg(){
    document.querySelector(".screen_up").classList.remove("screen2");
    document.querySelector(".screen_up").classList.add("screen1");
    sc1Render();
    buscarAllQuizzes();
}