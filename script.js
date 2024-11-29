const menu = document.querySelector("#menu__btn");
const navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

  const tips = [
    "Stay hydrated! Drink at least 8 glasses of water daily.",
    "Eat a balanced diet with plenty of fruits and vegetables.",
    "Exercise for at least 30 minutes a day to stay active.",
    "Get 7-8 hours of quality sleep every night.",
    "Practice mindfulness or meditation to reduce stress.",
    "Limit your screen time and take regular breaks.",
    "Avoid processed foods and sugary drinks.",
    "Wash your hands regularly to maintain hygiene.",
  ];

  const exploreTipsBtn = document.getElementById('explore-tips-btn');
  const closeTipsBtn = document.getElementById('close-tips-btn');
  const tipsCard = document.getElementById('tips-card');
  const tipContent = document.getElementById('tip-content');

  exploreTipsBtn.addEventListener('click', () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipContent.textContent = randomTip;
    tipsCard.classList.remove('hidden');
  });

  closeTipsBtn.addEventListener('click', () => {
    tipsCard.classList.add('hidden');
  });


  const viewDashboardBtn = document.querySelector(".about__one button");
const sensorModal = document.getElementById("sensor-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

// Elements to update
const heartRateElement = document.getElementById("heart-rate");
const bloodPressureElement = document.getElementById("blood-pressure");
const temperatureElement = document.getElementById("temperature");

viewDashboardBtn.addEventListener("click", () => {
  // Static or random placeholder values
  heartRateElement.textContent = Math.floor(Math.random() * 40) + 60; // Random BPM
  bloodPressureElement.textContent = `${Math.floor(Math.random() * 20) + 100}/${
    Math.floor(Math.random() * 10) + 60
  }`; // Random BP
  temperatureElement.textContent = (36 + Math.random()).toFixed(1); // Random temp in °C

  // Show modal
  sensorModal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  // Hide modal
  sensorModal.classList.remove("show");
});
