function profilebtn() {
  window.location.href = "./../profile/profile.html";
}

function schedulebtn() {
  window.location.href = "./schedule.html";
}

function attendencebtn() {
  window.location.href = "./../attendence/attendence.html";
}

function assignmentbtn() {
  window.location.href = "./../assignment/assignment.html";
}

function querybtn() {
  window.location.href = "./../query/query.html";
}

function classbtn() {
  window.location.href = "https://freshworks.zoom.us/my/b2classroom";
}

function settingsbtn() {
  window.location.href = "./../settings/settings.html";
}

document.getElementById("reg-name-div").innerText = "Calendar";
document.querySelector(".close").style.backgroundColor = "#63bfbf";

function closereg() {
  document.getElementById("reg-name-div").innerText = "Calendar";
  document.getElementById("callist").classList.remove("display");
  document.getElementById("cal").classList.remove("display");
  document.querySelector(".close").style.backgroundColor = "#63bfbf";
  document.getElementById("close-icon").classList.add("display");
  document.querySelector(".close").style.borderBottom = "none";
  document.querySelector(".close").style.color = "#fff";
  document.getElementById("time-form").classList.add("display");
}

function timeschedule() {
  document.getElementById("reg-name-div").innerText = "Time schedule";
  document.getElementById("callist").classList.add("display");
  document.getElementById("cal").classList.add("display");
  document.querySelector(".close").style.backgroundColor = "#FFF2EE";
  document.querySelector(".close").style.borderBottom = "1px solid #dfe0e5";
  document.querySelector(".close").style.color = "#000";
  document.getElementById("close-icon").classList.remove("display");
  document.getElementById("time-form").classList.remove("display");
}

let month = [
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

let i = new Date().getMonth();
let y = new Date().getFullYear();

document.getElementById("month").innerText = month[new Date().getMonth()];
document.getElementById("year").innerText = y;

document.getElementById("date").innerText = new Date().getDate();
document.getElementById("next").onclick = function () {
  if (i < 11) {
    i++;
  } else if (i == 11) {
    i = 0;
    y = y + 1;
  }
  document.getElementById("month").innerText = month[i];
  document.getElementById("year").innerText = y;
  calender();
  header();
  showtimetable();
};

document.getElementById("prev").onclick = function () {
  if (i > 0) {
    i--;
  } else if (i == 0) {
    i = 11;
    y = y - 1;
  }
  document.getElementById("month").innerText = month[i];
  document.getElementById("year").innerText = y;
  calender();
  header();
  showtimetable();
};

function calender() {
  let indmonths = month.indexOf(document.getElementById("month").innerText);

  let daysstart = new Date(
    document.getElementById("year").innerText,
    indmonths,
    1
  ).getDay();

  let monthslast = new Date(
    document.getElementById("year").innerText,
    indmonths + 1,
    0
  ).getDate();

  let startdate = "";
  for (let e = 0; e < daysstart + monthslast; e++) {
    let dates = "<div class='days-no'></div>";
    startdate = startdate + dates;
  }

  document.getElementById("dates").innerHTML = startdate;

  for (let w = daysstart; w < daysstart + monthslast; w++) {
    document.getElementsByClassName("days-no")[w].innerText = w - daysstart + 1;
  }

  for (let l = 0; l < daysstart + monthslast; l++) {
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

function header() {
  document.getElementById("cals-date").innerText =
    document.getElementById("date").innerText;
  document.getElementById("cal-month").innerText =
    document.getElementById("month").innerText;
  document.getElementById("cal-year").innerText =
    document.getElementById("year").innerText;

  let indmonths = month.indexOf(document.getElementById("month").innerText);

  let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  document.getElementById("cal-day").innerText =
    week[
      new Date(
        document.getElementById("year").innerText,
        indmonths,
        document.getElementById("date").innerText
      ).getDay()
    ];
}

let indmonth = month.indexOf(document.getElementById("month").innerText);

let de = document.getElementById("date").innerText;
let mo = indmonth;
let ye = document.getElementById("year").innerText;

let monthlast = new Date(
  document.getElementById("year").innerText,
  indmonth + 1,
  0
).getDate();

let daystart = new Date(
  document.getElementById("year").innerText,
  indmonth,
  1
).getDate();

document.getElementById("cal-next").onclick = function () {
  if (de < monthlast) {
    de++;
  } else if (de == monthlast) {
    de = daystart;
  }

  document.getElementById("date").innerText = de;
  calender();
  header();
  showtimetable();
};

document.getElementById("cal-prev").onclick = function () {
  if (de > daystart) {
    de--;
  } else if (de == daystart) {
    de = monthlast;
  }

  document.getElementById("date").innerText = de;
  calender();
  header();
  showtimetable();
};

function submithan() {
  let time = document.getElementById("Time").value;
  let time1 = document.getElementById("Time1").value;
  let date = document.getElementById("timedate").value;
  let title = document.getElementById("select-class").value;

  axios
    .post("https://61c01eb233f24c0017823130.mockapi.io/response", {
      date: date,
      timein: time,
      timeout: time1,
      title: title,
    })
    .then(function () {
      listshow();
      showtimetable();
    });
}

function showtimetable() {
  let des = document.getElementById("date").innerText;
  let mos = indmonth;
  let yes = document.getElementById("year").innerText;

  if (des < 10) {
    des = 0 + des;
  }

  let mons = mos + 1;
  if (mons < 10) {
    mons = "0" + mons;
  }

  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/response")
    .then(function (response) {
      let data = response.data;
      let timeber = "";
      let array = [];

      let com = yes + "-" + mons + "-" + des;
      let lens = data.length;

      for (let g = 0; g < lens; g++) {
        if (data[g].date == com) {
          let creat =
            "<div id='time-bar' class='time-bar'><span class='title-div'><span>Title : " +
            data[g].title +
            " Class</span></span><span class='time-di'><span>" +
            data[g].timein +
            "</span> - <span>" +
            data[g].timeout +
            "</span></span></div>";
          timeber = timeber + creat;

          document.getElementById("cal-timetable").innerHTML = timeber;

          let time = data[g].timein;
          let time1 = data[g].timeout;

          let obj = { timein: time, timeout: time1 };
          array.push(obj);
        }
      }
      let len = document
        .getElementById("cal-timetable")
        .getElementsByTagName("div").length;

      for (let r = 0; r < len; r++) {
        let time = "";
        let time1 = "";

        if (array.length == 0) {
          time = "00:00";
          time1 = "00:00";
        }else{
          time = array[r].timein;
          time1 = array[r].timeout;
        }

        let parts = time.split(":");
        let parts1 = time1.split(":");

        let hour = parseInt(parts[0]);
        let hou = parseInt(parts1[0]);
        let minute = parseInt(parts[1]);
        let minut = parseInt(parts1[1]);

        let m1 = minut / 60;
        let m2 = minute / 60;
        let hor = hou + m1 - (hour + m2);

        document.getElementsByClassName("time-bar")[r].style.top =
          (hour + minute / 60) * 4.35 + "%";
        document.getElementsByClassName("time-bar")[r].style.height =
          hor * 4.3 + "%";
      }
    });
}

calender();
header();
listshow();
showtimetable();