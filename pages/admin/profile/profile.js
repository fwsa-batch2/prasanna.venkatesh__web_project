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

function studentreg() {
  document.getElementById("main-div").classList.add("main-change");
  document.getElementById("main-div").classList.remove("main-width");
  document.getElementById("slider").classList.add("slider-change");
  document.getElementById("slider").classList.remove("slider-width");
  document.getElementById("add-per").classList.add("click-icon");
  document.getElementById("detial").classList.remove("display");
  document.getElementById("profile-show").classList.add("display");
  document.getElementById("reg-name-div").innerText = "registration";
}

function closereg() {
  document.getElementById("main-div").classList.remove("main-change");
  document.getElementById("main-div").classList.add("main-width");
  document.getElementById("slider").classList.remove("slider-change");
  document.getElementById("slider").classList.add("slider-width");
  document.getElementById("add-per").classList.remove("click-icon");
}

const maxDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0
).getDate();

const minYear = new Date().getFullYear() - 21;
const maxYear = new Date().getFullYear() - 17;

const dobMaxyear = `${maxYear}-12-${maxDate}`;

document.getElementById("reg-dob").max = dobMaxyear;
document.getElementById("reg-dob").min = `${minYear}-01-01`;

function submithandler(event) {
  event.preventDefault();
  const idno = document.getElementById("reg-id").value;
  const mail = document.getElementById("reg-mail").value;

  const select = changeselect();

  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/" + select)
    .then(function (list) {
      let data = list.data;

      let len = data.length;

      let exist = "";
      for (let i = 0; i < len; i++) {
        if (data[i].idno == idno || data[i].mail == mail) {
          exist = true;
        }
      }

      if (exist) {
        alert(`This user is already exist`);
      } else {
        storedetials();
      }
    });
}

function idnocheck() {
  const idno = document.getElementById("reg-id").value;
  const select = changeselect();

  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/" + select)
    .then(function (selects) {
      let data = selects.data;
      let lenr = data.length;

      let idExist = "";

      for (let i = 0; i < lenr; i++) {
        if (data[i].idno == idno) {
          idExist = true;
        }
      }

      if (idExist) {
        alert("This id : " + idno + " is already exist");
      }
    });
}

function emailcheck() {
  const mail = document.getElementById("reg-mail").value;

  const select = changeselect();

  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/" + select)
    .then(function (selects) {
      let data = selects.data;
      let lenr = data.length;

      let mailExist = "";

      for (let i = 0; i < lenr; i++) {
        if (data[i].mail == mail) {
          mailExist = true;
        }
      }

      if (mailExist) {
        alert("This mail : " + mail + " is already exist");
      }
    });
}

function storedetials() {
  const firstname = document.getElementById("reg-name").value;
  const lastname = document.getElementById("reg-lastname").value;
  const idno = document.getElementById("reg-id").value;
  const squad = document.getElementById("reg-squad").value;
  const batch = "Batch/I";
  const status = "Active";
  const department = document.getElementById("reg-department").value;
  const genders = document.getElementById("reg-gen").value;
  const dob = document.getElementById("reg-dob").value;
  const mail = document.getElementById("reg-mail").value;
  const city = document.getElementById("reg-city").value;
  const number = document.getElementById("reg-number").value;
  const password = document.getElementById("reg-password").value;
  const git = "";
  const slack = "";
  const image = document.getElementById("profile").src;

  const select = changeselect();

  axios
    .post("https://61c01eb233f24c0017823130.mockapi.io/" + select, {
      name: firstname,
      lastname: lastname,
      image: image,
      idno: idno,
      dob: dob,
      squad: squad,
      batch: batch,
      status: status,
      department: department,
      gen: genders,
      mail: mail,
      number: number,
      git: git,
      slack: slack,
      city: city,
      password: password,
    })
    .then(function () {
      showdetial();
      coachdetial();
    });
}

function showdetial() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist")
    .then(function (Studentlist) {
      let data = Studentlist.data;
      let detials = "";

      let lena = data.length;
      for (let r = 0; r < lena; r++) {
        let create = `<div id='list' class='list'><div class='click'></div><div id='student-profile'><div id='student-profile-div'><img id='img' src='${data[r].image}' alt='profile'></div></div><div id='student-names'>${data[r].name} ${data[r].lastname}</div><div id='student-idno'>${data[r].idno}</div><div id='student-squads'>${data[r].squad}</div><div id='student-statuss'><div class='statuss'>${data[r].status}</div></div><div id='student-batches'>${data[r].batch}</div><div id='student-del' class='student-del-btn'><em class='fal fa-trash'></em></div></div>`;
        detials = detials + create;
      }
      document.getElementById("student-profiles").innerHTML = detials;

      for (let i = 0; i < data.length; i++) {
        document.getElementsByClassName("student-del-btn")[i].onclick =
          function () {
            document.getElementsByClassName("list")[i].style.display = "none";
            let id = data[i].id;
            axios.delete(
              "https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" + id
            );
          };
        let value = data[i].status;
        if (value == "Active") {
          document.getElementsByClassName("statuss")[i].style.backgroundColor =
            "rgb(159, 216, 45)";
        } else {
          document.getElementsByClassName("statuss")[i].style.backgroundColor =
            "rgb(223, 24, 24)";
        }

        document.getElementsByClassName("click")[i].onclick = function () {
          document.getElementById("main-div").classList.add("main-change");
          document.getElementById("main-div").classList.remove("main-width");
          document.getElementById("slider").classList.add("slider-change");
          document.getElementById("slider").classList.remove("slider-width");
          document.getElementById("reg-name-div").innerText = "Profile";
          document.getElementById("profile-show").classList.remove("display");
          document.getElementById("detial").classList.add("display");

          let id = data[i].id;
          studentDetialShow(id);
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

function studentDetialShow(id){
        
  axios
    .get(
      "https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" + id
    )
    .then(function (Studentlists) {
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
      document.getElementById("profile-department").innerText = get.department;
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
        let create = `<div id='list' class='lists'><div class='clicka'></div><div id='coach-profile'><div id='coach-profile-div'><img id='img' src='${data[r].image}' alt='profile'></div></div><div id='coach-names'>${data[r].name} ${data[r].lastname}</div><div id='coach-idno'>${data[r].idno}</div><div id='coach-positions'>${data[r].department}</div><div id='coach-statuss'><div class='status'>${data[r].status}</div></div><div id='coach-del' class='coach-del-btn'><em class='fal fa-trash'></em></div></div>`;

        detials = detials + create;
      }

      document.getElementById("coach-profiles").innerHTML = detials;

      for (let i = 0; i < data.length; i++) {
        document.getElementsByClassName("coach-del-btn")[i].onclick =
          function () {
            document.getElementsByClassName("lists")[i].style.display = "none";
            let id = data[i].id;
            axios.delete(
              "https://61c01eb233f24c0017823130.mockapi.io/Coachelist/" + id
            );
          };

        let value = data[i].status;

        if (value == "Active") {
          document.getElementsByClassName("status")[i].style.backgroundColor =
            "rgb(159, 216, 45)";
        } else {
          document.getElementsByClassName("status")[i].style.backgroundColor =
            "rgb(223, 24, 24)";
        }

        document.getElementsByClassName("clicka")[i].onclick = function () {
          document.getElementById("main-div").classList.add("main-change");
          document.getElementById("main-div").classList.remove("main-width");
          document.getElementById("slider").classList.add("slider-change");
          document.getElementById("slider").classList.remove("slider-width");
          document.getElementById("reg-name-div").innerText = "Profile";
          document.getElementById("profile-show").classList.remove("display");
          document.getElementById("detial").classList.add("display");

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

              document.getElementById("profile-picture").src = get.image;
              document.getElementById("profile-name").innerText =
                get.name + " " + get.lastname;
              document.getElementById("profile-git").href = get.git;
              document.getElementById("profile-slack").href = get.slack;
              document.getElementById("profile-time").innerText =
                time + ":" + new Date().getMinutes() + " " + ampm;
              document.getElementById("profile-mail").innerHTML =
                "<a href='mailto:" + get.mail + "'>" + get.mail + "</a>";
              document.getElementById("profile-number").innerText = get.number;
              document.getElementById("profile-city").innerText = get.city;
              document.getElementById("profile-department").innerText =
                get.department;
              document.getElementById("profile-dob").innerText = get.dob;
              document.getElementById("add-per").classList.remove("click-icon");
            });
        };
      }
    });
}

function changeselect() {
  const value = document.getElementById("select").value;
  let check = "";
  if (value == "coach") {
    check = "Coachelist";
    document.getElementById("reg-squad").classList.add("display");
    document.getElementById("coach-profiles").classList.remove("display");
    document.getElementById("coach-head").classList.remove("display");
    document.getElementById("student-profiles").classList.add("display");
    document.getElementById("student-head").classList.add("display");
  } else {
    check = "Studentlist";
    document.getElementById("reg-squad").classList.remove("display");
    document.getElementById("coach-profiles").classList.add("display");
    document.getElementById("coach-head").classList.add("display");
    document.getElementById("student-profiles").classList.remove("display");
    document.getElementById("student-head").classList.remove("display");
  }

  return check;
}

function gender() {
  const gendera = document.getElementById("reg-gen").value;
  let image = "";
  if (gendera == "other" || gendera == "female") {

    console.log("prasanna");
    image =
      "https://static.vecteezy.com/system/resources/thumbnails/004/056/978/small_2x/young-woman-portrait-free-vector.jpg";
  } else {
    image =
      "https://icons-for-free.com/iconfiles/png/512/boy+guy+man+icon-1320166733913205010.png";
  }
  document.getElementById("profile").src = image;
}

checkLogin();
coachdetial();
gender();
showdetial();