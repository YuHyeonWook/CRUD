const $form = document.querySelector("form");
const $textInput = document.getElementById("textInput");
const $dateInput = document.getElementById("dateInput");
const $addressInput = document.getElementById("addressInput");
const $tasks = document.getElementById("tasks");
const $add = document.getElementById("add");

// 메시지
const $msg = document.getElementById("msg");
// 검색
const $searchInput = document.getElementById("searchInput");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

/* 유효성 검사 */
const formValidation = () => {
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

const data = {};

const successData = () => {
  data["text"] = $textInput.value;
  data["date"] = $dateInput.value;
  data["address"] = $addressInput.value;
  createTasks();
};

/* 목록 생성 */
const createTasks = () => {
  $tasks.innerHTML += /* html */ `
        <div class='contentBundle'>
            <span >${data.text}</span>
            <span class='small text-secondary'>${data.date}</span>
            <span>${data.address}</span>
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
  `;
  resetForm();
};

/* 검색 기능*/
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
const deleteTasks = (e) => {
  e.parentElement.parentElement.remove();
};

/* 수정 기능 */
const editTasks = (e) => {
  let selectedTask = e.parentElement.parentElement;
  $textInput.value = selectedTask.children[0].innerHTML;
  $dateInput.value = selectedTask.children[1].innerHTML;
  $addressInput.value = selectedTask.children[2].innerHTML;

  selectedTask.remove();
};

/* 폼 초기화 */
const resetForm = () => {
  $textInput.value = "";
  $dateInput.value = "";
  $addressInput.value = "";
};
