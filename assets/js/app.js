//! Fake DB
const staffDb = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "./assets/images/doctor-1.svg",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "./assets/images/doctor-2.svg",
  },
];

const servicesDb = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "./assets/images/oral.svg",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "./assets/images/implants.svg",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
  {
    id: 3,
    name: "Check up",
    image: "./assets/images/checkup.svg",
    duration: "1 hour 12 minutes",
    price: 140.0,
  },
];

const dateDbs = ["2023-08-04", "2023-08-05", "2023-08-06"];

const dateDb = [4, 5, 6];

const timeDb = [
  {
    id: 1,
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    id: 2,
    start_time: "09:30",
    end_time: "10:00",
  },
];

const tabTitles = [
  {
    id: "staff",
    title: "Select staff",
  },
  {
    id: "services",
    title: "Select service",
  },
  {
    id: "dateTime",
    title: "Select date & time",
  },
  {
    id: "confirmation",
    title: "Confirm detailes",
  },
];
//! Fake DB

//! Will be returning object
let reservationData = {
  staff_id: 1,
  service_id: 1,
  date: "",
  time: {
    start_time: "",
    end_time: "",
  },
  customer: {
    name: "",
    surname: "",
    email: "",
    phone: "",
  },
};

// Let's coding
const staffTab = document.querySelector("#staff");
const servicesTab = document.querySelector("#services");
const dateTimeTab = document.querySelector("#dateTime");
const confirmationTab = document.querySelector("#confirmation");
const tabTitle = document.querySelector(".tabTitle");
const allSteps = document.querySelectorAll(".tabItem");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".back");
const bottomBar = document.querySelector(".bottomBar");
const noValidInfo = document.querySelector(".noValidInfo");
const infoMsg = document.querySelector(".infoMsg");
const modalBox = document.querySelector(".modalBox");
const popUp = document.querySelector(".popUp");

let tab = "staff";
let step = 1;

function checkTab() {
  allSteps.forEach((item) => {
    item.classList.remove("active");
    if (tab === "staff" && item.id === "1") {
      item.classList.add("active");
    } else if (tab === "services" && item.id === "2") {
      item.classList.add("active");
    } else if (tab === "dateTime" && item.id === "3") {
      item.classList.add("active");
    } else if (tab === "confirmation" && item.id === "4") {
      item.classList.add("active");
    }
    if (step === 2) {
      if (item.id === "1") {
        item.classList.add("done");
      } else {
        item.classList.remove("done");
      }
    } else if (step === 3) {
      if (item.id === "1" || item.id === "2") {
        item.classList.add("done");
      } else {
        item.classList.remove("done");
      }
    } else if (step === 4) {
      if (item.id === "1" || item.id === "2" || item.id === "3") {
        item.classList.add("done");
      } else {
        item.classList.remove("done");
      }
    } else if (step === 1) {
      if (item.id === "1") {
        item.classList.add("active");
        item.classList.remove("done");
      }
    } else {
      item.classList.remove("done");
    }
  });

  switch (tab) {
    case "staff":
      staffTab.classList.add("active");
      servicesTab.classList.remove("active");
      dateTimeTab.classList.remove("active");
      confirmationTab.classList.remove("active");
      bottomBar.classList.remove("active");
      prevBtn.classList.remove("active");
      break;
    case "services":
      staffTab.classList.remove("active");
      servicesTab.classList.add("active");
      dateTimeTab.classList.remove("active");
      confirmationTab.classList.remove("active");
      bottomBar.classList.add("active");
      prevBtn.classList.add("active");
      break;
    case "dateTime":
      staffTab.classList.remove("active");
      servicesTab.classList.remove("active");
      dateTimeTab.classList.add("active");
      confirmationTab.classList.remove("active");
      bottomBar.classList.add("active");
      prevBtn.classList.add("active");
      break;
    case "confirmation":
      staffTab.classList.remove("active");
      servicesTab.classList.remove("active");
      dateTimeTab.classList.remove("active");
      confirmationTab.classList.add("active");
      bottomBar.classList.add("active");
      prevBtn.classList.add("active");
      break;
    default:
      console.log("We have an error ! Please reload page");
      break;
  }
}
checkTab();

function getTabTitle() {
  tabTitle.innerHTML = "";
  tabTitles.map((data) => {
    if (data.id === tab) {
      tabTitle.innerHTML = data.title;
    }
  });
}
getTabTitle();

function getStaffData() {
  staffTab.innerHTML = "";
  staffDb.map((data) => {
    staffTab.innerHTML += `
    <div class="staffCard" key="${data.id}" id="${data.id}" onclick="selectStaff(id)">
    <div class="doctorImg">
      <img
        src="${data.image}"
        alt="${data.name}"
      />
    </div>
    <div class="staffCardInfo">
      <h4 class="doctorName">${data.name}</h4>
      <p class="doctorEmail">${data.email}</p>
    </div>
  </div>`;
  });
}
getStaffData();

function getServiceData() {
  servicesTab.innerHTML = "";
  servicesDb.map((data) => {
    servicesTab.innerHTML += `
    <div class="serviceCard" id="${data.id}" key="${data.id}" onclick="selectService(id)">
    <div class="serviceImg">
      <img src="${data.image}" alt="${data.name}" />
    </div>
    <div class="serviceInfo">
      <div class="info">
        <h3 class="serviceName">${data.name}</h3>
        <p class="durationInfo">${data.duration}</p>
      </div>
      <p class="servicePrice">${data.price}$</p>
    </div>
  </div>`;
  });
}
getServiceData();

nextBtn.addEventListener("click", () => {
  if (step !== 4) {
    if (step === 1) {
      tab = "services";
      step = 2;
    } else if (step === 2) {
      tab = "dateTime";
      step = 3;
    } else if (step === 3) {
      autoFillSelectedData();
      nextBtn.innerText = "Confirm Booking";
      tab = "confirmation";
      step = 4;
    }
  } else {
    modalBox.classList.add("active");
    popUp.classList.add("active");
  }
  checkTab();
});

prevBtn.addEventListener("click", () => {
  if (step === 2) {
    tab = "staff";
    step = step - 1;
  } else if (step === 3) {
    tab = "services";
    step = step - 1;
  } else if (step === 4) {
    tab = "dateTime";
    step = step - 1;
  }
  checkTab();
});

function openPopUp() {
  modalBox.classList.add("active");
  popUp.classList.add("active");
}

function closePopUp() {
  popUp.addEventListener("click", (e) => e.stopPropagation());
  modalBox.classList.remove("active");
  popUp.classList.remove("active");
}

const staffCards = document.querySelectorAll(".staffCard");

function selectStaff(staffId) {
  staffCards.forEach((item) => {
    if (item.id === staffId) {
      item.classList.add("selected");
      reservationData.staff_id = Number(staffId);
      tab = "services";
      step = 2;
      checkTab();
    } else {
      item.classList.remove("selected");
    }
  });
}

const serviceCards = document.querySelectorAll(".serviceCard");

function selectService(serviceId) {
  serviceCards.forEach((item) => {
    if (item.id === serviceId) {
      item.classList.add("active");
      reservationData.service_id = Number(serviceId);
      tab = "dateTime";
      step = 3;
      checkTab();
    } else {
      item.classList.remove("active");
    }
  });
}

function autoFillSelectedData() {
  let staffData = staffDb.find((item) => item.id === reservationData.staff_id);
  let serviceData = servicesDb.find(
    (item) => item.id === reservationData.service_id
  );

  let staff = document.querySelector(".staff");
  let service = document.querySelector(".service");
  let date = document.querySelector("#date");
  let price = document.querySelector(".price");
  staff.innerHTML = `<span>Staff:</span> ${staffData.name}`;
  service.innerHTML = `<span>Service:</span> ${serviceData.name}`;
  price.innerHTML = `<span>Price:</span> ${serviceData.price}$`;
  date.innerHTML = `<span>Date:</span> ${reservationData.date} / ${reservationData.time.start_time}-${reservationData.time.end_time}`;
}

//! CALENDAR
const monthName = document.querySelector(".monthName");
const fullMonth = document.querySelector(".fullMonth");
const daysBox = document.querySelector(".days");
const prevMonthBtn = document.querySelector(".prevMonth");
const nextMonthBtn = document.querySelector(".nextMonth");

let date = new Date();
const TOTAL_DAYS_VISIBLE = 42;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createCalendar(date) {
  // Find the amount of days from the last, current and next month to show on the calendar
  const prev = getLastDate(date.getFullYear(), date.getMonth(), true);
  const curr = getLastDate(date.getFullYear(), date.getMonth() + 1);
  const next = TOTAL_DAYS_VISIBLE - (prev.days + curr);

  // Firstly, clear the date list
  daysBox.innerHTML = "";

  // Fill previous days on the calendar
  for (let i = prev.date - prev.days + 1; i <= prev.date; i++) {
    daysBox.innerHTML += `
      <div class="day hidden">${i}</div>
    `;
  }

  // Fill current days on the calendar
  for (let i = 1; i <= curr; i++) {
    // Check if the day is today
    if (date.getDate() === i) {
      daysBox.innerHTML += `
      <div class="day">${i}</div>
      `;
    } else {
      daysBox.innerHTML += `
      <div class="day">${i}</div>
      `;
    }
  }

  // Fill next days on the calendar
  for (let i = 1; i <= next; i++) {
    daysBox.innerHTML += `
    <div class="day hidden">${i}</div>
    `;
  }

  // Update current month & year
  monthName.innerText = `${months[date.getMonth()]}, ${date.getFullYear()}`;
  aviableDates();
}

// Previous month
function prevMonth() {
  date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());

  createCalendar(date);
}

// Next month
function nextMonth() {
  date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());

  createCalendar(date);
}

prevMonthBtn.addEventListener("click", () => prevMonth());
nextMonthBtn.addEventListener("click", () => nextMonth());

// Helper function - Get last date of the previous month
function getLastDate(year, month, withDay = false) {
  if (withDay) {
    return {
      date: new Date(year, month, 0).getDate(),
      days: new Date(year, month, 0).getDay(),
    };
  }

  return new Date(year, month, 0).getDate();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => createCalendar(date));

function aviableDates() {
  const allDays = document.querySelectorAll(".day");
  allDays.forEach((item) => {
    if (!item.className.includes("hidden")) {
      dateDb.map((aviableDay) => {
        if (Number(item.innerHTML) === aviableDay) {
          item.classList.add("aviableDay");
          item.setAttribute("onclick", "selectDay(id)");
          item.id = aviableDay;
        }
      });
    }
  });
}

function selectDay(dayId) {
  const aviableDays = document.querySelectorAll(".aviableDay");
  aviableDays.forEach((day) => {
    if (day.id === dayId) {
      day.classList.add("selectedDay");
      dateDbs.filter((item) => {
        if (item.slice(-2).includes(dayId)) {
          document.querySelector("#title").innerHTML = item;
          reservationData.date = item;
          timeMap();
        }
      });
    } else {
      day.classList.remove("selectedDay");
    }
  });
}

function timeMap() {
  let timesBox = document.querySelector(".times");
  timesBox.innerHTML = "";
  timeDb.map((time) => {
    timesBox.innerHTML += `
    <div class="clock" id="${time.id}" onclick="selectTime(id)">
      <p class="startTime">${time.start_time}</p>
      <p class="endTime">${time.end_time}</p>
    </div>
    `;
  });
}

function selectTime(timeId) {
  let clocks = document.querySelectorAll(".clock");
  clocks.forEach((item) => {
    if (item.id == timeId) {
      item.classList.add("selectedTime");
      let time = timeDb.find((time) => time.id == timeId);
      reservationData.time.start_time = time.start_time;
      reservationData.time.end_time = time.end_time;
      tab = "confirmation";
      step = 4;
      autoFillSelectedData();
      checkTab();
    } else {
      item.classList.remove("selectedTime");
    }
  });
}
