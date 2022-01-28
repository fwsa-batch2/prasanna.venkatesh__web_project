function adminvalue() {
  let admin = document.getElementById("admin").value;
  if (admin == "") {
    document.querySelector(".admin").classList.add("boder");
    document.querySelector(".coach").classList.remove("boder");
    document.querySelector(".student").classList.remove("boder");
  }
}

function coachvalue() {
  let admin = document.getElementById("coach").value;
  if (admin == "Coach") {
    document.querySelector(".admin").classList.remove("boder");
    document.querySelector(".coach").classList.add("boder");
    document.querySelector(".student").classList.remove("boder");
  }
}

function studentvalue() {
  let admin = document.getElementById("student").value;
  if (admin == "Student") {
    document.querySelector(".admin").classList.remove("boder");
    document.querySelector(".coach").classList.remove("boder");
    document.querySelector(".student").classList.add("boder");
  }
}

const togglePassword = document.querySelector("#eyeopen");
const password = document.querySelector("#password");

togglePassword.onclick = function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
};

function submithandler(event) {
  event.preventDefault();
  let value = "";
  for (let i = 0; i < 3; i++) {
    let takevalue = document.getElementsByClassName("radio")[i].checked;
    if (takevalue) {
      value = document.getElementsByClassName("radio")[i].value;
    }
  }

  check(value);
}

function check(value){
  let mail = document.getElementById("mail").value;
  let passwords = document.getElementById("password").value;

    if(value == ""){
      axios
        .get("https://61c01eb233f24c0017823130.mockapi.io/response")
        .then(function (response) {
          let data = response.data;
          let getvalu = "";
          let len = data.length;
          for (let a = 0; a < len; a++) {
            let tr =
            mail == data[a].username && passwords == data[a].password;
            if (tr) {
              getvalu = true;
            }
          }
          
          if (getvalu) {
            window.location.href = "./pages/admin/profile/profile.html";
          } else {
            document.getElementById("alart").innerHTML =
              "<em class='fal fa-exclamation-circle'></em> Mail id or password is not exist";}
        });
    }else{
      checksec(value);
    }

  }

  function checksec(value){
    let mail = document.getElementById("mail").value;
    let passworda = document.getElementById("password").value;
    if(value == "coach"){
      axios
        .get("https://61c01eb233f24c0017823130.mockapi.io/Coachelist")
        .then(function (Coachelist) {
          let data = Coachelist.data;
          let getvalu = "";

          let lens = data.length;

          for (let a = 0; a < lens; a++) {
            let tr =
            mail == data[a].mail && passworda == data[a].password;
            if (tr) {
              getvalu = true;
            }
          }
          
          if (getvalu) {
            window.location.href = "./pages/coach/profile/profile.html";
          } else {
            document.getElementById("alart").innerHTML =
              "<em class='fal fa-exclamation-circle'></em> Mail id or password is not exist";
          }
        });
    }else {
      checkthr(value);
    }
  }

  function checkthr(value){
    let mail = document.getElementById("mail").value;
    let passwordd = document.getElementById("password").value;
    if(value == "student"){
      axios
        .get("https://61c01eb233f24c0017823130.mockapi.io/Studentlist")
        .then(function (Studentlist) {
          let data = Studentlist.data;
          let getvalu = "";

          let lend = data.length;

          for (let a = 0; a < lend; a++) {
            let tr =
            mail == data[a].mail && passwordd == data[a].password;
            if (tr) {
              getvalu = true;
            }
          }
          
          if (getvalu) {
            window.location.href = "./pages/student/profile/profile.html";
          } else {
            document.getElementById("alart").innerHTML = "<em class='fal fa-exclamation-circle'></em> Mail id or password is not exist";
          }
        });
    }
  }