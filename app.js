let habits = JSON.parse(localStorage.getItem("habitList")) || [];
let habit_Number = JSON.parse(localStorage.getItem("habitNumber")) || [0,0];

updateHabitList();

const date = new Date();
const todayDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const timeNow = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
document.getElementById("habit-select").addEventListener("change", function() {
  let habitItem = this.value;
  if (habitItem == "custom") {
    document.getElementById("habit_textbox").disabled = false;  
  } else {
    document.getElementById("habit_textbox").disabled = true;   
  }
});
document.getElementById("date-toggle").addEventListener("change",function(){
    let toggleCheck = this.checked;
    if(toggleCheck){
        document.getElementById("habit-date").disabled=false;
        document.getElementById("habit-date").value = todayDate;
    }
    else{
         document.getElementById("habit-date").disabled=true;
         document.getElementById("habit-date").value = "";
    }
});
document.getElementById("time-toggle").addEventListener("change",function(){
    let toggleCheck = this.checked;
    if(toggleCheck){
        document.getElementById("habit-time").disabled=false;
        document.getElementById("habit-time").value = timeNow;
    }
    else{
         document.getElementById("habit-time").disabled=true;
         document.getElementById("habit-time").value = "";
    }
});


document.getElementById("addBtn").addEventListener("click", function () {
  let habitName = "";
  let dateValue = "";
  let timeValue = "";
  let freqValue = document.getElementById("frequency-select").value;

  const habitSelect = document.getElementById("habit-select");
  const habitTextbox = document.getElementById("habit_textbox");
  
  
  if (habits.length >= 10) {
    alert("You can only add up to 10 habits.");
    return;
  }

  if (habitSelect.value === "custom") {
    if (!habitTextbox.value.trim()) {
      alert("Please enter a habit name!");
      return;
    }
    habitName = habitTextbox.value.trim();
  } else {
    habitName = habitSelect.value;
  }

  if (document.getElementById("date-toggle").checked) {
    dateValue = document.getElementById("habit-date").value;
  }

  if (document.getElementById("time-toggle").checked) {
    timeValue = document.getElementById("habit-time").value;
  }

  const habitObj = {
    name: habitName,
    frequency: freqValue,
    date: dateValue,
    time: timeValue,
  };

 
  const exists = habits.some(habit =>
    habit.name === habitObj.name &&
    habit.frequency === habitObj.frequency &&
    habit.date === habitObj.date &&
    habit.time === habitObj.time
  );

  if (exists) {
    alert("This task already exists! Please choose a different time/date");
    return;
  }

  if (document.getElementById("date-toggle").checked) {
    const inputDate = new Date(dateValue);
    if (inputDate > date) {
      habit_Number[1] += 1;
    } else if (inputDate.toDateString() === date.toDateString()) {
      alert("Choose a different date");
      return;
    } else {
      habit_Number[0] += 1; //todays number
    }
  } else if (document.getElementById("time-toggle").checked) {
    const [hours, minutes] = timeValue.split(":");
    const inputTime = new Date();
    inputTime.setHours(+hours, +minutes, 0, 0);

    if (inputTime > date) {
      habit_Number[0] += 1;
    } else if (inputTime.getMinutes() === date.getMinutes()) {
      alert("Choose a different time");
      return;
    }
  } else {    
    habit_Number[0] += 1;
  }
  habits.push(habitObj);
  localStorage.setItem("habitList", JSON.stringify(habits));
  localStorage.setItem("habitNumber", JSON.stringify(habit_Number));
  updateHabitList();
  
});

function updateHabitList() {
  if(document.getElementById("habit-select").value === "custom"){
    document.getElementById("habit_textbox").value = "";
  }
  const container = document.getElementById("habit-list-container");
  container.innerHTML = ""; 
  document.getElementById("today_num").innerText = habit_Number[0];
  document.getElementById("sch_num").innerText = habit_Number[1];
  habits.forEach((habit, index) => {
    const item = document.createElement("div");   

    const habitHTML = `
      ${index + 1}. ${habit.name.toUpperCase()}: ${habit.frequency} <br>
      ${habit.date ? "Start Date: " + habit.date + "<br>": ""}
      ${habit.time ? "Time: " + habit.time + "<br>" : ""}
      
    `;
    item.innerHTML = habitHTML;
    container.appendChild(item);
    
  });
  
}

document.getElementById("resetBtn").addEventListener("click", function(){
  const confirmed = confirm("Are you sure you want to reset the habit list?");
  if (confirmed){
  localStorage.removeItem("habitList");
  localStorage.removeItem("habitNumber");
  habits = [];
  habit_Number = [0,0];  
  updateHabitList();
  }
});



