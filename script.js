const questions = [
    {
        id: 'generalHealth',
        question: "Allmänt hälsotillstånd?",
        answers: ["NEJ på fråga 1-3", "JA på fråga 2, NEJ på fråga 3"],
        next: ["contactHealthCare", "bookAppointment"]
    },
    {
        id: 'measles',
        question: "Haft mässling/röda hund eller vacc. med två doser?",
        answers: ["JA", "NEJ/Vet ej"],
        next: ["noFurtherAction", "bookTeleconsult"]
    },
    {
        id: 'chickenPox',
        question: "Haft vattkoppor eller vacc. med två doser?",
        answers: ["JA", "NEJ/Vet ej"],
        next: ["noFurtherAction", "bookTeleconsult"]
    },
    {
        id: 'skinMRSA',
        question: "Hud och MRSA?",
        answers: ["JA på fråga 1-2", "JA på fråga 3"],
        next: ["testMRSA", "notEmployable"]
    },
    {
        id: 'hepatitis',
        question: "Hepatit?",
        answers: ["JA på fråga 1", "JA på fråga 2 & 3 samt tre eller fler doser", "NEJ, Vet ej doser"],
        next: ["infoAboutInfection", "noFurtherAction", "bookVaccination"]
    },
    {
        id: 'diphtheria',
        question: "Difteria?",
        answers: ["JA på 'haft difteri' eller vaccinerad <20 år sedan", "NEJ, Vet ej, >20 år sedan påfyllnadsdos"],
        next: ["noFurtherAction", "teleconsult", "bookVaccination"]
    },
    {
        id: 'tuberculosis',
        question: "Tuberkulos?",
        answers: ["JA på fråga 1 eller 3, specifika omständigheter"],
        next: ["bookTeleconsultICRA"]
    }
];

const responses = {
    contactHealthCare: "Uppmana till kontakt på vårdcentral",
    bookAppointment: "Boka 30 min på FLÄK för bedömning av åtgärd",
    noFurtherAction: "Ingen ytterligare åtgärd",
    bookTeleconsult: "Boka telefontid",
    testMRSA: "Provsökning MRSA",
    notEmployable: "Ej anställningsbar",
    infoAboutInfection: "Sedvanlig info om smittspridning",
    bookVaccination: "Boka vaccination",
    teleconsult: "Telefond",
    bookTeleconsultICRA: "Telefonråd, boka 30 min ordination FLÄK, boka IGRA-test"
};

let currentQuestionIndex = 0;
let answers = [];

function loadQuestion(questionIndex) {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    if (questionIndex < questions.length) {
        const questionObj = questions[questionIndex];
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<p>${questionObj.question}</p>`;

        questionObj.answers.forEach((answer, index) => {
            const answerElement = document.createElement('button');
            answerElement.textContent = answer;
            answerElement.addEventListener('click', () => handleAnswer(questionIndex, index));
            questionElement.appendChild(answerElement);
        });

        questionContainer.appendChild(questionElement);
    } else {
        showResponse();
    }
}

function handleAnswer(questionIndex, answerIndex) {
    answers.push(answerIndex);
    const nextStep = questions[questionIndex].next[answerIndex];
    if (responses[nextStep]) {
        showResponse(nextStep);
    } else {
        currentQuestionIndex = questions.findIndex(q => q.id === nextStep);
        loadQuestion(currentQuestionIndex);
    }
}

function showResponse(responseKey) {
    const responseDiv = document.getElementById('response');
    responseDiv.textContent = responses[responseKey];
    document.getElementById('submitButton').style.display = 'none';
}

document.getElementById('healthForm').addEventListener('submit', function(event) {
    event.preventDefault();
    showResponse();
});

loadQuestion(currentQuestionIndex);
