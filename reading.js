// script.js

// Flask server API URL for sensor data
const apiUrl = 'http://192.168.14.32:5000/sensor-data';

// AI Recommendation API URL
const aiRecommendationUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC6bbGfls9vbXkucKa8RV97ddIb-fcDj0o';

// Fetch sensor data from Flask server
const fetchSensorData = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById('heart-rate').textContent = data.heart_rate ? `${data.heart_rate} BPM` : '--';
        document.getElementById('blood-pressure').textContent = data.blood_pressure || '--';
        document.getElementById('oxygen-saturation').textContent = data.oxygen_saturation ? `${data.oxygen_saturation} %` : '--';
        document.getElementById('temperature').textContent = data.temperature ? `${data.temperature} °F` : '--';
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
};

// Fetch AI recommendations based on sensor data
const getHealthRecommendation = async () => {
    try {
        const heartRate = document.getElementById('heart-rate').textContent;
        const bloodPressure = document.getElementById('blood-pressure').textContent;
        const oxygenSaturation = document.getElementById('oxygen-saturation').textContent;
        const temperature = document.getElementById('temperature').textContent;

        const sensorReadings = `
            Heart Rate: ${heartRate}, 
            Blood Pressure: ${bloodPressure}, 
            Oxygen Saturation: ${oxygenSaturation}, 
            Temperature: ${temperature}`;

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `Based on the following health sensor readings, provide recommendations, advice, and potential remedies or medicines for abnormal values. If all values are normal, say that the readings are within normal ranges and also give recommendation line by line for every reading correctly not in paragraph.'
                            .\n\n${sensorReadings}`,
                        },
                    ],
                },
            ],
        };

        const response = await fetch(aiRecommendationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        const recommendation = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No recommendation available.';

        const recommendationList = document.getElementById('recommendations-list');
        recommendationList.innerHTML = `<li>AI Recommendation: ${recommendation}</li>`;
    } catch (error) {
        console.error('Error fetching AI recommendation:', error);
        const recommendationList = document.getElementById('recommendations-list');
        recommendationList.innerHTML = `<li>Error occurred while fetching recommendation: ${error.message}</li>`;
    }
};



// Set up event listeners
document.getElementById('get-recommendation-btn').addEventListener('click', getHealthRecommendation);


// Fetch sensor data when the page loads
fetchSensorData();

// Refresh sensor data every 5 seconds
setInterval(fetchSensorData, 5000);
