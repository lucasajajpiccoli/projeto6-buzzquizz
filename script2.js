let Dados;
let i; let k; let j; let w; 
const sc2_HTML = document.querySelector(".sc2_content");  

function buscarDados(){
    const promise = axios.get(https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes);
    promise.then(recebeDados);
}

function recebeDados(quizzes){
    // console.log("Os dados chegaram!");
    // console.log(quizzes);
    Dados = quizzes.data;

renderQuizzes(quizzes);
}

function renderQuizzes(quizzes){
    
    sc2_HTML.innerHTML = "";
    // console.log(quizzes);

    let qtd_quizzes = quizzes.data.length;
    for(i=0; i < qtd_quizzes; i++){

        const id = (quizzes.data[i].id);
        const title = (quizzes.data[i].title);
        const image = (quizzes.data[i].image);

        let layout = `
            <div class="sc2_banner">${title}</div>
            <img url="${image}"/>`;
         
        sc2_HTML.innerHTML += layout;

        renderQuestions();
        resultLevels();
    }
}

function renderQuestions(){
    let arrayQuestion = [];
    arrayQuestion = quizzes.data[i].questions;

    for(j=0; arrayQuestion.length > j; j++){
        
        layout = `<div class="sc2_question">${arrayQuestion[j].title}</div>`;

        let backgrnd = layout.querySelector(".sc2_question"); //acho que não, mas enfim...
        backgrnd.classList.add(`${arrayQuestion[j].color}`); //faz sentido isso?               

        sc2_HTML.innerHTML += layout;

        renderAnswers();
    }
}

function renderAnswers(){
    let arrayAnswers= [];
    arrayAnswers = arrayQuestion[j].answers;

    for(k=0; arrayAnswers.length>k/2; k++){
        
        if((arrayAnswers.length)%2 !== 0 && k==k/2){
            layout = `
            <div class="imgAnswer">${arrayAnswers[k].image}</div>;
            <div class="sc2_answers">${arrayAnswers[k].text}</div>`;
            sc2_HTML.innerHTML += layout;
        }else{
            layout = `
            <div class="imgAnswer">${arrayAnswers[k].image}</div>;
            <div class="sc2_answers">${arrayAnswers[k].text}</div>
            <div class="imgAnswer">${arrayAnswers[k+1].image}</div>;
            <div class="sc2_answers">${arrayAnswers[k+1].text}</div>`;

            sc2_HTML.innerHTML += layout;
        }

        behaviorAnswers();
    }
}

// function behaviorAnswers(){
//     if (arrayAnswers[k].isCorrectAnswer == true){
//     }else{
//     }
// }

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