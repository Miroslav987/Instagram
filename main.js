const API = "http://localhost:8000/post";

// ? Сохранение тегов в переменные

// Кнопка для выведение блока добавление
let newPost = document.getElementById("newpost");
// инпуты и кнопки для создания новых данных
let blocknewPost = document.getElementById("block_newPost");
let inpCategory = document.querySelector(".Inptext");
let inpUrl = document.querySelector(".Inpimg");
let btnAdd = document.getElementById("btn_add");
let closePost = document.getElementById("closePost");
// Окно постов
let postall = document.querySelector(".post_all");

// инпуты и кнопки для редактирования
let inpEditCategory = document.querySelector(".edit_category");
let inpEditUrl = document.querySelector(".edit_url");
let btnEditSave = document.querySelector(".edit_btn-save");
let mainModal = document.querySelector(".edit-block");
let btnEditClose = document.querySelector(".edit_close");

//  инпут и переменная для поиска
let inpSearch = document.querySelector(".inp_serch");
let searchValue = inpSearch.value;

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
  if (!inpCategory.value.trim() || !inpUrl.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let obj = {
    category: inpCategory.value,
    urlImg: inpUrl.value,
  };
  createProduct(obj);
  inpCategory.value = "";
  inpUrl.value = "";
  blocknewPost.style.display = "none";
});
// ? =========== Create End =============
// // ! ============ Read Start ============
function readPost() {
  fetch(`${API}?q=${searchValue}&_limit=${currentPage}`)
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
}

readPost();
// ? ============ Read End ============

// ! ============ Delete Start ===========

function deleteProduct(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => readPost());
}
// ? ============ Delete End ===========

// ! =============== Edit Sart ===========
function editPost(id, editedObj) {
  // проверка на заполненность полей
  if (!inpEditCategory.value.trim() || !inpEditUrl.value.trim()) {
    alert("Заполните поле");
    return;
  }
  fetch(`${API}/${id}`, {
    method: "PATCH", // PUT - меняет объект целиком. PATCH - меняет только те ключи, которые нужны
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedObj),
  }).then(() => readPost());
}

let editId = "";
function handleEditBtn(id) {
  mainModal.style.display = "flex";
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(productObj => {
      inpEditCategory.value = productObj.category;
      inpEditUrl.value = productObj.urlImg;
      editId = productObj.id;
    });
}

btnEditClose.addEventListener("click", () => {
  mainModal.style.display = "none";
  console.log(1);
});

btnEditSave.addEventListener("click", () => {
  let editedObj = {
    category: inpEditCategory.value,
    urlImg: inpEditUrl.value,
  };
  editPost(editId, editedObj);
  mainModal.style.display = "none";
});
// ? =============== Edit End ===========

// ! ============ Search Start ==========
inpSearch.addEventListener("input", e => {
  searchValue = e.target.value;
  readPost();
});
// ? ============ Search End ==========

// ! ========== Paginate Start =========

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readPost();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= 100) return;
  currentPage++;
  readPost();
});
// ? ========== Paginate End ==========
