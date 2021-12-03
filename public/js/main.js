const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const cityName = document.getElementById("cityName");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");
const temp_realval = document.getElementById("temp_realval");
const tempInfoToggle = document.getElementById("tempInfoToggle");

const day = document.getElementById("day");
const date = document.getElementById("today_date");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  tempInfoToggle.classList.add("tempInfo");
  if (cityVal === "") {
    city_name.innerText = "Please write the name before search";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=61b6091adbe67accfa0b108e08981761`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      const tempData = arrData[0].main.temp;
      const tempData1 = Math.floor(tempData - 273);
      temp_realval.innerText = tempData1;

      // condition check for clous or sunny or rainy
      const tempMood = arrData[0].weather[0].main;
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          '<i class="fas fa-sun" style="color:yellow"></i>';
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          '<i class="fas fa-clouds" style="color:white"></i>';
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud-rain" style="color:white"></i>';
      } else {
        temp_status.innerHTML =
          '<i class="fas fa-cloud" style="color:green"></i>';
      }

      datahide.classList.remove("data_hide");
    } catch {
      city_name.innerText = "Plz enter city name properly";
    }
  }
};

const currDate = new Date();
const datetime = currDate.getDay();
const currDay = currDate.getDate();
const currMonth = currDate.getMonth();

const datetime1 = [
  "Sunday",
  "Monday",
  "Tudesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
day.innerText = datetime1[datetime];
date.innerText = `${currDay} | ${months[currMonth]}`;
submitBtn.addEventListener("click", getInfo);
