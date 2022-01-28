document.getElementById("calendar-title").innerText = "calendar";
document.querySelector(".close").style.backgroundColor = "#63bfbf";

function closereg() {
  document.getElementById("calendar-title").innerText = "calendar";
  document.getElementById("calendar-list").classList.remove("display");
  document.getElementById("calendar").classList.remove("display");
  document.querySelector(".close").style.backgroundColor = "#63bfbf";
  document.getElementById("close-icon").classList.add("display");
  document.querySelector(".close").style.borderBottom = "none";
  document.querySelector(".close").style.color = "#fff";
  document.getElementById("time-form").classList.add("display");
}

function timeschedule() {
  document.getElementById("calendar-title").innerText = "Time schedule";
  document.getElementById("calendar-list").classList.add("display");
  document.getElementById("calendar").classList.add("display");
  document.querySelector(".close").style.backgroundColor = "#FFF2EE";
  document.querySelector(".close").style.borderBottom = "1px solid #dfe0e5";
  document.querySelector(".close").style.color = "#000";
  document.getElementById("close-icon").classList.remove("display");
  document.getElementById("time-form").classList.remove("display");
}

const month = [
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

const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let monthindex = new Date().getMonth();
let yearindex = new Date().getFullYear();

document.getElementById("month").innerText = month[new Date().getMonth()];
document.getElementById("year").innerText = yearindex;

document.getElementById("date").innerText = new Date().getDate();
document.getElementById("next").onclick = function () {
  if (monthindex < 11) {
    monthindex++;
  } else if (monthindex == 11) {
    monthindex = 0;
    yearindex = yearindex + 1;
  }

  document.getElementById("month").innerText = month[monthindex];
  document.getElementById("year").innerText = yearindex;
  calender();
  header();
  showtimetable();
};

document.getElementById("previous").onclick = function () {
  if (monthindex > 0) {
    monthindex--;
  } else if (monthindex == 0) {
    monthindex = 11;
    yearindex = yearindex - 1;
  }

  document.getElementById("month").innerText = month[monthindex];
  document.getElementById("year").innerText = yearindex;
  calender();
  header();
  showtimetable();
};

function calender() {
  let monthIndexvalue = month.indexOf(
    document.getElementById("month").innerText
  );

  let firstWeekday = new Date(
    document.getElementById("year").innerText,
    monthIndexvalue,
    1
  ).getDay();

  let monthEnd = new Date(
    document.getElementById("year").innerText,
    monthIndexvalue + 1,
    0
  ).getDate();

  let startdate = "";
  for (let e = 0; e < firstWeekday + monthEnd; e++) {
    let dates = "<div class='days-no'></div>";
    startdate = startdate + dates;
  }

  document.getElementById("dates").innerHTML = startdate;

  for (let w = firstWeekday; w < firstWeekday + monthEnd; w++) {
    document.getElementsByClassName("days-no")[w].innerText =
      w - firstWeekday + 1;
  }

  for (let l = 0; l < firstWeekday + monthEnd; l++) {
    if (
      document.getElementsByClassName("days-no")[l].innerText ==
      document.getElementById("date").innerText
    ) {
      document.getElementsByClassName("days-no")[l].classList.add("today");
    }

    document.getElementsByClassName("days-no")[l].onclick = function () {
      let div = document.getElementById("dates");
      let add = div.getElementsByTagName("div").length;

      for (let r = 0; r < add; r++) {
        document.getElementsByClassName("days-no")[r].classList.remove("today");
      }
      document.getElementsByClassName("days-no")[l].classList.add("today");
      document.getElementById("date").innerText =
        document.getElementsByClassName("days-no")[l].innerText;
      header();
      showtimetable();
    };
  }
}

let monthVal = month.indexOf(document.getElementById("month").innerText);

function header() {
  document.getElementById("calendar-date").innerText =
    document.getElementById("date").innerText;
  document.getElementById("calendar-month").innerText =
    document.getElementById("month").innerText;
  document.getElementById("calendar-year").innerText =
    document.getElementById("year").innerText;

  document.getElementById("calendar-day").innerText =
    week[
      new Date(
        document.getElementById("year").innerText,
        monthVal,
        document.getElementById("date").innerText
      ).getDay()
    ];
}

let dateValue = document.getElementById("date").innerText;

let monthLast = new Date(
  document.getElementById("year").innerText,
  monthVal + 1,
  0
).getDate();

let firstDay = new Date(
  document.getElementById("year").innerText,
  monthVal,
  1
).getDate();

document.getElementById("calendar-next").onclick = function () {
  if (dateValue < monthLast) {
    dateValue++;
  } else if (dateValue == monthLast) {
    dateValue = firstDay;
  }

  document.getElementById("date").innerText = dateValue;
  calender();
  header();
  showtimetable();
};

document.getElementById("calendar-previous").onclick = function () {
  if (dateValue > firstDay) {
    dateValue--;
  } else if (dateValue == firstDay) {
    dateValue = monthLast;
  }

  document.getElementById("date").innerText = dateValue;
  calender();
  header();
  showtimetable();
};

function submithan() {
  const timeIn = document.getElementById("Timein").value;
  const timeOut = document.getElementById("Timeout").value;
  const date = document.getElementById("timedate").value;
  const title = document.getElementById("select-class").value;

  axios
    .post("https://61c01eb233f24c0017823130.mockapi.io/response", {
      date: date,
      timein: timeIn,
      timeout: timeOut,
      title: title,
    })
    .then(function () {
      listshow();
      showtimetable();
    });
}

function listshow() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/response")
    .then(function (response) {
      const data = response.data;

      let list = "";
      const length = data.length;

      for (let s = 0; s < length; s++) {
        const create = `<div class='classes'><h4 id='title' class='title'>${data[s].title}</h4><h5><span id='classin' class='classin'>${data[s].timein}</span> - <span id='classout'>${data[s].timeout}</span></h5><div class='class-date' id='classdate'>${data[s].date}</div><div class='class-del'><em class='fal fa-trash'></em></div></div>`;

        list = list + create;
      }

      document.getElementById("class-list").innerHTML = list;

      for (let f = 0; f < data.length; f++) {
        document.getElementsByClassName("class-del")[f].onclick = function () {
          let id = data[f].id;
          axios
            .delete(
              "https://61c01eb233f24c0017823130.mockapi.io/response/" + id
            )
            .then(function () {
              listshow();
              showtimetable();
              document.getElementById("time-bar").style.display = "none";
            });
        };
      }
    });
}

function showtimetable() {
  let dateValues = document.getElementById("date").innerText;

  let monthValues = "";

  for (let o = 0; o < month.length; o++) {
    if (month[o] == document.getElementById("month").innerText) {
      monthValues = o;
    }
  }

  let yearValue = document.getElementById("year").innerText;

  if (dateValues < 10) {
    dateValues = `0${dateValues}`;
  }

  let monthIndexvalues = monthValues + 1;
  if (monthIndexvalues < 10) {
    monthIndexvalues = "0" + monthIndexvalues;
  }

  showbar(yearValue, monthIndexvalues, dateValues);
}

function showbar(yearValue, monthIndexvalues, dateValues) {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/response")
    .then(function (response) {
      let data = response.data;
      let timebar = "";
      let array = [];

      let yearmonthdate = yearValue + "-" + monthIndexvalues + "-" + dateValues;
      let dataLength = data.length;

      for (let g = 0; g < dataLength; g++) {
        if (data[g].date == yearmonthdate) {
          let create = `<div id='time-bar' class='time-bar'><span class='title-div'><span>Title : ${data[g].title}Class</span></span><span class='timein-div'><span>${data[g].timein}</span> - <span>${data[g].timeout}</span></span></div>`;
          timebar = timebar + create;

          document.getElementById("calendar-timetable").innerHTML = timebar;

          let timein = data[g].timein;
          let timeout = data[g].timeout;

          let obj = { timein: timein, timeout: timeout };
          array.push(obj);
        }
      }

      calculation(array);
    });
}

function calculation(array) {
  let len = document
    .getElementById("calendar-timetable")
    .getElementsByTagName("div").length;

  for (let r = 0; r < len; r++) {
    let inTime = "";
    let outTime = "";

    if (array.length == 0) {
      inTime = "00:00";
      outTime = "00:00";
    } else {
      inTime = array[r].timein;
      outTime = array[r].timeout;
    }

    let frontPart = inTime.split(":");
    let backPart = outTime.split(":");

    let frontHours = parseInt(frontPart[0]);
    let backHours = parseInt(backPart[0]);
    let frontMinute = parseInt(frontPart[1]);
    let backminute = parseInt(backPart[1]);

    let minFront = backminute / 60;
    let minBack = frontMinute / 60;
    let hours = backHours + minFront - (frontHours + minBack);

    document.getElementsByClassName("time-bar")[r].style.top =
      (frontHours + frontMinute / 60) * 4.35 + "%";
    document.getElementsByClassName("time-bar")[r].style.height =
      hours * 4.3 + "%";
  }
}


calender();
header();
listshow();
showtimetable();
