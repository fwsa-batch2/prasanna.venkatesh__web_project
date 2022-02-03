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

checkLogin();