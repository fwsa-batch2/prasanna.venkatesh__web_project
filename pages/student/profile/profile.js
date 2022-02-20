function checkLogin() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Logincheck")
    .then(function (Logincheck) {
      let datas = Logincheck.data;
      let loginlength = datas.length;
      let loginExtist = true;

      let idarray = [];
      axios
        .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist")
        .then(function (Studentlist) {
          let data = Studentlist.data;

          let len = data.length;

          for (let r = 0; r < loginlength; r++) {
            for (let d = 0; d < len; d++) {
              if (
                datas[r].mail == data[d].mail &&
                datas[r].password == data[d].password
              ) {
                let id = datas[r].id;
                let loginstudid = data[d].id;

                let obj = { id: id, Sutdid: loginstudid };
                idarray.push(obj);

                localStorage.setItem("ID", JSON.stringify(idarray));
                loginExtist = false;
              }
            }
          }

          if (loginExtist) {
            window.location.href = "./../../../index.html";
          }
        });
    });
}

function logOut() {
  let storeId = JSON.parse(localStorage.getItem("ID"));
  axios
    .delete(
      "https://61c01eb233f24c0017823130.mockapi.io/Logincheck/" + storeId[0].id
    )
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

function loginStudentProfile() {
  let storeId = JSON.parse(localStorage.getItem("ID"));
  axios
    .get(
      "https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" +
        storeId[0].Sutdid
    )
    .then(function (loginStudent) {
      let loginStudentData = loginStudent.data;

      document.getElementById("proimg").src = loginStudentData.image;

      let ampm = "";

      if (new Date().getHours() < 12) {
        ampm = "AM";
      } else {
        ampm = "PM";
      }
      let time = new Date().getHours() % 12;

      if (time == 0) {
        time = 12;
      }

      let get = loginStudentData;

      if(get.git == ""){
        document.getElementById("profile-git").classList.add("display");
      }else{
        document.getElementById("profile-git").classList.remove("display");
        document.getElementById("git").href = get.git;
        document.getElementById("checkGitOnOff").checked = true;
        document.getElementById("git-input").classList.remove("display");
      }

      if(get.slack == ""){
        document.getElementById("profile-slack").classList.add("display");
      }else{
        document.getElementById("profile-slack").classList.remove("display");
        document.getElementById("slack").href = get.slack;
        document.getElementById("checkSlackOnOff").checked = true;
        document.getElementById("slack-input").classList.remove("display");
      }

      document.getElementById("profile-pictue").src = get.image;
      document.getElementById("prifile-name").innerText =
        get.name + " " + get.lastname;
      document.getElementById("git").href = get.git;
      document.getElementById("slack").href = get.slack;
      document.getElementById("profile-time").innerText =
        time + ":" + new Date().getMinutes() + " " + ampm;
      document.getElementById("profile-mail").innerHTML =
        "<a href='mailto:" + get.mail + "'>" + get.mail + "</a>";
      document.getElementById("profile-number").innerText = get.number;
      document.getElementById("profile-city").innerText = get.city;
      document.getElementById("profile-department").innerText = get.department;
      document.getElementById("profile-dob").innerText = get.dob;

      document.getElementById("reg-name").value = get.name;
      document.getElementById("reg-lastname").value = get.lastname;
      document.getElementById("reg-id").value = get.idno;
      document.getElementById("reg-squad").value = get.squad;
      document.getElementById("reg-department").value = get.department;
      document.getElementById("reg-gen").value = get.gen;
      document.getElementById("reg-dob").value = get.dob;
      document.getElementById("reg-mail").value = get.mail;
      document.getElementById("reg-city").value = get.city;
      document.getElementById("reg-number").value = get.number;
      document.getElementById("reg-password").value = get.password;
      document.getElementById("reg-git").value = get.git;
      document.getElementById("reg-slack").value = get.slack;
      document.getElementById("img-input").src = get.image;
    });
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

function showProfiles() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist")
    .then(function (Student) {
      let data = Student.data;
      let detials = "";
      let len = data.length;
      let create = "";

      for (let r = 0; r < len; r++) {
        create =
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
        detials = detials + create;
      }

      document.getElementById("students-profiles").innerHTML = detials;
      let storeId = JSON.parse(localStorage.getItem("ID"));

      for (let i = 0; i < len; i++) {
        if (data[i].id == storeId[0].Sutdid) {
          document.getElementsByClassName("list")[i].style.display = "none";
        }
      }

      for (let t = 0; t < len; t++) {
        document.getElementsByClassName("list")[t].onclick = function () {
          document.getElementById("main-div").classList.add("main-change");
          document.getElementById("main-div").classList.remove("main-width");
          document.getElementById("slider").classList.add("slider-change");
          document.getElementById("slider").classList.remove("slider-width");
          document.getElementById("reg-name-div").innerText = "Profile";
          document.getElementById("profile-show").classList.remove("display");
          document.getElementById("profile-edit").classList.add("display");
          let id = data[t].id;
          showdetial(id);
        }

        if(document.getElementsByClassName("statuss")[i].innerText == "Active"){
          document.getElementsByClassName("statuss")[i].style.backgroundColor="#63bfbf"
        }else if(document.getElementsByClassName("statuss")[i].innerText == "Leave"){
          document.getElementsByClassName("statuss")[i].style.backgroundColor="#1bdf3c"
        }else{
          document.getElementsByClassName("statuss")[i].style.backgroundColor="red"
        }
      }
    });
}

function showdetial(id) {

  console.log("Prasanna");
      axios
        .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" + id)
        .then(function (Studentlists) {
          let ampm = "";

          if (new Date().getHours() < 12) {
            ampm = "AM";
          } else {
            ampm = "PM";
          }
          let time = new Date().getHours() % 12;

          if (time == 0) {
            time = 12;
          }

          let get = Studentlists.data;

          if(get.git == ""){
            document.getElementById("profile-git").classList.add("display");
          }else{
            document.getElementById("profile-git").classList.remove("display");
            document.getElementById("git").href = get.git;
          }

          if(get.slack == ""){
            document.getElementById("profile-slack").classList.add("display");
          }else{
            document.getElementById("profile-slack").classList.remove("display");
            document.getElementById("slack").href = get.slack;
          }

          document.getElementById("profile-pictue").src = get.image;
          document.getElementById("prifile-name").innerText =
            get.name + " " + get.lastname;
          document.getElementById("git").href = get.git;
          document.getElementById("slack").href = get.slack;
          document.getElementById("profile-time").innerText =
            time + ":" + new Date().getMinutes() + " " + ampm;
          document.getElementById("profile-mail").innerHTML =
            "<a href='mailto:" + get.mail + "'>" + get.mail + "</a>";
          document.getElementById("profile-number").innerText = get.number;
          document.getElementById("profile-city").innerText = get.city;
          document.getElementById("profile-department").innerText =
            get.department;
          document.getElementById("profile-dob").innerText = get.dob;
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
          "</div><div id='coach-idno'>" +
          data[r].idno +
          "</div><div id='coach-Positions'>" +
          data[r].position +
          "</div><div id='coach-statuss'><div class='status'>" +
          data[r].status +
          "</div></div></div>";

        detials = detials + creat;
      }
      document.getElementById("coach-profiles").innerHTML = detials;
    });
}

function couachsent() {
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
              let time = new Date().getHours() % 12;

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

function profileEdit() {
  document.getElementById("main-div").classList.add("main-change");
  document.getElementById("main-div").classList.remove("main-width");
  document.getElementById("slider").classList.add("slider-change");
  document.getElementById("slider").classList.remove("slider-width");
  document.getElementById("reg-name-div").innerText = "Profile";
  document.getElementById("profile-show").classList.remove("display");
  document.getElementById("profile-edit").classList.remove("display");
    loginStudentProfile();
}

function slack(){
  document.getElementById("slack-input").classList.toggle("display")
  if(document.getElementById("checkSlackOnOff").checked){
    document.getElementById("slack-input").classList.remove("display");
    document.getElementById("checkSlackOnOff").checked = true;
  }else{
    document.getElementById("slack-input").classList.add("display");
    document.getElementById("reg-slack").value="";
  }
}

function git(){
  if(document.getElementById("checkGitOnOff").checked){
    document.getElementById("git-input").classList.remove("display");
    document.getElementById("checkGitOnOff").checked = true;
  }else{
    document.getElementById("git-input").classList.add("display");
    document.getElementById("reg-git").value="";
  }
}

function editForm() {
  event.preventDefault();

  const firstname = document.getElementById("reg-name").value;
  const lastname = document.getElementById("reg-lastname").value;
  const idno = document.getElementById("reg-id").value;
  const squad = document.getElementById("reg-squad").value;
  const department = document.getElementById("reg-department").value;
  const genders = document.getElementById("reg-gen").value;
  const dob = document.getElementById("reg-dob").value;
  const mail = document.getElementById("reg-mail").value;
  const city = document.getElementById("reg-city").value;
  const number = document.getElementById("reg-number").value;
  const password = document.getElementById("reg-password").value;
  const gitlink = document.getElementById("reg-git").value;
  const slacklink = document.getElementById("reg-slack").value;

  let storeId = JSON.parse(localStorage.getItem("ID"));

  axios.put(
    "https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" +
      storeId[0].Sutdid,
    {
      name: firstname,
      lastname: lastname,
      idno: idno,
      dob: dob,
      squad: squad,
      department: department,
      gen: genders,
      mail: mail,
      number: number,
      city: city,
      git: gitlink,
      slack: slacklink,
      password: password,
    }
  ).then(function(){
    loginStudentProfile()
  });
}

function editFormShow(){
  document.getElementById("editForm").classList.remove("display");
  loginStudentProfile()
}

function closeEditform(){
  document.getElementById("editForm").classList.add("display");
}

function statusChange(){
  let storeId = JSON.parse(localStorage.getItem("ID"));

  let status = document.getElementById("statusButton").innerText;

  if(status == "Active"){
    document.getElementById("statusButton").innerText="Leave";
  }else if(status == "Leave"){
    document.getElementById("statusButton").innerText="Active";
  }

  axios.put(
    "https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" +
      storeId[0].Sutdid,
    {
      status:status
    }
  );

}

checkLogin();
loginStudentProfile();
showProfiles();
changeselect();
coachdetial();
couachsent();