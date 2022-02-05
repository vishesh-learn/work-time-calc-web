window.onload = () => {
  calculateTime();

  const Element_currentWorkedTime = document.getElementById('currentWorkedTime');
  const Element_totalWorkingTime = document.getElementById('totalWorkingTime');
  const Element_calculateButton = document.getElementById('calculateButton');

  Element_currentWorkedTime.addEventListener("change", calculateTime);
  Element_totalWorkingTime.addEventListener("change", calculateTime);
  Element_calculateButton.addEventListener("click", calculateTime);
};

function calculateTime(){
  const Element_currentWorkedTime = document.getElementById('currentWorkedTime');
  const Element_totalWorkingTime = document.getElementById('totalWorkingTime');
  const Element_timeRemaining = document.getElementById('timeRemaining');
  const Element_finishingTime = document.getElementById('finishingTime');

  var Object_currentWorkedTime = {"h": 0, "m": 0},
      Object_totalWorkingTime = {"h": 0, "m": 0},
      Object_totalTimeDiff = {"h": 0, "m": 0};

  var currentWorkedTime = Element_currentWorkedTime.value.split(":");
  var totalWorkingTime = Element_totalWorkingTime.value.split(":");

  Object_currentWorkedTime.h = Number(currentWorkedTime[0]);
  Object_currentWorkedTime.m = Number(currentWorkedTime[1]);

  Object_totalWorkingTime.h = Number(totalWorkingTime[0]);
  Object_totalWorkingTime.m = Number(totalWorkingTime[1]);

  var totalWorkedMinutes = (Object_currentWorkedTime.h * 60) + Object_currentWorkedTime.m;
  var totalWorkingMinutes = (Object_totalWorkingTime.h * 60) + Object_totalWorkingTime.m;

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
