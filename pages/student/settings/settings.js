let idarray = [];

function checkLogin() {
  axios
    .get("https://61c01eb233f24c0017823130.mockapi.io/Logincheck")
    .then(function (Logincheck) {
      let datas = Logincheck.data;
      let loginlength = datas.length;
      let loginExtist = true;
      let loginstudid = "";

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
                loginstudid = data[d].id;

                idarray.push(id);

                loginExtist = false;
              }
            }
          }

          if (loginExtist) {
            window.location.href = "./../../../index.html";
          } else {
            loginStudentProfile(loginstudid);
          }
        });
    });
}

function logOut() {
  let id = idarray[0];
  axios
    .delete("https://61c01eb233f24c0017823130.mockapi.io/Logincheck/" + id)
    .then(function () {
      window.location.href = "./../../../index.html";
    });
}

function loginStudentProfile(loginstudid) {
  axios
    .get(
      "https://61c01eb233f24c0017823130.mockapi.io/Studentlist/" + loginstudid
    )
    .then(function (loginStudent) {
      let loginStudentData = loginStudent.data;

      document.getElementById("proimg").src = loginStudentData.image;
      document.getElementById("changeProfile").src = loginStudentData.image;
    });
}

checkLogin();
