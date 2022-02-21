let idArray = [];

function checkLogin() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Logincheck")
    .then(function (Logincheck) {
      let datas = Logincheck.data;
      let loginlength = datas.length;
      let loginExtist = true;

      axios
        .get("https://61c01eb233f24c0017823130.mockapi.io/response/" + 1)
        .then(function (response) {
          let data = response.data;

          for (let r = 0; r < loginlength; r++) {
              if (
                datas[r].mail == data.mail ||
                datas[r].password == data.password
              ) {
                let id = datas[r].id;
                idArray.push(id);
                let adminid = data.id;
                idArray.push(adminid);

                loginExtist = false;
            }
          }

          if (loginExtist) {
            window.location.href = "./../../../index.html";
          }
        });
    });
}

function logOut() {
  let id = idArray[0];
  axios
    .delete("https://61c01eb233f24c0017823130.mockapi.io/Logincheck/" + id)
    .then(function () {
      window.location.href = "./../../../index.html";
    });
}

function dropDown() {
  document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropdownbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

document.getElementById("calendar-title").innerText = "Calendar";
document.querySelector(".close").style.backgroundColor = "#63bfbf";

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
    };
  }
}

function present() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist")
    .then(function (Studentlist) {
      let data = Studentlist.data;
      let task = "";

      let lenk = data.length;

      for (let o = 0; o < lenk; o++) {
        if (data[o].batch == "batch/I" || data[o].batch == "Batch/I") {
          let creat = `<tr><td><div class='student_profile'><img src='${
            data[o].image
          }' width='100%' alt='profile pic'></div></td><td class='ame'>${
            data[o].name
          }${" "}${data[o].lastname}</td><td class='idno'>${
            data[o].idno
          }</td></td><td><label for='precheck${o}'><div id='Present' class='Present clickpr'>Present</div></label><input type='checkbox' class='checkbox' name='present' id='precheck${o}' onchange="onchangePresent(${o})" checked></td></tr>`;

          task = task + creat;
          document.getElementById("table_body").innerHTML = task;
        }
      }
    });
}

checkLogin();
present();
calender();