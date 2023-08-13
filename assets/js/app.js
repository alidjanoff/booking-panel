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

const dateDb = ["2022-03-04", "2022-03-05", "2022-03-06"];

const timeDb = [
  {
    start_time: "09:00",
    end_time: "09:30",
  },
  {
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
    <div class="staffCard" key="${data.id}" id="${data.id}">
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
    <div class="serviceCard" id="${data.id}" key="${data.id}">
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
  console.log(step);
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
