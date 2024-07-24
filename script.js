document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('healthForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Samla in alla värden från formuläret
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Enkel logik för rekommendationer baserat på några nyckelfrågor
        let recommendation = '';

        if (data.feelHealthy === 'no' || data.recentIssues === 'yes') {
            recommendation = 'Baserat på dina svar rekommenderar vi att du bokar tid för en hälsoundersökning.';
        } else if (data.mrsaCarrier === 'yes' || data.mrsaOutsideNordics === 'yes') {
            recommendation = 'Vi rekommenderar att du genomgår en MRSA-screening.';
        } else if (data.tuberculosisTreatment === 'yes' || data.tuberculosisContact === 'yes') {
            recommendation = 'Vi rekommenderar att du genomgår en tuberkulosundersökning.';
        } else {
            recommendation = 'Baserat på dina svar verkar din hälsa vara god. Ingen ytterligare åtgärd krävs för tillfället.';
        }

        resultDiv.innerHTML = `<h3>Rekommendation för ${data.name}:</h3><p>${recommendation}</p>`;
    });
});