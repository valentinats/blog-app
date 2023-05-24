const posts = [];

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const resultTitleNode = document.querySelector(".title__counter");
const resultNode = document.querySelector(".text__counter");
const newPostBtnNode = document.querySelector(".js-new-post-button");
const resetPostBtnNode = document.querySelector(".js-reset-post-button");
const postsNode = document.querySelector(".js-posts");

resetPostBtnNode.addEventListener("click", function () {
  clearInput();
  clearCounter();

  postTitleInputNode.style.borderColor = '#d5a8c0';
  resultTitleNode.style.color = '#d5a8c0';

  postTextInputNode.style.borderColor = '#d5a8c0';
  resultNode.style.color = '#d5a8c0';
});

newPostBtnNode.addEventListener("click", function () {
  const postFromUser = getPostFromUser();

  addPost(postFromUser); //присваиваем значение для post, которое ввел пользователь.

  renderPosts();
});

//получаем данные из поля ввода.
function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  
  //ООП. Присваиваем экземпляр объекта Date.
  const currentDate = new Date();
  const now = `${currentDate.getDate().toString().padStart(2, "0")}.${(currentDate.getMonth() + 1).toString().padStart(2, "0")}.${currentDate.getFullYear()}` + ',' + ' ' + `${currentDate.getHours().toString().padStart(2, "0")}` + ':' + `${currentDate.getMinutes().toString().padStart(2, "0")}`;

  if ((title, text === "")) {
    return;
  }

  clearInput();
  clearCounter();

  return {
    title: title,
    text: text,
    now: now,
  };
}

const clearInput = () => {
  postTitleInputNode.value = "";
  postTextInputNode.value = "";
};

const clearCounter = () => {
  const titleLimit = 100;
  const limit = 200;

  resultTitleNode.textContent = 0 + "/" + titleLimit;
  resultNode.textContent = 0 + "/" + limit;
}

//------------------------------ 

//подсчет вводимых символов в поле заголовка.
const titleLimit = 100;

resultTitleNode.textContent = 0 + '/' + titleLimit;
postTitleInputNode.addEventListener('input', function (event) {
  validation();
});

//подсчет вводимых символов в поле текста.
const limit = 200;

resultNode.textContent = 0 + '/' + limit;
postTextInputNode.addEventListener('input', function (event) {
  validation();
});

//Валидация ввода символов.

function validation() {
  const titleLimit = 100;
  const limit = 200;

  const titleLength = postTitleInputNode.value.length;
  const textLength = postTextInputNode.value.length;

  resultTitleNode.textContent = 0 + '/' + titleLimit;
  resultTitleNode.textContent = titleLength + '/' + titleLimit;

  resultNode.textContent = 0 + '/' + limit;
  resultNode.textContent = textLength + '/' + limit;

  if (titleLength > titleLimit) {
    postTitleInputNode.style.borderColor = '#E52B50';
    resultTitleNode.style.color = '#E52B50';
    newPostBtnNode.disabled = true;
    return;
  } else {
    postTitleInputNode.style.borderColor = '#d5a8c0';
    resultTitleNode.style.color = '#d5a8c0';
    newPostBtnNode.disabled = false;
  }

  if (textLength > limit) {
    postTextInputNode.style.borderColor = '#E52B50';
    resultNode.style.color = '#E52B50';
    newPostBtnNode.disabled = true;
    return;
  } else {
    postTextInputNode.style.borderColor = '#d5a8c0';
    resultNode.style.color = '#d5a8c0';
    newPostBtnNode.disabled = false;
  }
}

//------------------------------ 

//расширение input'а для заголовка.
function setTitleValue(postTitle) {
  const titlearea = document.getElementById("title");
  titlearea.style.height = 0;
  titlearea.value = postTitle;
  titlearea.style.height = titlearea.scrollHeight + "px";
}

//получаем DOM-элемент.
const titleareaHeight = document.getElementById("title");

//обработчики событий.
titleareaHeight.addEventListener("input", (event) => {
  titleareaHeight.style.height = 0;
  titleareaHeight.style.height = titleareaHeight.scrollHeight + "px";
})

//------------------------------ 

//расширение textarea.
function setValue(postTextarea) {
  const textarea = document.getElementById("text");
  textarea.style.height = 0;
  textarea.value = postTextarea;
  textarea.style.height = textarea.scrollHeight + "px";
}

//получаем DOM-элемент.
const textareaHeight = document.getElementById("text");

//обработчики событий.
textareaHeight.addEventListener("input", (event) => {
  textareaHeight.style.height = 0;
  textareaHeight.style.height = textareaHeight.scrollHeight + "px";
})

//------------------------------

//сохраняем пост. Операция добавления в массив posts.
function addPost({ title, text, now }) {
  posts.unshift({
    title: title,
    text: text,
    now: now,
  });
}

//получение и использование постов.
function getPosts() {
  return posts;
}

//отображаем пост.
function renderPosts() {
  const posts = getPosts();

  let postsHTML = "";

//обращаемся к переменной post.
  posts.forEach((post) => {
    postsHTML += `
    <div class='posts__cont'>
        <li class="post__item">
          <p class="post__title">${post.title}</p> 
          <p class="post__text">${post.text}</p>
          <p class="post__date">${post.now}</p>
        </li>
    </div>
  `;
  });

  postsNode.innerHTML = postsHTML;
}
