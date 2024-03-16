const $form = document.querySelector("form");
const $textInput = document.getElementById("textInput");
const $dateInput = document.getElementById("dateInput");
const $addressInput = document.getElementById("addressInput");
const $tasks = document.getElementById("tasks");
const $add = document.getElementById("add");

const $msg = document.getElementById("msg"); // 메시지

const $searchInput = document.getElementById("searchInput"); // 검색
const $file = document.getElementById("imgInput"); // 이미지
const $img = document.querySelector(".img");

// 로딩 애니메이션 생성
const createLoadingAnimation = () => {
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading";
  $form.appendChild(loadingDiv);
};

// 로딩 애니메이션 제거
let removeLoadingAnimation = () => {
  const loadingDiv = document.querySelector(".loading");
  $form.removeChild(loadingDiv);
};
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  createLoadingAnimation();
  setTimeout(formValidation, 1000);
});

/* 유효성 검사 */
let formValidation = () => {
  removeLoadingAnimation(); // 유효성 검사 시작 전 로딩 애니메이션 제거
  if ($textInput.value === "") {
    console.log("failure");
    $msg.innerHTML = "입력해주세요";
  } else {
    console.log("success");
    successData();

    $add.setAttribute("data-bs-dismiss", "modal"); // 유효성 검사 성공 시 모달 창 닫히는 속성 추가
    $add.click(); // "data-bs-dismiss=modal"에 연결된 모달 창 닫히는 역할

    // 폼 유효성 검사 후에 모달 창 닫히는 설정 제거
    $add.removeAttribute("data-bs-dismiss");
  }
};

let data = [{}];

let successData = () => {
  data.push({
    text: $textInput.value,
    date: $dateInput.value,
    address: $addressInput.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

/* 목록 생성 */
let createTasks = () => {
  $tasks.innerHTML = "";
  data.map((x, y) => {
    return ($tasks.innerHTML += /* html */ `
        <div id=${y} class='contentBundle'>
          <span class='profile' >${x.text}</span>
          <span class='small text-secondary'>${x.date}</span>
          <span>${x.address}</span>
          <span class='options'>
            <span
            onClick="editTasks(this)"
            data-bs-toggle="modal"
            data-bs-target="#form"
            class="material-symbols-outlined"
            >
            edit
          </span>
          <span
          onClick="deleteTasks(this)"
          class="material-symbols-outlined"
          >
                delete
              </span>
            </span>
          </div>
          `);
  });

  resetForm();
};

/* 검색 기능 */
$searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".contentBundle");
  tasks.forEach((task) => {
    const taskText = task.children[0].textContent.toLowerCase();
    if (taskText.includes(value)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
});

/* 삭제 기능 */
let deleteTasks = (e) => {
  if (confirm("삭제 하시겠습니까?")) {
    // e.parentElement.parentElement.remove();

    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
  }
};

/* 수정 기능 */
let editTasks = (e) => {
  let selectedTask = e.parentElement.parentElement;
  $textInput.value = selectedTask.children[0].innerHTML;
  $dateInput.value = selectedTask.children[1].innerHTML;
  $addressInput.value = selectedTask.children[2].innerHTML;

  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  // selectedTask.remove();
};

/* 폼 초기화 */
let resetForm = () => {
  $textInput.value = "";
  $dateInput.value = "";
  $addressInput.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();
