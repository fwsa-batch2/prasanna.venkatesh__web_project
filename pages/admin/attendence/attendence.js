function checkLogin(){
  axios
  .get("https://61c01eb233f24c0017823130.mockapi.io/Logincheck")
  .then(function (Logincheck) {
    let datas = Logincheck.data;
    let loginlength = datas.length;
    let loginExtist = "";

    if (loginlength == 0) {
      window.location.href = "./../../../index.html";
    }

    for (let r = 0; r < loginlength; r++) {
      console.log(r);
      if (
        datas[r].mail != "admin@freshclass.com" ||
        datas[r].password != "Admin@2021"
      ) {
        loginExtist = true;
      }
    }
    console.log(loginExtist);
    if (loginExtist) {
      logOut();
    }
  });
}

function logOut() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Logincheck")
    .then(function (Logincheck) {
      let datas = Logincheck.data;
      let lenForlogout = datas.length;
      for (let r = 0; r < lenForlogout; r++) {
        if (
          datas[r].mail == "admin@freshclass.com" ||
          datas[r].password == "Admin@2021"
        ) {
          let id = datas[r].id;
          console.log(id);
          axios
            .delete(
              "https://61c01eb233f24c0017823130.mockapi.io/Logincheck/" + id
            )
            .then(function () {
              window.location.href = "./../../../index.html";
            });
        }
      }
    });
}

document.getElementById("reg-name-div").innerText = "Calendar";
document.querySelector(".close").style.backgroundColor = "#63bfbf";

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

let monthIndex = new Date().getMonth();
let year = new Date().getFullYear();

document.getElementById("month").innerText = month[new Date().getMonth()];
document.getElementById("year").innerText = year;

document.getElementById("date").innerText = new Date().getDate();
document.getElementById("next").onclick = function () {
  if (monthIndex < 11) {
    monthIndex++;
  } else if (monthIndex == 11) {
    monthIndex = 0;
    year = year + 1;
  }
  document.getElementById("month").innerText = month[monthIndex];
  document.getElementById("year").innerText = year;
  calender();
  showPresent();
};

document.getElementById("prev").onclick = function () {
  if (monthIndex > 0) {
    monthIndex--;
  } else if (monthIndex == 0) {
    monthIndex = 11;
    year = year - 1;
  }
  document.getElementById("month").innerText = month[monthIndex];
  document.getElementById("year").innerText = year;
  calender();
  showPresent();
};

function calender() {
  let indmonth = month.indexOf(document.getElementById("month").innerText);

  let daystart = new Date(
    document.getElementById("year").innerText,
    indmonth,
    1
  ).getDay();

  let monthlast = new Date(
    document.getElementById("year").innerText,
    indmonth + 1,
    0
  ).getDate();

  let startdate = "";
  for (let e = 0; e < daystart + monthlast; e++) {
    let dates = "<div class='days-no'></div>";
    startdate = startdate + dates;
  }

  document.getElementById("dates").innerHTML = startdate;

  for (let l = daystart; l < daystart + monthlast; l++) {
    document.getElementsByClassName("days-no")[l].innerText = l - daystart + 1;
  }

  for (let k = 0; k < daystart + monthlast; k++) {
    if (
      document.getElementsByClassName("days-no")[k].innerText ==
      document.getElementById("date").innerText
    ) {
      document.getElementsByClassName("days-no")[k].classList.add("today");
    }

    document.getElementsByClassName("days-no")[k].onclick = function () {
      let div = document.getElementById("dates");
      let add = div.getElementsByTagName("div").length;
      for (let r = 0; r < add; r++) {
        document.getElementsByClassName("days-no")[r].classList.remove("today");
      }
      document.getElementsByClassName("days-no")[k].classList.add("today");
      document.getElementById("date").innerText =
        document.getElementsByClassName("days-no")[k].innerText;

      showPresent();
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

function onchangePresent(q) {
  if (document.getElementsByClassName(`checkbox`)[q].checked) {
    document.getElementsByClassName(`Present`)[q].classList.add("clickpr");
    document.getElementsByClassName(`Present`)[q].classList.remove("clickr");
    document.getElementsByClassName(`Present`)[q].innerText = "Present";
  } else {
    document.getElementsByClassName(`Present`)[q].classList.add("clickr");
    document.getElementsByClassName(`Present`)[q].classList.remove("clickpr");
    document.getElementsByClassName(`Present`)[q].innerText = "Absent";
  }
}

function saveDetails() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist")
    .then(function (detials) {
      let data = detials.data;
      studentdetial(data);
    });
}

let attendence = [];

function studentdetial(data) {
  const months = document.getElementById("month").innerText;
  const date = document.getElementById("date").innerText;
  const years = document.getElementById("year").innerText;

  let fulldate = `${date}/${months}/${years}`;

  let len = data.length;
  let presentcheck = "";

  for (let x = 0; x < len; x++) {
    if (document.getElementsByClassName(`checkbox`)[x].checked) {
      presentcheck = "Present";
    } else {
      presentcheck = "Absent";
    }

    const name = `${data[x].name} ${data[x].lastname}`;
    const idno = data[x].idno;

    let attendenceObj = {
      date: fulldate,
      attendence: presentcheck,
      name: name,
      idno: idno,
    };

    attendence.push(attendenceObj);


  }
  takevalue();


  // axios
  //   .get("https://61c01eb233f24c0017823130.mockapi.io/attendences")
  //   .then(function (attendences) {
  //     let datas = attendences.data;

  //     let leng = datas.length;
  //     let len = data.length;

  //     let presentcheck = "";
  //     let name = "";
  //     let idno = "";

  //     for (let x = 0; x < len; x++) {
  //       if (document.getElementsByClassName(`checkbox`)[x].checked) {
  //         presentcheck = "Present";
  //       } else {
  //         presentcheck = "Absent";
  //       }

  //       name = `${data[x].name} ${data[x].lastname}`;
  //       idno = data[x].idno;

  //       if (leng == 0) {
  //         axios.post(
  //           "https://61c01eb233f24c0017823130.mockapi.io/attendences",
  //           {
  //             date: fulldate,
  //             attendence: presentcheck,
  //             name: name,
  //             idno: idno,
  //           }
  //         );
  //       }
  // } else if (datas[x].date != fulldate) {
  //   console.log(x);
  //   axios
  //     .post("https://61c01eb233f24c0017823130.mockapi.io/attendences", {
  //       date: fulldate,
  //       attendence: presentcheck,
  //       name: name,
  //       idno: idno,
  //     })
  //     .then(function () {
  //       showPresent();
  //     });
  // }
  //   }

  // });
}

// function showPresent() {
//   const months = document.getElementById("month").innerText;
//   const date = document.getElementById("date").innerText;
//   const years = document.getElementById("year").innerText;

//   let fulldate = `${date}/${months}/${years}`;

//   const attendenceDiv = document.getElementById("table_body");
//   const attendenceDivlength = attendenceDiv.getElementsByTagName("tr").length;

//   axios
//     .get(
//       `https://61c01eb233f24c0017823130.mockapi.io/attendences?filter=${fulldate}`
//     )
//     .then(function (selects) {
//       let data = selects.data;

//       let lenr = data.length;

//       if (lenr == 0) {
//         for (let o = 0; o < attendenceDivlength; o++) {
//           document
//             .getElementsByClassName("Present")
//             [o].classList.add("clickpr");
//           document
//             .getElementsByClassName("Present")
//             [o].classList.remove("clickr");
//           document.getElementsByClassName(`Present`)[o].innerText = "Present";
//           document.getElementsByClassName(`checkbox`)[o].checked = true;
//         }
//       }

//       for (let g = 0; g < lenr; g++) {
//         if (data[g].attendence == "Present") {
//           document
//             .getElementsByClassName("Present")
//             [g].classList.add("clickpr");
//           document
//             .getElementsByClassName("Present")
//             [g].classList.remove("clickr");
//           document.getElementsByClassName(`checkbox`)[g].checked = true;
//           document.getElementsByClassName(`Present`)[g].innerText = "Present";
//         } else {
//           document.getElementsByClassName(`Present`)[g].classList.add("clickr");
//           document
//             .getElementsByClassName(`Present`)
//             [g].classList.remove("clickpr");
//           document.getElementsByClassName(`checkbox`)[g].checked = false;
//           document.getElementsByClassName(`Present`)[g].innerText = "Absent";
//         }
//       }
//     });
// }

function takevalue() {
  const months = document.getElementById("month").innerText;
  const date = document.getElementById("date").innerText;
  const years = document.getElementById("year").innerText;

  let fulldate = `${date}/${months}/${years}`;

  // const getValue = JSON.parse(localStorage.getItem("ATTENDENCE"))
  // console.log(getValue);

  let len = attendence.length;
  // console.log(len);
  console.log(attendence);

  for (let o = len-2; o < len; o++) {

    console.log(o);
  
    // console.log(attendence[o].date != fulldate);
  //   console.log(o);
  //   if(getValue[o].date == fulldate){
  //     console.log(o);
  //     attendence.splice(o, 1);
  //   }
  }
}


function markallpresent() {
  const ele = document.getElementById("markallpresent");

  const attendenceDiv = document.getElementById("table_body");
  const attendenceDivlength = attendenceDiv.getElementsByTagName("tr").length;

  for (let t = 0; t < attendenceDivlength; t++) {
    let checkboxes = document.getElementsByClassName(`checkbox`)[t];
    if (ele.checked) {
      checkboxes.checked = true;
    } else {
      checkboxes.checked = false;
    }

    onchangePresent(t);
  }
}

checkLogin();
markallpresent();
present();
calender();
// showPresent();
