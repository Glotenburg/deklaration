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

const questionDescriptions = {
    generalHealth: "Allmänt hälsotillstånd?",
    measles: "Haft mässling/röda hund eller vacc. med två doser?",
    chickenPox: "Haft vattkoppor eller vacc. med två doser?",
    skinMRSA: "Hud och MRSA?",
    hepatitis: "Hepatit?",
    diphtheria: "Difteria?",
    tuberculosis: "Tuberkulos?"
};

document.getElementById('healthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const generalHealth = document.getElementById('generalHealth').value;
    const measles = document.getElementById('measles').value;
    const chickenPox = document.getElementById('chickenPox').value;
    const skinMRSA = document.getElementById('skinMRSA').value;
    const hepatitis = document.getElementById('hepatitis').value;
    const diphtheria = document.getElementById('diphtheria').value;
    const tuberculosis = document.getElementById('tuberculosis').value;

    let responseKey = '';
    let reasons = [];

    if (generalHealth === 'contactHealthCare') {
        responseKey = 'contactHealthCare';
        reasons.push(questionDescriptions.generalHealth + " NEJ på fråga 1-3");
    } else if (generalHealth === 'bookAppointment') {
        responseKey = 'bookAppointment';
        reasons.push(questionDescriptions.generalHealth + " JA på fråga 2, NEJ på fråga 3");
    } else if (measles === 'bookTeleconsult' || chickenPox === 'bookTeleconsult') {
        responseKey = 'bookTeleconsult';
        if (measles === 'bookTeleconsult') reasons.push(questionDescriptions.measles + " NEJ/Vet ej");
        if (chickenPox === 'bookTeleconsult') reasons.push(questionDescriptions.chickenPox + " NEJ/Vet ej");
    } else if (skinMRSA === 'testMRSA') {
        responseKey = 'testMRSA';
        reasons.push(questionDescriptions.skinMRSA + " JA på fråga 1-2");
    } else if (skinMRSA === 'notEmployable') {
        responseKey = 'notEmployable';
        reasons.push(questionDescriptions.skinMRSA + " JA på fråga 3");
    } else if (hepatitis === 'infoAboutInfection') {
        responseKey = 'infoAboutInfection';
        reasons.push(questionDescriptions.hepatitis + " JA på fråga 1");
    } else if (hepatitis === 'bookVaccination') {
        responseKey = 'bookVaccination';
        reasons.push(questionDescriptions.hepatitis + " NEJ, Vet ej doser");
    } else if (diphtheria === 'teleconsult') {
        responseKey = 'teleconsult';
        reasons.push(questionDescriptions.diphtheria + " NEJ, Vet ej, >20 år sedan påfyllnadsdos");
    } else if (tuberculosis === 'bookTeleconsultICRA') {
        responseKey = 'bookTeleconsultICRA';
        reasons.push(questionDescriptions.tuberculosis + " JA på fråga 1 eller 3, specifika omständigheter");
    } else {
        responseKey = 'noFurtherAction';
        reasons.push("Ingen ytterligare åtgärd behövs baserat på dina svar.");
    }

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `<p>${responses[responseKey]}</p><p><strong>Baseras på dina svar:</strong><br>${reasons.join('<br>')}</p>`;
});
