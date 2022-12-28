const BaseUrl = `https://vuejs-travel-app.onrender.com`
const adminDeskTable = document.querySelector(".admin-desk-table");

function renderDeskTable(arr) {
  let str = "";

  arr.forEach((item) => {
    str += `
    <tr>
      <th scope="row">${item.id}</th>
      <td>${item.title}</td>
      <td>${item.body}</td>
      <td>
        <a href="#" class="admin-view-remove-btn btn btn-outline-danger me-2" data-id=${item.id}>刪除</a>
        <a href="./edit.html" class="admin-view-edit-btn btn btn-outline-warning" data-id=${item.id}>編輯</a>
      </td>
    </tr>
    `;
  });

  if (adminDeskTable) {
    adminDeskTable.innerHTML = str;
  }
}

function saveEditId() {
  const adminViewEditBtn = document.querySelectorAll(".admin-view-edit-btn");

  if (adminViewEditBtn) {
    adminViewEditBtn.forEach((item) => {
      item.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        localStorage.setItem("adminViewID", id);
      });
    });
  }
}

function deleteViews() {
  const adminViewRemoveBtn = document.querySelectorAll(".admin-view-remove-btn");

  if (adminViewRemoveBtn) {
    adminViewRemoveBtn.forEach((item) => {
      item.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        Swal.fire({
          title: "確定要刪除?",
          text: "即將刪除!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "取消",
          confirmButtonText: "確定",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`${BaseUrl}/Views/${id}`)
              .then(() => {
                localStorage.removeItem("adminViewID");

                adminInit();
              })
              .catch((error) => {
                console.log(error);
              });

            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      });
    });
  }
}

function getAdminViewsData() {
 
  axios
    .get(`${BaseUrl}/Views`)
    .then((res) => {
      const { data } = res;
      renderDeskTable(data);
      saveEditId();
      deleteViews();
    })
    .catch((error) => {
      console.log(error);
    });
}

function adminInit() {
  getAdminViewsData();
}

adminInit();
