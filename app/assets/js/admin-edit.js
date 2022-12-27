const Url = "https://vue-test-render.onrender.com";

const viewEditTitle = document.querySelector("#view-edit-title");
const viewEditContent = document.querySelector("#view-edit-content");
const viewEditImg = document.querySelector("#view-edit-img");
const viewEditBtn = document.querySelector(".view-edit-btn");

const id = localStorage.getItem("adminViewID");

function renderAdminEditData(data) {
  if (viewEditTitle) {
    viewEditTitle.value = data.title;
    viewEditContent.value = data.content;
    viewEditImg.value = data.imgUrl;
  }
}

function updateView() {
  const data = {
    title: viewEditTitle.value,
    content: viewEditContent.value,
    imgUrl: viewEditImg.value,
  };

  if (
    viewEditTitle.value === "" ||
    viewEditContent.value === "" ||
    viewEditImg.value === ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "有空欄位未填",
      showConfirmButton: false,
      timer: 1000,
    });
    return;
  }

  axios
    .put(`${Url}/views/${id}`, data)
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "編輯成功",
        showConfirmButton: false,
        timer: 1000,
      });

      localStorage.removeItem("adminViewID");

      setTimeout(() => {
        window.location.href = "./desk.html";
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
}

function editView() {
  if (viewEditBtn) {
    viewEditBtn.addEventListener("click", () => {
      updateView();
    });
  }
}

function getAdminEditData() {
  axios
    .get(`${Url}/views/${id}`)
    .then((res) => {
      const { data } = res;
      renderAdminEditData(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function adminEditInit() {
  getAdminEditData();
  editView();
}

adminEditInit();
