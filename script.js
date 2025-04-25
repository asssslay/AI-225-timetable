// Function to create HTML for a single class item
function createClassItem(item) {
  const weekClass =
    item.weekType === "common" ? "common-week" : `${item.weekType}-week`;
  const typeClass =
    item.type === "Лекція" ? "block-button-lection" : "block-button-lab";

  let html = `
        <div class="${weekClass}">
            <h2 class="name-class">${item.name}</h2>
            <h2 class="${typeClass}">${item.type}</h2>
            <h2 class="time">${item.time}</h2>`;

  if (item.meetingInfo) {
    html += `
            <div class="meet-login">
                Meeting ID: ${item.meetingInfo.id} <br />
                Passcode: ${item.meetingInfo.passcode}
            </div>`;
  }

  if (item.attendance) {
    html += `
            <p class="attendance-indicator">❗️ Відмічають</p>`;
  }

  html += `
            <div class="button">
                <a href="${item.link}" class="button-link" target="_blank">Підключитись</a>
            </div>`;

  html += `</div>`; // Закриття основного div

  return html;
}

// Function to create HTML for a day's schedule
function createDaySchedule(dayData) {
  const dayToGridArea = {
    Понеділок: "md",
    Вівторок: "ts",
    Середа: "wd",
    Четвер: "th",
    Пʼятниця: "fr",
  };

  const gridArea = dayToGridArea[dayData.day];
  let html = `<div class="${gridArea} day-container">
                <div class="title">${dayData.day}</div>`; // Заголовок дня

  if (dayData.day === "Пʼятниця") {
    html += `<div class="friday-content">
                <img src="${dayData.items[0].img}" alt="Friday image" class="friday-image">
             </div>`;
  } else {
    html += `<div class="day-content">`;

    dayData.items.forEach((item) => {
      html += createClassItem(item);
    });

    html += `</div>`;
  }

  html += `</div>`;
  return html;
}

// Function to populate the timetable
function populateTimetable() {
  const container = document.getElementById("timetableContainer");
  let html = "";

  timetableData.forEach((dayData) => {
    html += createDaySchedule(dayData);
  });

  container.innerHTML = html;
}

document.getElementById("toggleWeekBtn").addEventListener("click", function () {
  const oddWeekElements = document.querySelectorAll(".odd-week");
  const evenWeekElements = document.querySelectorAll(".even-week");
  const isOddWeekVisible = oddWeekElements[0].style.display !== "none";

  oddWeekElements.forEach(
    (el) => (el.style.display = isOddWeekVisible ? "none" : "block")
  );
  evenWeekElements.forEach(
    (el) => (el.style.display = isOddWeekVisible ? "block" : "none")
  );

  // Change button text
  this.textContent = isOddWeekVisible
    ? "Перемкнути на непарний тиждень"
    : "Перемкнути на парний тиждень";

  // Update current week display
  document.getElementById("currentWeek").textContent = isOddWeekVisible
    ? "Зараз ви переглядаєте: Парний тиждень"
    : "Зараз ви переглядаєте: Непарний тиждень";
});

function formatDate(date) {
  const days = [
    "неділя",
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "п'ятниця",
    "субота",
  ];
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const dayOfWeek = days[date.getDay()];

  return `${day} ${month}. ${dayOfWeek}`;
}

// Initialize the timetable when the page loads
window.addEventListener("load", function () {
  // Populate the timetable
  populateTimetable();

  // Hide even week elements by default
  const evenWeekElements = document.querySelectorAll(".even-week");
  evenWeekElements.forEach((el) => (el.style.display = "none"));

  // Default display message
  document.getElementById("currentWeek").textContent =
    "Зараз ви переглядаєте: Непарний тиждень";

  // Set the current date
  document.getElementById("currentDate").textContent = formatDate(new Date());
});
