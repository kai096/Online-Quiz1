let quiz = [
    {
        question: "What is the setting for 'Assassin's Creed: Odyssey'?",
        choice1: " Ancient Egypt",
        choice2: " Renaissance Italy",
        choice3: "Anglo Saxon England",
        choice4: "Ancient Greece",
        answer:"4"
    },
    {
        question: "Players of 'Assassin's Creed: Odyssey' may choose to be either the male or female protagonist. What are their names?",
        choice1: "Paris and Helen",
        choice2: "Adrian and Alexis",
        choice3: "Alexios and Kassandra",
        choice4: "Galen and Niki",
        answer:"3"
    },
    {
        question: "The protagonists of 'Assassin's Creed: Odyssey' are descendants of a Greek hero who is still studied and respected today. Who is their grandfather?",
        choice1: "Pericles",
        choice2: "Lycurgus",
        choice3: "Leonidas",
        choice4: "Socrates",
        answer:"3"
    },
    {
        question: "Throughout 'Assassin's Creed: Odyssey' both of the protagonists are typically called 'Misthios'. What does this name mean in the game?",
        choice1: "Chosen",
        choice2: "Mercenary",
        choice3: "Hero",
        choice4: "Abandoned",
        answer:"2"
    },
    {
        question: "Misthios is a products of a difficult past. What exactly happened to them when they were children?",
        choice1: "They were forced to become soldiers for Sparta.",
        choice2: "Their mother died.",
        choice3: "They were thrown off a cliff.",
        choice4: "They were abandoned by the elders.",
        answer:"3"
    },
    {
        question: "What weapon, used by the Misthios in 'Assassin's Creed: Odyssey', gives them their power?",
        choice1: "Spear",
        choice2: "Shield",
        choice3: "Sword",
        choice4: "Bow",
        answer:"1"
    },
];
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounterText'); 
const scoreText = document.getElementById('scoreText');

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuiz = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

function startQuiz(){
    availableQuiz = [...quiz]
    //console.log(availableQuiz);
    getQuestion()
}
function getQuestion(){

    if(availableQuiz == 0){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("./quiz-end.html")
    }

    questionCounter++
    questionCounterText.innerText = questionCounter + "/"+ MAX_QUESTIONS
    //console.log(Math.floor(Math.random()*6))
    const questionNumber = Math.floor(Math.random()*availableQuiz.length);
    currentQuestion = availableQuiz[questionNumber]
    question.innerText = currentQuestion.question

    // to display choices (use an array func (forEach()) to display each choice in the choice text)
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        //console.log()
        choice.innerText = currentQuestion['choice' + number]

       
    });
 //use splice method to not include the current question to the next questions
        availableQuiz.splice(questionNumber, 1)
}

    //add classes to the choice selected when clicked, use the same array function (.forEach) to target each of the choice 
    choices.forEach(choice => {
        choice.addEventListener('click', (e) => {
            //console.log('choice has been clicked')
            const selectedChoice = e.target
            //console.log(selectedChoice)
            const selectedAnswer = selectedChoice.dataset['number']
            //console.log(selectedAnswer, currentQuestion.answer)

            // const classApply = 'correct'
            // if (selectedAnswer !== currentQuestion.answer) {
            //     classApply = 'incorrect'
            //     }
            //     selectedChoice.parentElement.classList.add(classApply)

            const classApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

            selectedChoice.parentElement.classList.add(classApply)


        if (classApply == 'correct') {
            incrmentScore(CORRECT_BONUS)
        }
            

           setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classApply)
            getQuestion()
           }, 1000);
           //console.log(classApply)
        })
    });


    function incrmentScore(num) {
        score += num
        scoreText.innerText = score
        console.log(score)
    }

startQuiz()