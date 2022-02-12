window.onload = () => {
  getStoredData();
  calculateTime();

  const Ele_currentWorkedHour = document.getElementById('currentWorkedHour');
  const Element_currentWorkedMinute = document.getElementById('currentWorkedMinute');

  const Element_totalWorkingHour = document.getElementById('totalWorkingHour');
  const Element_totalWorkingMinute = document.getElementById('totalWorkingMinute');

  const Element_calculateButton = document.getElementById('calculateButton');

  Ele_currentWorkedHour.addEventListener("input", activity);
  Element_currentWorkedMinute.addEventListener("input", activity);

  Element_totalWorkingHour.addEventListener("input", activity);
  Element_totalWorkingMinute.addEventListener("input", activity);

  Element_calculateButton.addEventListener("click", calculateTime);
};

function activity(){
  const a = event.target;

  validateNaturalNumber(a);

  if(a.className.includes("user_data")){
    localStorage[a.id] = a.value;
  }

  calculateTime();
}

function getStoredData(){
  for(let i=0;i<localStorage.length;i++){
    var key = localStorage.key(i);
    var obj = document.getElementById(key);
    if(obj != null){
      obj.value = localStorage[key];
    } else {
      console.log("no object found for the key '" + key + "' in localStorage");
    }
  }
}

function calculateTime(){
  const Ele_currentWorkedHour = document.getElementById('currentWorkedHour');
  const Element_currentWorkedMinute = document.getElementById('currentWorkedMinute');

  const Element_totalWorkingHour = document.getElementById('totalWorkingHour');
  const Element_totalWorkingMinute = document.getElementById('totalWorkingMinute');

  const Element_timeRemaining = document.getElementById('timeRemaining');
  const Ele_finishTime = document.getElementById('finishingTime');

  var Object_totalTimeDiff = {"h": 0, "m": 0};

  var currentWorkedHour = Number(Ele_currentWorkedHour.value);
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

  const Obj_finishTime = new simpleTime(totalFinishingMinutes);

  var finishingHours = Obj_finishTime.h, apm = "am";

  var a = Math.ceil(Obj_finishTime.h / 12);

  if(Obj_finishTime.h >= 12){
    finishingHours -= (a-1)*12;

    if(a % 2 == 0) apm = "pm";
  }

  Ele_finishTime.innerText = finishingHours + ":" + Obj_finishTime.m + " " + apm;
}

class simpleTime {
  constructor(totalMinutes) {
    this.h = Math.floor(totalMinutes / 60);
    this.m = totalMinutes % 60;
  }
}

function validateNaturalNumber(Ele_hours){
  Ele_hours.value = Number(Ele_hours.value);
}
