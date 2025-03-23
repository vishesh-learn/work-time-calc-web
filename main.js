let timer;

document.addEventListener("DOMContentLoaded", () => {
  loadStoredData();
  updateTime();

  const playButton = document.getElementById("play-timer");
  playButton.addEventListener("click", toggleTimer);

  document.body.addEventListener("input", ({ target }) => handleActivity(target));

  setInterval(updateTime, 1000);
});

function handleActivity(element) {
  validateNumberInput(element);

  if (element.classList.contains("user-data")) {
    localStorage.setItem(element.id, element.value);
  }

  updateTime();
}

function loadStoredData() {
  Object.keys(localStorage).forEach((key) => {
    const element = document.getElementById(key);
    if (element) element.value = localStorage.getItem(key);
  });
}

function updateTime() {
  const currentHours = getNumber("currentWorkedHour");
  const currentMinutes = getNumber("currentWorkedMinute");
  const totalHours = getNumber("totalWorkingHour");
  const totalMinutes = getNumber("totalWorkingMinute");

  const workedMinutes = currentHours * 60 + currentMinutes;
  const requiredMinutes = totalHours * 60 + totalMinutes;
  const remainingMinutes = Math.abs(requiredMinutes - workedMinutes);

  document.getElementById("timeRemaining").innerText = formatTime(remainingMinutes);
  document.getElementById("finishingTime").innerText = calculateFinishingTime(remainingMinutes);
}

function formatTime(totalMinutes) {
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
}

function calculateFinishingTime(remainingMinutes) {
  const now = new Date();
  const finishMinutes = now.getHours() * 60 + now.getMinutes() + remainingMinutes;
  
  const finishTime = new TimeObject(finishMinutes);
  const period = finishTime.hours >= 12 ? "pm" : "am";
  const displayHours = finishTime.hours % 12 || 12;

  return `${displayHours}:${String(finishTime.minutes).padStart(2, "0")} ${period}`;
}

class TimeObject {
  constructor(totalMinutes) {
    this.hours = Math.floor(totalMinutes / 60);
    this.minutes = totalMinutes % 60;
  }
}

function validateNumberInput(element) {
  element.value = Number(element.value) || 0;
}

function getNumber(id) {
  return Number(document.getElementById(id)?.value) || 0;
}

function toggleTimer() {
  const playButton = document.getElementById("play-timer");
  if (timer) {
    clearInterval(timer);
    timer = null;
    playButton.classList.remove("stop");
  } else {
    timer = setInterval(incrementTime, 60 * 1000);
    playButton.classList.add("stop");
  }
}

function incrementTime() {
  const minuteElement = document.getElementById("currentWorkedMinute");
  const hourElement = document.getElementById("currentWorkedHour");

  let minutes = getNumber("currentWorkedMinute");
  let hours = getNumber("currentWorkedHour");

  if (minutes < 59) {
    minuteElement.value = minutes + 1;
  } else {
    hourElement.value = hours + 1;
    minuteElement.value = 0;
  }

  handleActivity(minuteElement);
  handleActivity(hourElement);
}