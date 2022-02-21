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

checkLogin();