const $form = document.querySelector("form");
const $textInput = document.getElementById("textInput");
const $dateInput = document.getElementById("dateInput");
const $addressInput = document.getElementById("addressInput");
const $tasks = document.getElementById("tasks");
const $add = document.getElementById("add");

// 메시지 출력
const $msg = document.getElementById("msg");

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

let data = {};

const successData = () => {
  data["text"] = $textInput.value;
  data["date"] = $dateInput.value;
  data["address"] = $addressInput.value;
  createTasks();
};

/* 목록 생성 */
let createTasks = () => {
  $tasks.innerHTML += /* html */ `
        <div>
          <span class=''>${data.text}</span>
          <span class='small text-secondary'>${data.date}</span>
          <span>${data.address}</span>
          <span class='options'>
            <a>편집</a>
            <a>삭제</a>
          </span>
        </div>
  `;
  resetForm();
};

/* 폼 초기화 */
const resetForm = () => {
  $textInput.value = "";
  $dateInput.value = "";
  $addressInput.value = "";
  $msg.innerHTML = "";
  $textInput.focus(); // $textInput에 포커스 주기
};
