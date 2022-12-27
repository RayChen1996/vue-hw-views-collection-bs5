// const Url = "http://localhost:3000";
const Url = "https://vue-test-render.onrender.com";

const viewCreateTitle = document.querySelector("#view-create-title");
const viewCreateContent = document.querySelector("#view-create-content");
const viewCreateImg = document.querySelector("#view-create-img");
const viewCreateBtn = document.querySelector(".view-create-btn");

if (viewCreateBtn) {
  viewCreateBtn.addEventListener("click", (e) => {
    const data = {
      title: viewCreateTitle.value,
      content: viewCreateContent.value,
      imgUrl: viewCreateImg.value,
    };

    if (
      viewCreateTitle.value === "" ||
      viewCreateContent.value === "" ||
      viewCreateImg.value === ""
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
      .post(`${Url}/views`, data)
      .then((res) => {
        console.log(res.data);

        Swal.fire({
          icon: "success",
          title: "新增成功",
          showConfirmButton: false,
          timer: 1000,
        });

        viewCreateTitle.value = "";
        viewCreateContent.value = "";
        viewCreateImg.value = "";

        setTimeout(() => {
          window.location.href = "./desk.html";
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
