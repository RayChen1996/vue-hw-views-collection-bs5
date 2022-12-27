// const Url = "http://localhost:3000";
const Url = "https://vue-test-render.onrender.com";

const registerEmail = document.querySelector("#register-email");
const registerPwd = document.querySelector("#register-password");
const registerBtn = document.querySelector(".register-btn");
const registerForm = document.querySelector(".register-form");

function signUp() {
  let data = {
    email: registerEmail.value,
    password: registerPwd.value,
    role: "user",
  };

  axios
    .post(`${Url}/register`, data)
    .then((res) => {
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "註冊成功",
        showConfirmButton: false,
        timer: 1000,
      });

      setTimeout(() => {
        window.location.href = "./login.html";
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

if (registerBtn) {
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signUp();
  });
}

if (registerForm) {
  registerForm.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      signUp();
    }
  });
}
