// const Url = "http://localhost:3000";
const Url = "https://vue-test-render.onrender.com";

function renderView(arr) {
  const viewList = document.querySelector(".view-list");

  let str = "";

  arr.forEach((item) => {
    str += `
      <li class="col">
        <div class="card h-100">
          <div class="card-img-top">
            <img src=${item.imgUrl} alt="">
          </div>
          <div class="card-body d-flex flex-column p-4">
            <h2 class="card-title fw-bold mb-4">${item.title}</h2>
            <p class="card-text mb-20">
            ${item.content}
            </p>
            <a href="./view.html" class="view-btn link-success card-link stretched-link mt-auto ms-auto" data-viewid=${item.id}
              >延伸閱讀</a
            >
          </div>
        </div>
      </li>
  `;
  });

  if (viewList) {
    viewList.innerHTML = str;
  }
}

function getViewId() {
  const viewBtn = document.querySelectorAll(".view-btn");
  viewBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      const viewId = e.target.dataset.viewid;
      localStorage.setItem("viewId", viewId);
    });
  });
}

function getViewData() {
  axios
    .get(`${Url}/views`)
    .then((res) => {
      const { data } = res;
      renderView(data);
      getViewId();
      // renderViewDetail(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function viewInit() {
  getViewData();
}

viewInit();
