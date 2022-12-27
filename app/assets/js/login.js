
const loginEmail = document.querySelector("#login-email");
const loginPwd = document.querySelector("#login-password");
const loginBtn = document.querySelector(".login-btn");
const loginForm = document.querySelector(".login-form");

function login() {
  let data = {
    email: loginEmail.value,
    password: loginPwd.value,
  };

  axios
    .post(`${BaseUrl}/login`, data)
    .then((res) => {
      console.log(res.data);

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("role", res.data.user.role);

      Swal.fire({
        icon: "success",
        title: "登入成功",
        showConfirmButton: false,
        timer: 1000,
      });

      setTimeout(() => {
        if (localStorage.getItem("role") === "admin") {
          window.location.href = "./desk.html";
        } else {
          window.location.href = "./index.html";
        }
      }, 1500);
    })
    .catch((error) => {
      console.log(error);

      Swal.fire({
        icon: "warning",
        title: error.response.data,
        showConfirmButton: false,
        timer: 1500,
      });
    });
}

if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    login();
  });
}

if (loginForm) {
  loginForm.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      login();
    }
  });
}

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");

const haventLoginNav = document.querySelector(".havent-login-nav");
const haveLoginNav = document.querySelector(".have-login-nav");
const adminPanelBtn = document.querySelector(".admin-panel-btn");
const bookmark = document.querySelector(".bookmark");

if (token) {
  if (haventLoginNav) {
    haventLoginNav.classList.add("d-none");
    haveLoginNav.classList.remove("d-none");
  }
  if (bookmark) {
    bookmark.classList.remove("d-none");
  }
}

if (adminPanelBtn) {
  if (role === "admin") {
    adminPanelBtn.classList.remove("d-none");
  } else {
    adminPanelBtn.classList.add("d-none");
  }
}

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.clear();

    Swal.fire({
      icon: "success",
      title: "已登出",
      showConfirmButton: false,
      timer: 1000,
    });

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1500);
  });
}
