
const BaseUrl = `https://vuejs-travel-app.onrender.com`

const bookmarkAddBtn = document.querySelector(".bookmark-add-btn");
const bookmarkRemoveBtn = document.querySelector(".bookmark-remove-btn");
const bookmarkStatus = document.querySelector(".bookmark-status");

const viewId = localStorage.getItem("viewId");
const userId = localStorage.getItem("userId");

function renderBookmarkList(arr) {
  const bookmarkList = document.querySelector(".bookmark-list");

  let str = "";

  arr.forEach((item) => {
    str += `
      <li class="col">
        <div class="card h-100 position-relative">
          <div class="card-img-top">
            <img src=${item.view.imgUrl} alt="">
          </div>
          <div class="card-body d-flex flex-column p-4">
            <h2 class="card-title fw-bold mb-4">${item.view.title}</h2>
            <p class="card-text mb-20">
            ${item.view.content}
            </p>
            <a href="./view.html" class="view-btn link-success card-link mt-auto ms-auto" data-viewid=${item.view.id}
              >延伸閱讀</a
            >
          </div>
          <button type="button" class="bookmark-tag btn btn-warning position-absolute end-0" data-id=${item.id}>已收藏</button>
        </div>
      </li>
  `;
  });

  if (bookmarkList) {
    bookmarkList.innerHTML = str;
  }
}

function bookMarkAdded() {
  if (bookmarkAddBtn) {
    bookmarkAddBtn.classList.add("d-none");
    bookmarkRemoveBtn.classList.remove("d-none");
    bookmarkStatus.textContent = "已收藏";
    bookmarkStatus.classList.add("text-danger");
  }
}

function bookmarkRemoved() {
  bookmarkRemoveBtn.classList.add("d-none");
  bookmarkAddBtn.classList.remove("d-none");
  bookmarkStatus.textContent = "未收藏";
  bookmarkStatus.classList.remove("text-danger");
}

function renderViewDetail(arr) {
  const viewDetail = document.querySelector(".view-detail");

  let str = "";

  arr.forEach((item) => {
    const viewId = localStorage.getItem("viewId");
    if (item.id === +viewId) {
      str += `
      <h1>${item.title}</h1>
      <p class="mb-8">${item.content}</p>
      <img src=${item.imgUrl} alt="" />
      `;
    }
  });

  if (viewDetail) {
    viewDetail.innerHTML = str;
  }
}

function getViewDetailData() {
  axios
    .get(`${BaseUrl}/Views`)
    .then((res) => {
      const { data } = res;
      renderViewDetail(data);
      return axios.get(`${BaseUrl}/user/${userId}/bookmarks?_expand=view`);
    })
    .then((res) => {
      const { data } = res;
      renderBookmarkList(data);
      removeListBookmark();

      data.forEach((item) => {
        if (item.viewId === viewId) {
          bookMarkAdded();
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

if (bookmarkAddBtn) {
  bookmarkAddBtn.addEventListener("click", (e) => {
    e.preventDefault();

    bookMarkAdded();

    const data = {
      viewId,
      userId,
    };

    axios
      .post(`${BaseUrl}/bookmarks`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function removeBookmark() {
  axios
    .get(`${BaseUrl}/user/${userId}/bookmarks`)
    .then((res) => {
      console.log(res.data);
      const { data } = res;
      let thisId = 0;
      data.forEach((item) => {
        if (item.viewId === viewId) {
          thisId = item.id;
        }
      });

      return axios.delete(`${BaseUrl}/bookmarks/${thisId}`);
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

if (bookmarkRemoveBtn) {
  bookmarkRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    bookmarkRemoved();

    removeBookmark();
  });
}

function removeListBookmark() {
  const bookmarkTag = document.querySelectorAll(".bookmark-tag");
  if (bookmarkTag) {
    bookmarkTag.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        const id = e.target.dataset.id;
        console.log(id);
        axios
          .delete(`${BaseUrl}/bookmarks/${id}`)
          .then((res) => {
            console.log(res.data);
            viewDetailInit();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }
}

function viewDetailInit() {
  getViewDetailData();
}

viewDetailInit();
