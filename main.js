const API = "http://localhost:8000/post";

// ? Сохранение тегов в переменные

// Кнопка для выведение блока добавление
let newPost = document.getElementById("newpost");
// инпуты и кнопки для создания новых данных
let blocknewPost = document.getElementById("block_newPost");
let inpDetails = document.querySelector(".Inptext");
let inpUrl = document.querySelector(".Inpimg");
let btnAdd = document.getElementById("btn_add");
let closePost = document.getElementById("closePost");
// Окно постов
let postall = document.querySelector(".post_all");

// инпуты и кнопки для редактирования
let inpEditDetails = document.querySelector(".edit_details");
let inpEditUrl = document.querySelector(".edit_url");
let btnEditSave = document.querySelector(".edit_btn-save");
let mainModal = document.querySelector(".edit-block");
let btnEditClose = document.querySelector(".edit_close");

//  инпут и переменная для поиска
// let inpSearch = document.querySelector(".search-txt");
// let searchValue = inpSearch.value;

// кнопки для пагинации
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let currentPage = 1;

// Кнопка для выведение блока добавление
newPost.addEventListener("click", () => {
  blocknewPost.style.display = "flex";
  console.log(1);
});

closePost.addEventListener("click", () => {
  blocknewPost.style.display = "none";
});

// clickAdmin.addEventListener("click", () => {
//   code = prompt("Введите кодовое слово:");
//   adminReturn();
// });

// ! =========== Create Start ===========
function createProduct(obj) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => readProducts());
}

btnAdd.addEventListener("click", () => {
  // проверка на заполненность полей
  if (!inpDetails.value.trim() || !inpUrl.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let obj = {
    details: inpDetails.value,
    urlImg: inpUrl.value,
  };
  createProduct(obj);
  inpDetails.value = "";
  inpUrl.value = "";
  blocknewPost.style.display = "none";
});
// ? =========== Create End =============
// // ! ============ Read Start ============
function readProducts() {
  fetch(`${API}`)
    .then(res => res.json())
    .then(data => {
      postall.innerHTML = "";
      data.forEach(post => {
        postall.innerHTML += `
        <div id="insta_post">
          <img
            class="photo_post"
            src="${post.urlImg}"
            alt=""
          />
          <div class="icon">
          <button onclick = "deleteProduct(${post.id})" >Удалить</button>
    <button onclick = "handleEditBtn(${post.id})">Изменить</button>
            <img src="./img/Like.svg" alt="" />
            <img src="./img/Comments.svg" alt="" />
            <img src="./img/Repost.svg" alt="" />
          </div>
        </div>
        `;
      });
    });
  pageTotal();
}

readProducts();
// ? ============ Read End ============

// ! ============ Delete Start ===========
// todo вариант 1 для удаления
// document.addEventListener("click", (e) => {
//   let del_class = [...e.target.classList];
//   if (del_class[0] === "read__del") {
//     console.log(e.target.id);
//     fetch(`${API}/${e.target.id}`, {
//       method: "DELETE",
//     }).then(() => readProducts());
//   }
// });

// todo вариант 2 для удаления
function deleteProduct(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => readProducts());
}
// ? ============ Delete End ===========

// ! =============== Edit Sart ===========
function editProduct(id, editedObj) {
  // проверка на заполненность полей
  if (!inpEditDetails.value.trim() || !inpEditUrl.value.trim()) {
    alert("Заполните поле");
    return;
  }
  fetch(`${API}/${id}`, {
    method: "PATCH", // PUT - меняет объект целиком. PATCH - меняет только те ключи, которые нужны
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedObj),
  }).then(() => readProducts());
}

let editId = "";
function handleEditBtn(id) {
  mainModal.style.display = "flex";
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(productObj => {
      inpEditDetails.value = productObj.details;
      inpEditUrl.value = productObj.urlImg;
      editId = productObj.id;
    });
}

btnEditClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnEditSave.addEventListener("click", () => {
  let editedObj = {
    details: inpEditDetails.value,
    urlImg: inpEditUrl.value,
  };
  editProduct(editId, editedObj);
  mainModal.style.display = "none";
});
// ? =============== Edit End ===========

// ! ============ Search Start ==========
inpSearch.addEventListener("input", e => {
  searchValue = e.target.value;
  readProducts();
});
// ? ============ Search End ==========

// ! ========== Paginate Start =========
let countPage = 1;
function pageTotal() {
  fetch(`${API}?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
      countPage = Math.ceil(data.length / 6);
    });
}

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readProducts();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  readProducts();
});
// ? ========== Paginate End ==========

// ! ========Filter Start =======
form.addEventListener("change", e => {
  // console.log(e.target.value);
  category = e.target.value;
  readProducts();
});
// ? ========Filter End =======
