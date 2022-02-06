window.onload = () => {
  calculateTime();

  const Element_currentWorkedHour = document.getElementById('currentWorkedHour');
  const Element_currentWorkedMinute = document.getElementById('currentWorkedMinute');

  const Element_totalWorkingHour = document.getElementById('totalWorkingHour');
  const Element_totalWorkingMinute = document.getElementById('totalWorkingMinute');

  const Element_calculateButton = document.getElementById('calculateButton');

  Element_currentWorkedHour.addEventListener("change", calculateTime);
  Element_currentWorkedMinute.addEventListener("input", calculateTime);

  Element_totalWorkingHour.addEventListener("change", calculateTime);
  Element_totalWorkingMinute.addEventListener("input", calculateTime);

  Element_calculateButton.addEventListener("click", calculateTime);
};

function calculateTime(){
  const Element_currentWorkedHour = document.getElementById('currentWorkedHour');
  const Element_currentWorkedMinute = document.getElementById('currentWorkedMinute');

  const Element_totalWorkingHour = document.getElementById('totalWorkingHour');
  const Element_totalWorkingMinute = document.getElementById('totalWorkingMinute');

  const Element_timeRemaining = document.getElementById('timeRemaining');
  const Element_finishingTime = document.getElementById('finishingTime');

  var Object_totalTimeDiff = {"h": 0, "m": 0};

  validateHours(Element_currentWorkedHour);
  validateHours(Element_totalWorkingHour);

  validateDecimal(Element_currentWorkedMinute);
  validateDecimal(Element_totalWorkingMinute);

  var currentWorkedHour = Number(Element_currentWorkedHour.value);
  var currentWorkedMinute = Number(Element_currentWorkedMinute.value);

  var totalWorkingHour = Number(Element_totalWorkingHour.value);
  var totalWorkingMinute = Number(Element_totalWorkingMinute.value);

  var totalWorkedMinutes = (currentWorkedHour * 60) + currentWorkedMinute;
  var totalWorkingMinutes = (totalWorkingHour * 60) + totalWorkingMinute;

  var totalMinutesDiff = Math.abs(totalWorkedMinutes - totalWorkingMinutes);

  Object_totalTimeDiff.h = Math.floor(totalMinutesDiff / 60);
  Object_totalTimeDiff.m = totalMinutesDiff % 60;

  Element_timeRemaining.innerText = Object_totalTimeDiff.h + "h " + Object_totalTimeDiff.m + "m";

  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();

  var currentTotalMinutes = (h * 60) + m;

  var totalFinishingMinutes = totalWorkingMinutes - totalWorkedMinutes + currentTotalMinutes;

  const Object_finishingTime = new simpleTime(totalFinishingMinutes);

  var finishingHours = Object_finishingTime.h, apm = "am";

  console.log(totalFinishingMinutes);
  console.log(Object_finishingTime);

  var a = Math.ceil(Object_finishingTime.h / 12);
  console.log(a);

  if(Object_finishingTime.h >= 12){
    finishingHours -= (a-1)*12;

    if(a % 2 == 0) apm = "pm";
  }

  Element_finishingTime.innerText = finishingHours + ":" + Object_finishingTime.m + " " + apm;
}

class simpleTime {
  constructor(totalMinutes) {
    this.h = Math.floor(totalMinutes / 60);
    this.m = totalMinutes % 60;
  }
}

function validateHours(Ele_hours){
  var a = parseFloat(Ele_hours.value) || 0;
  Ele_hours.value = a.toFixed(1);
}

function validateDecimal(Ele_minute){
  Ele_minute.value = Number(Ele_minute.value);
}
