"use strict";

// const Url = "http://localhost:3000";
var Url = "https://vue-test-render.onrender.com";
var viewCreateTitle = document.querySelector("#view-create-title");
var viewCreateContent = document.querySelector("#view-create-content");
var viewCreateImg = document.querySelector("#view-create-img");
var viewCreateBtn = document.querySelector(".view-create-btn");
if (viewCreateBtn) {
  viewCreateBtn.addEventListener("click", function (e) {
    var data = {
      title: viewCreateTitle.value,
      content: viewCreateContent.value,
      imgUrl: viewCreateImg.value
    };
    if (viewCreateTitle.value === "" || viewCreateContent.value === "" || viewCreateImg.value === "") {
      Swal.fire({
        icon: "warning",
        title: "有空欄位未填",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }
    axios.post("".concat(Url, "/views"), data).then(function (res) {
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "新增成功",
        showConfirmButton: false,
        timer: 1000
      });
      viewCreateTitle.value = "";
      viewCreateContent.value = "";
      viewCreateImg.value = "";
      setTimeout(function () {
        window.location.href = "./desk.html";
      }, 2000);
    })["catch"](function (error) {
      console.log(error);
    });
  });
}
"use strict";

var BaseUrl = "https://vuejs-travel-app.onrender.com";
var adminDeskTable = document.querySelector(".admin-desk-table");
function renderDeskTable(arr) {
  var str = "";
  arr.forEach(function (item) {
    str += "\n    <tr>\n      <th scope=\"row\">".concat(item.id, "</th>\n      <td>").concat(item.title, "</td>\n      <td>").concat(item.body, "</td>\n      <td>\n        <a href=\"#\" class=\"admin-view-remove-btn btn btn-outline-danger me-2\" data-id=").concat(item.id, ">\u522A\u9664</a>\n        <a href=\"./edit.html\" class=\"admin-view-edit-btn btn btn-outline-warning\" data-id=").concat(item.id, ">\u7DE8\u8F2F</a>\n      </td>\n    </tr>\n    ");
  });
  if (adminDeskTable) {
    adminDeskTable.innerHTML = str;
  }
}
function saveEditId() {
  var adminViewEditBtn = document.querySelectorAll(".admin-view-edit-btn");
  if (adminViewEditBtn) {
    adminViewEditBtn.forEach(function (item) {
      item.addEventListener("click", function (e) {
        var id = e.target.dataset.id;
        localStorage.setItem("adminViewID", id);
      });
    });
  }
}
function deleteViews() {
  var adminViewRemoveBtn = document.querySelectorAll(".admin-view-remove-btn");
  if (adminViewRemoveBtn) {
    adminViewRemoveBtn.forEach(function (item) {
      item.addEventListener("click", function (e) {
        var id = e.target.dataset.id;
        Swal.fire({
          title: "確定要刪除?",
          text: "即將刪除!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "取消",
          confirmButtonText: "確定"
        }).then(function (result) {
          if (result.isConfirmed) {
            axios["delete"]("".concat(BaseUrl, "/Views/").concat(id)).then(function () {
              localStorage.removeItem("adminViewID");
              adminInit();
            })["catch"](function (error) {
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
  axios.get("".concat(BaseUrl, "/Views")).then(function (res) {
    var data = res.data;
    renderDeskTable(data);
    saveEditId();
    deleteViews();
  })["catch"](function (error) {
    console.log(error);
  });
}
function adminInit() {
  getAdminViewsData();
}
adminInit();
"use strict";

var BaseUrl = "https://vuejs-travel-app.onrender.com";
var viewEditTitle = document.querySelector("#view-edit-title");
var viewEditContent = document.querySelector("#view-edit-content");
var viewEditImg = document.querySelector("#view-edit-img");
var viewEditBtn = document.querySelector(".view-edit-btn");
var id = localStorage.getItem("adminViewID");
function renderAdminEditData(data) {
  if (viewEditTitle) {
    viewEditTitle.value = data.title;
    viewEditContent.value = data.body;
    viewEditImg.value = data.imgUrl;
  }
}
function updateView() {
  var data = {
    title: viewEditTitle.value,
    body: viewEditContent.value,
    imgUrl: viewEditImg.value
  };
  if (viewEditTitle.value === "" || viewEditContent.value === "" || viewEditImg.value === "") {
    Swal.fire({
      icon: "warning",
      title: "有空欄位未填",
      showConfirmButton: false,
      timer: 1000
    });
    return;
  }
  axios.put("".concat(BaseUrl, "/Views/").concat(id), data).then(function (res) {
    Swal.fire({
      icon: "success",
      title: "編輯成功",
      showConfirmButton: false,
      timer: 1000
    });
    localStorage.removeItem("adminViewID");
    setTimeout(function () {
      window.location.href = "./desk.html";
    }, 2000);
  })["catch"](function (error) {
    console.log(error);
  });
}
function editView() {
  if (viewEditBtn) {
    viewEditBtn.addEventListener("click", function () {
      updateView();
    });
  }
}
function getAdminEditData() {
  axios.get("".concat(BaseUrl, "/Views/").concat(id)).then(function (res) {
    var data = res.data;
    renderAdminEditData(data);
  })["catch"](function (error) {
    console.log(error);
  });
}
function adminEditInit() {
  getAdminEditData();
  editView();
}
adminEditInit();
"use strict";

// const BaseUrl = `http://127.0.0.1:3000`
var BaseUrl = "https://vuejs-travel-app.onrender.com";
CheckLogin();
function CheckLogin() {
  var token = localStorage.getItem("token");
  var userId = localStorage.getItem("userId");
  var role = localStorage.getItem("role");
  var bookmark = document.querySelector(".bookmark");
  if (token) {
    if (haventLoginNav) {}
    if (bookmark) {}
  }
}
"use strict";

var BaseUrl = "https://vuejs-travel-app.onrender.com";
var bookmarkAddBtn = document.querySelector(".bookmark-add-btn");
var bookmarkRemoveBtn = document.querySelector(".bookmark-remove-btn");
var bookmarkStatus = document.querySelector(".bookmark-status");
var viewId = localStorage.getItem("viewId");
var userId = localStorage.getItem("userId");
function renderBookmarkList(arr) {
  var bookmarkList = document.querySelector(".bookmark-list");
  var str = "";
  arr.forEach(function (item) {
    str += "\n      <li class=\"col\">\n        <div class=\"card h-100 position-relative\">\n          <div class=\"card-img-top\">\n            <img src=".concat(item.view.imgUrl, " alt=\"\">\n          </div>\n          <div class=\"card-body d-flex flex-column p-4\">\n            <h2 class=\"card-title fw-bold mb-4\">").concat(item.view.title, "</h2>\n            <p class=\"card-text mb-20\">\n            ").concat(item.view.content, "\n            </p>\n            <a href=\"./view.html\" class=\"view-btn link-success card-link mt-auto ms-auto\" data-viewid=").concat(item.view.id, "\n              >\u5EF6\u4F38\u95B1\u8B80</a\n            >\n          </div>\n          <button type=\"button\" class=\"bookmark-tag btn btn-warning position-absolute end-0\" data-id=").concat(item.id, ">\u5DF2\u6536\u85CF</button>\n        </div>\n      </li>\n  ");
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
  var viewDetail = document.querySelector(".view-detail");
  var str = "";
  arr.forEach(function (item) {
    var viewId = localStorage.getItem("viewId");
    if (item.id === +viewId) {
      str += "\n      <h1>".concat(item.title, "</h1>\n      <p class=\"mb-8\">").concat(item.content, "</p>\n      <img src=").concat(item.imgUrl, " alt=\"\" />\n      ");
    }
  });
  if (viewDetail) {
    viewDetail.innerHTML = str;
  }
}
function getViewDetailData() {
  axios.get("".concat(BaseUrl, "/Views")).then(function (res) {
    var data = res.data;
    renderViewDetail(data);
    return axios.get("".concat(BaseUrl, "/user/").concat(userId, "/bookmarks?_expand=view"));
  }).then(function (res) {
    var data = res.data;
    renderBookmarkList(data);
    removeListBookmark();
    data.forEach(function (item) {
      if (item.viewId === viewId) {
        bookMarkAdded();
      }
    });
  })["catch"](function (error) {
    console.log(error);
  });
}
if (bookmarkAddBtn) {
  bookmarkAddBtn.addEventListener("click", function (e) {
    e.preventDefault();
    bookMarkAdded();
    var data = {
      viewId: viewId,
      userId: userId
    };
    axios.post("".concat(BaseUrl, "/bookmarks"), data).then(function (res) {
      console.log(res.data);
    })["catch"](function (error) {
      console.log(error);
    });
  });
}
function removeBookmark() {
  axios.get("".concat(BaseUrl, "/user/").concat(userId, "/bookmarks")).then(function (res) {
    console.log(res.data);
    var data = res.data;
    var thisId = 0;
    data.forEach(function (item) {
      if (item.viewId === viewId) {
        thisId = item.id;
      }
    });
    return axios["delete"]("".concat(BaseUrl, "/bookmarks/").concat(thisId));
  }).then(function (res) {
    console.log(res.data);
  })["catch"](function (error) {
    console.log(error);
  });
}
if (bookmarkRemoveBtn) {
  bookmarkRemoveBtn.addEventListener("click", function (e) {
    e.preventDefault();
    bookmarkRemoved();
    removeBookmark();
  });
}
function removeListBookmark() {
  var bookmarkTag = document.querySelectorAll(".bookmark-tag");
  if (bookmarkTag) {
    bookmarkTag.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        var id = e.target.dataset.id;
        console.log(id);
        axios["delete"]("".concat(BaseUrl, "/bookmarks/").concat(id)).then(function (res) {
          console.log(res.data);
          viewDetailInit();
        })["catch"](function (error) {
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
"use strict";

// const Url = "http://localhost:3000";
var Url = "https://vue-test-render.onrender.com";
function renderView(arr) {
  var viewList = document.querySelector(".view-list");
  var str = "";
  arr.forEach(function (item) {
    str += "\n      <li class=\"col\">\n        <div class=\"card h-100\">\n          <div class=\"card-img-top\">\n            <img src=".concat(item.imgUrl, " alt=\"\">\n          </div>\n          <div class=\"card-body d-flex flex-column p-4\">\n            <h2 class=\"card-title fw-bold mb-4\">").concat(item.title, "</h2>\n            <p class=\"card-text mb-20\">\n            ").concat(item.content, "\n            </p>\n            <a href=\"./view.html\" class=\"view-btn link-success card-link stretched-link mt-auto ms-auto\" data-viewid=").concat(item.id, "\n              >\u5EF6\u4F38\u95B1\u8B80</a\n            >\n          </div>\n        </div>\n      </li>\n  ");
  });
  if (viewList) {
    viewList.innerHTML = str;
  }
}
function getViewId() {
  var viewBtn = document.querySelectorAll(".view-btn");
  viewBtn.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var viewId = e.target.dataset.viewid;
      localStorage.setItem("viewId", viewId);
    });
  });
}
function getViewData() {
  axios.get("".concat(Url, "/views")).then(function (res) {
    var data = res.data;
    renderView(data);
    getViewId();
    // renderViewDetail(data);
  })["catch"](function (error) {
    console.log(error);
  });
}
function viewInit() {
  getViewData();
}
viewInit();
"use strict";

var loginEmail = document.querySelector("#login-email");
var loginPwd = document.querySelector("#login-password");
var loginBtn = document.querySelector(".login-btn");
var loginForm = document.querySelector(".login-form");
function login() {
  var data = {
    email: loginEmail.value,
    password: loginPwd.value
  };
  axios.post("".concat(BaseUrl, "/login"), data).then(function (res) {
    console.log(res.data);
    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("userId", res.data.user.id);
    localStorage.setItem("role", res.data.user.role);
    Swal.fire({
      icon: "success",
      title: "登入成功",
      showConfirmButton: false,
      timer: 1000
    });
    setTimeout(function () {
      if (localStorage.getItem("role") === "admin") {
        window.location.href = "./desk.html";
      } else {
        window.location.href = "./index.html";
      }
    }, 1500);
  })["catch"](function (error) {
    console.log(error);
    Swal.fire({
      icon: "warning",
      title: error.response.data,
      showConfirmButton: false,
      timer: 1500
    });
  });
}
if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    login();
  });
}
if (loginForm) {
  loginForm.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      login();
    }
  });
}
var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var role = localStorage.getItem("role");
var haventLoginNav = document.querySelector(".havent-login-nav");
var haveLoginNav = document.querySelector(".have-login-nav");
var adminPanelBtn = document.querySelector(".admin-panel-btn");
var bookmark = document.querySelector(".bookmark");
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
var logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "已登出",
      showConfirmButton: false,
      timer: 1000
    });
    setTimeout(function () {
      window.location.href = "./index.html";
    }, 1500);
  });
}
"use strict";

// const Url = "http://localhost:3000";
var Url = "https://vue-test-render.onrender.com";
var registerEmail = document.querySelector("#register-email");
var registerPwd = document.querySelector("#register-password");
var registerBtn = document.querySelector(".register-btn");
var registerForm = document.querySelector(".register-form");
function signUp() {
  var data = {
    email: registerEmail.value,
    password: registerPwd.value,
    role: "user"
  };
  axios.post("".concat(Url, "/register"), data).then(function (res) {
    console.log(res.data);
    Swal.fire({
      icon: "success",
      title: "註冊成功",
      showConfirmButton: false,
      timer: 1000
    });
    setTimeout(function () {
      window.location.href = "./login.html";
    }, 1500);
  })["catch"](function (error) {
    console.log(error);
    Swal.fire({
      icon: "warning",
      title: error.response.data,
      showConfirmButton: false,
      timer: 1500
    });
  });
}
if (registerBtn) {
  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signUp();
  });
}
if (registerForm) {
  registerForm.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      signUp();
    }
  });
}
"use strict";

$(function () {});
//# sourceMappingURL=all.js.map
