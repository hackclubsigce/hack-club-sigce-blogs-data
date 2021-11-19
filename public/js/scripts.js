
async function relatedPostRender(id, category) {
  let postStore = [];
  let relatedPostObj = await fetch("/js/json/content.json");
  let relatedPostJson = await relatedPostObj.json();
  let relatedPostContainer = document.getElementById('relatedPostContainer');
  for (let i = 0; i < relatedPostJson.items.length; i++) {
    if (relatedPostJson.items[i].id != id && relatedPostJson.items[i].category == category) {
      postStore.push(relatedPostJson.items[i]);
    }
  }
  if (postStore.length == 0) {
    relatedPostContainer.innerHTML = `<p class="text-center mt-4">Nothing To Show Here!</p>`;
  } else {
    for (let i = 0; i < postStore.length; i++) {
      relatedPostContainer.innerHTML += ` 
          <div class="card mb-4">
          <div id="${postStore[i].id}" name="${postStore[i].category}" onclick="mainBlog(this.id, this.name)" class="card-header text-center">${postStore[i].shortTitle}</div>
          <div class="card-body" style="padding: 10px 30px;">
          ${postStore[i].shortDesc}
          </div>
          </div>
          `
    }
  }
  let comment = document.getElementById('comment');
  comment.innerHTML = "";
}

let blogs = document.getElementById('blogs');
async function blogListRender() {
  let category = "";
  let page = window.location.pathname;

  switch (page) {
    case "/General/":
      category = "General";
      break;
    case "/Open-Source/":
      category = "Open-Source";
      break;
    case "/AI-ML/":
      category = "AI-ML";
      break;
    case "/Web-Dev/":
      category = "Web-Dev";
      break;
    case "/Android-Dev/":
      category = "Android-Dev";
      break;
  }
  let postObj = await fetch("/js/json/content.json");
  let postJson = await postObj.json();
  blogs.innerHTML = "";
  for (let i = 0; i < postJson.items.length; i++) {
    if (postJson.items[i].category == category) {
      blogs.innerHTML += `<div class="blogPost">
        <div class="blogTextContent">
        <div class="titleTags" >
        <div class="blogTitle">${postJson.items[i].shortTitle}</div>
        </div>
        <div class="blogDesc">${postJson.items[i].shortDesc}</div>
        </div>
        <div class="readMoreBtn">
        <button id="${postJson.items[i].id}" name="${postJson.items[i].category}" onclick="mainBlog(this.id, this.name)" class="readMore">Read More</button>
        </div>
        </div>`
    }
  }
  if (blogs.innerHTML.length == 0 && page != "/") {
    blogs.innerHTML = `<h3 class="text-center mt-5">Nothing To Show Here!</h3>`;
  }
}

async function homeRender() {
  let postObj = await fetch("/js/json/content.json");
  let postJson = await postObj.json();
  let blogs = document.getElementById('blogs');
  for (let i = 0; i < postJson.items.length; i++) {
    blogs.innerHTML += `<li class="blogPost"}">
        <div class="blogTextContent">
          <div class="titleTags" >
            <div class="blogTitle">${postJson.items[i].shortTitle}<span>${postJson.items[0].tags[0]}</span></div>
          </div>
          <div class="blogDesc">${postJson.items[i].shortDesc}</div>
        </div>
        <div class="readMoreBtn">
          <button id="${postJson.items[i].id}" name="${postJson.items[i].category}" onclick="mainBlog(this.id, this.name)" class="readMore">Read More</button>
        </div>
      </li>`
  }
}

async function mainBlog(id) {
  let postObj = await fetch("/js/json/content.json");
  let json = await postObj.json();
  let comments = document.getElementById('comments');
  let mainBlog = document.getElementById('mainBlog');
  mainBlog.style.display = "block";
  allblogs.style.display = "none";
  comments.style.display = "block";
  mainBlog.innerHTML = '';
  let category = "";
  for (let i = 0; i < json.items.length; i++) {
    if (json.items[i].id == id) {
      changeUrl(json.items[i].id);
      category = json.items[i].category;
      mainBlog.innerHTML = `
            <div class="container mt-5" style=" z-index: 1; position: inherit;">
      <div class="row">
        <div class="col-lg-8">
          <article>
            <header class="mb-4">
              <h1 class="fw-bolder mb-1">${json.items[i].shortTitle}</h1>
              <div class="text-muted fst-italic mb-2">
                Posted on ${json.items[i].date} by ${json.items[i].author}
              </div>
              <a class="badge bg-secondary text-decoration-none link-light" href="#!">${json.items[i].tags[0]}</a>
            </header>
            <div class="mb-4">
              <img class="img-fluid rounded" src="${json.items[i].img}" alt="" />
            </div>
            <section class="mb-5">
              ${json.items[i].blogContent}
              <div class="socialContainer mt-5">
                <div class="text-center socialLinks">
                  <a href="${json.items[i].github}" target="_blank" class="github">
                    <i class="socialHover fab fa-github"></i>
                    <p>${json.items[i].firstName}'s GitHub</p>
                  </a>
                  <a href="${json.items[i].linkedin}" target="_blank" class="linkedin">
                    <i class="socialHover fab fa-linkedin"></i>
                    <p>${json.items[i].firstName}'s Linkedin</p>
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
        <div class="col-lg-4">
          <div class="text-center fw-bolder mb-3">Related Posts <i onclick="blogTypeToggle()" class="closeWindow fas fa-times"></i></div>
          <div id="relatedPostContainer"></div>
        </div>
      </div>
    </div>
            `
    }
  }
  relatedPostRender(id, category);
}

blogListRender();

function blogTypeToggle() {
  let mainBlog = document.getElementById('mainBlog');
  let allblogs = document.getElementById('allblogs');
  allblogs.style.display = "block";
  let comments = document.getElementById('comments');
  comments.style.display = "none";
  mainBlog.style.display = "none";
  let path = window.location.pathname;
  switch (path) {
    case "/":
      window.location.href = "/";
      break;
    case "/General/":
      window.location.href = "/General/";
      break;
    case "/Open-Source/":
      window.location.href = "/Open-Source/";
      break;
    case "/AI-ML/":
      window.location.href = "/AI-ML/";
      break;
    case "/Web-Dev/":
      window.location.href = "/Web-Dev/";
      break;
    case "/Android-Dev/":
      window.location.href = "/Android-Dev/";
      break;
    default:
      break;
  }
}


function changeUrl(id) {
  history.pushState({ page: 1 }, "title 1", `?id=${id}`);
  getData();
}
function getContent() {
  let queryString = window.location.search;
  let urlParam = new URLSearchParams(queryString);
  let id = urlParam.get('id');
  displayBlog(id);
}
getContent();

function displayBlog(id) {
  if (id == null) {
    return;
  } else {
    mainBlog(id);
  }
}

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  backdrop: false
})


function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchBlogs');
  filter = input.value.toUpperCase();
  ul = document.getElementById("blogs");
  li = ul.getElementsByTagName('li');
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.children[0].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}