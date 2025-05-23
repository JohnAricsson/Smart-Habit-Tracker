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