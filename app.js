let habits = JSON.parse(localStorage.getItem("habitList")) || [];
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

  if (habitSelect.value === "custom") {
    if (!habitTextbox.value) {
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

  if (habits.length >= 10) {
    alert("You can only add up to 10 habits.");
    return;
  }

  const habitObj = {
    name: habitName,
    frequency: freqValue,
    date: dateValue,
    time: timeValue,
  };

  habits.push(habitObj);
  localStorage.setItem("habitList", JSON.stringify(habits));
  updateHabitList();
});


function updateHabitList() {
  const container = document.getElementById("habit-list-container");
  container.innerHTML = ""; 

  habits.forEach((habit, index) => {
    const item = document.createElement("div");   

    const habitHTML = `
      ${index + 1}. ${habit.name}: ${habit.frequency} <br>
      ${habit.date ? "Start Date: " + habit.date + "<br>": ""}
      ${habit.time ? "Time: " + habit.time + "<br>" : ""}
      <br>
    `;

    item.innerHTML = habitHTML;
    container.appendChild(item);
  });
}

document.getElementById("resetBtn").addEventListener("click", function(){
  localStorage.removeItem("habitList");
  habits = [];
  updateHabitList();
});



