function profilebtn() {
  window.location.href = "./profile.html";
}

function schedulebtn() {
  window.location.href = "./../schedule/schedule.html";
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

function studentreg() {
  document.getElementById("main-div").classList.add("main-change");
  document.getElementById("main-div").classList.remove("main-width");
  document.getElementById("slider").classList.add("slider-change");
  document.getElementById("slider").classList.remove("slider-width");
  document.getElementById("detial").classList.remove("display");
  document.getElementById("reg-name-div").innerText = "Student registration";
  document.getElementById("profile-show").classList.add("display");
}

function closereg() {
  document.getElementById("main-div").classList.remove("main-change");
  document.getElementById("main-div").classList.add("main-width");
  document.getElementById("slider").classList.remove("slider-change");
  document.getElementById("slider").classList.add("slider-width");
}

function showdetial() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist")
    .then(function (Studentlist) {
      let data = Studentlist.data;
      let detials = "";
      let len = data.length;
      for (let r = 0; r < len; r++) {
        let creat =
          "<div id='student-list' class='list'><div id='student-pro'><div id='st-por-div'><img id='img' src='" +
          data[r].image +
          "' alt='profile'></div></div><div id='student-names'>" +
          data[r].name +
          " " +
          data[r].lastname +
          "</div><div id='student-idno'>" +
          data[r].idno +
          "</div><div id='student-squads'>" +
          data[r].squad +
          "</div><div id='student-statuss'><div class='statuss'>" +
          data[r].status +
          "</div></div><div id='student-batches'>" +
          data[r].batch +
          "</div></div>";
        detials = detials + creat;
      }
      document.getElementById("students-profiles").innerHTML = detials;

      for (let i = 0; i < len; i++) {
        let value = data[i].status;
        if (value == "Active") {
          document.getElementsByClassName("statuss")[i].style.backgroundColor =
            "rgb(159, 216, 45)";
        } else {
          document.getElementsByClassName("statuss")[i].style.backgroundColor =
            "rgb(223, 24, 24)";
        }

        document.getElementsByClassName("list")[i].onclick = function () {

          document.getElementById("main-div").classList.add("main-change");
          document.getElementById("main-div").classList.remove("main-width");
          document.getElementById("slider").classList.add("slider-change");
          document.getElementById("slider").classList.remove("slider-width");
          document.getElementById("reg-name-div").innerText = "Profile";
          document.getElementById("profile-show").classList.remove("display");
          document.getElementById("profile-icons").classList.remove("display");

          let id = data[i].id;
          axios
            .get(
              "https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" + id
            )
            .then(function (Studentlists) {
              let ampm = "";

              if(new Date().getHours()<12){
                  ampm = "AM";
              }else{
                 ampm = "PM";
              }
              let time = new Date().getHours()%12;

              if(time == 0){
                time = 12;
              }

              let get = Studentlists.data;

              document.getElementById("profile-pictue").src = get.image;
              document.getElementById("prifile-name").innerText =
                get.name + " " + get.lastname;
              document.getElementById("profile-position").innerText =
                get.position;
              document.getElementById("git").href = get.git;
              document.getElementById("slack").href = get.slack;
              document.getElementById("profile-time").innerText =
                time + ":" + new Date().getMinutes()+" "+ampm;
              document.getElementById("profile-mail").innerHTML =
                "<a href='mailto:" + get.mail + "'>" + get.mail + "</a>";
              document.getElementById("profile-number").innerText = get.number;
              document.getElementById("profile-city").innerText = get.city;
              document.getElementById("profile-address").innerText =
                get.address;
              document.getElementById("profile-department").innerText =
                get.department;
              document.getElementById("profile-dob").innerText = get.dob;
            });
        };
      }
    });
}

function coachdetial() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Coachelist")
    .then(function (Coachelist) {
      let data = Coachelist.data;
      let detials = "";

      let lens = data.length;

      for (let r = 0; r < lens; r++) {
        let creat =
          "<div id='student-list' class='lists'><div id='student-pro'><div id='st-por-div'><img id='img' src='" +
          data[r].image +
          "' alt='profile'></div></div><div id='coach-names'>" +
          data[r].name +
          " " +
          data[r].lastname +
          "</div><div id='coach-idno'>"+data[r].idno+"</div><div id='coach-Positions'>" +
          data[r].position +
          "</div><div id='coach-statuss'><div class='status'>" +
          data[r].status +
          "</div></div></div>";

        detials = detials + creat;
      }
      document.getElementById("coach-profiles").innerHTML = detials;
    });
}

function couachsent(){
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Coachelist")
    .then(function (Coachelist) {
      let data = Coachelist.data;

      let lend = data.length;

      for (let i = 0; i < lend; i++) {
        let value = data[i].status;

        if (value == "Active") {
          document.getElementsByClassName("status")[i].style.backgroundColor =
            "rgb(159, 216, 45)";
        } else {
          document.getElementsByClassName("status")[i].style.backgroundColor =
            "rgb(223, 24, 24)";
        }
      
        document.getElementsByClassName("lists")[i].onclick = function () {
          document.getElementById("main-div").classList.add("main-change");
          document.getElementById("main-div").classList.remove("main-width");
          document.getElementById("slider").classList.add("slider-change");
          document.getElementById("slider").classList.remove("slider-width");
          document.getElementById("reg-name-div").innerText = "Profile";
          document.getElementById("profile-show").classList.remove("display");
          document.getElementById("profile-icons").classList.add("display");

          let id = data[i].id;
          axios
            .get("https://61c01eb233f24c0017823130.mockapi.io/Coachelist/" + id)
            .then(function (Coachelists) {
              let ampm = "";
              let time = new Date().getHours()%12;

              if (new Date().getHours() < 12) {
                ampm = "AM";
              } else {
                ampm = "PM";
              }

              if (time == 0) {
                time = 12;
              }

              let get = Coachelists.data;

              document.getElementById("profile-pictue").src = get.image;
              document.getElementById("prifile-name").innerText =
                get.name + " " + get.lastname;
              document.getElementById("profile-position").innerText =
                get.position;
              document.getElementById("profile-git").href = get.git;
              document.getElementById("profile-slack").href = get.slack;
              document.getElementById("profile-time").innerText =
                time + ":" + new Date().getMinutes() + " " + ampm;
              document.getElementById("profile-mail").innerHTML =
                "<a href='mailto:" + get.mail + "'>" + get.mail + "</a>";
              document.getElementById("profile-number").innerText = get.number;
              document.getElementById("profile-city").innerText = get.city;
              document.getElementById("profile-address").innerText =
                get.address;
              document.getElementById("profile-department").innerText =
                get.department;
              document.getElementById("profile-dob").innerText = get.dob;
            });
        };
      }
    });
}

function changeselect() {
  let value = document.getElementById("select").value;

  if (value == "coach") {
    document.getElementById("coach-profiles").classList.remove("display");
    document.getElementById("coach-head").classList.remove("display");
    document.getElementById("students-profiles").classList.add("display");
    document.getElementById("student-head").classList.add("display");
  } else {
    document.getElementById("coach-profiles").classList.add("display");
    document.getElementById("coach-head").classList.add("display");
    document.getElementById("students-profiles").classList.remove("display");
    document.getElementById("student-head").classList.remove("display");
  }
}

changeselect();
coachdetial();
couachsent();
showdetial();



