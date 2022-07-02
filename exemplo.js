function openingQuizzPage(element){
    let selectedQuizzId = Number(element.getAttribute("id"))
    for (index = 0; index < quizzData.length; index++){
        if (selectedQuizzId === quizzData[index].id){
            hideHomePage()
            renderQuizzPageBanner()
            renderQuizzPageQuestions()
            levelCalculator ()
        }
    }
}

function renderQuizzPageBanner(){
    let quizzPage = document.querySelector(".quizz-page")
    console.log(quizzData[index],quizzData,index)
    quizzPage.innerHTML += `<div style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${quizzData[index].image}');"class="banner">
    <p>${quizzData[index].title}</p></div>`
}

function renderQuizzPageQuestions(){ 
    let questionsData = quizzData[index].questions
    console.log(questionsData)
    let quizzPage = document.querySelector(".quizz-page")
        questionsData.map((question)=>{
            quizzPage.innerHTML += `<div class="question-container">
        <p style ="background-color:${question.color} ; "class="question-title">${question.title}</p>
        <div class="question-template">
        <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[0].isCorrectAnswer}">
                        <img src ="${question.answers[0].image}">
                        <p class="answer-text">${question.answers[0].text}</p>
                    </div>
                    <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[1].isCorrectAnswer}">
                        <img src ="${question.answers[1].image}">
                        <p class="answer-text">${question.answers[1].text}</p>
                    </div>
                    <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[2].isCorrectAnswer}">
                        <img src ="${question.answers[2].image}">
                        <p class="answer-text ">${question.answers[2].text}</p>
                    </div>
                    <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[3].isCorrectAnswer}">
                        <img src ="${question.answers[3].image}">
                        <p class="answer-text">${question.answers[3].text}</p>
                    </div>` 
        })
    quizzPage.innerHTML += `<div class="level-container">
    <p class="level-title">Voceaaaa</p>
    <div class="level-template">
        <img src ="/assets/potterhead.png">
        <p>ajkdjaskdjaskdjakd</p>
    </div>
    </div>`
    
}

function changeAnswerTextColor(element){
    let elementClassList = element.classList.value
    let parentElement = element.parentElement;
    let wrongAnswers = parentElement.querySelectorAll(".options.false p")
    if (elementClassList === "options true"){
        element.querySelector("p").classList.add("green")
        wrongAnswers.forEach(falseOptions => {falseOptions.classList.add("red")
    });
    }
    else if (elementClassList === "options false"){
        parentElement.querySelector(".options.true p").classList.add("green")
        wrongAnswers.forEach(falseOptions => {falseOptions.classList.add("red")
    });
    }
    addOpacityOnNotSelected(element)
}
function addOpacityOnNotSelected (element){
    
    let opacityStatus = element.parentElement.querySelectorAll(".options img.opacity")
    if (opacityStatus.length === 0){
        let answersImgs = element.parentElement.querySelectorAll(".options img")
        answersImgs.forEach(img => {img.classList.add("opacity")})
        element.querySelector("img").classList.remove("opacity")
        setTimeout(function (){scrollQuestionIntoView(element)},2000);
        if(element.classList[1] === "true"){
            correctAnswer ++
        }
        else if(element.classList[1] === "false"){
            incorrectAnswer++
        }
       
    }
    accuracyRate = correctAnswer/(incorrectAnswer+correctAnswer)*100;
    console.log(accuracyRate)
    
}

function scrollQuestionIntoView(element){
    let questionContainer = element.parentElement.parentElement
    questionContainer.nextSibling.scrollIntoView()
}

function levelCalculator (){
    console.log(quizzData[index].levels)
    let porcentages = quizzData[index].levels.map(porcentages => porcentages.minValue)
    for (i = 0; i < porcentages.length; i++){
        if (porcentages[i] >= accuracyRate)
        console.log("aaaaaa")
    }
}