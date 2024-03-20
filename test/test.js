const $form = document.querySelector("form");
const $userName = document.getElementById("textInput");
const $dateInput = document.getElementById("dateInput");
const $addressInput = document.getElementById("addressInput");
const $tasks = document.getElementById("tasks");
const $add = document.getElementById("add");
const $cancel = document.getElementById("cancel");
const $MsgUsername = document.getElementById("MsgUsername");
const $MsgDate = document.getElementById("MsgDate");
const $MsgAddress = document.getElementById("MsgAddress");
const $searchInput = document.getElementById("searchInput");
const $file = document.getElementById("imgInput");
const $img = document.querySelector(".img");

/* 사진 편집 */
$file.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    $img.src = reader.result;
    data[data.length].image = reader.result; // 데이터 객체에 이미지 데이터 추가
    localStorage.setItem("data", JSON.stringify(data));
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// /* 로딩 애니메이션 생성 */
// const createLoadingAnimation = () => {
//   const loadingDiv = document.createElement("div");
//   loadingDiv.className = "loading";
//   $form.appendChild(loadingDiv);
// };

// // 로딩 애니메이션 제거
// let removeLoadingAnimation = () => {
//   const loadingDiv = document.querySelector(".loading");
//   $form.removeChild(loadingDiv);
// };

/* 모달 제출 */
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  // createLoadingAnimation();
  formValidation();
});

/* 유효성 검사 */
let formValidation = () => {
  // removeLoadingAnimation(); // 유효성 검사 시작 전 로딩 애니메이션 제거
  $MsgUsername.textContent = "";
  $MsgDate.textContent = "";
  $MsgAddress.textContent = "";

  if ($userName.value === "") {
    $MsgUsername.textContent = "이름을 입력해주세요.";
  } else if ($dateInput.value === "") {
    $MsgDate.textContent = "생년월일을 입력해주세요.";
  } else if ($addressInput.value === "") {
    $MsgAddress.textContent = "주소를 입력해주세요.";
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
    image: $img.src, // 이미지 데이터 추가
    userName: $userName.value, //
    date: $dateInput.value,
    address: $addressInput.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

/* 목록 생성 */
let createTasks = () => {
  const tasksBody = document.getElementById("tasks");
  tasksBody.innerHTML = ""; // 기존 테이블 내용 초기화
  $img.src = ""; // 이미지 초기화

  data.map((x, y) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${x.image}" alt="Preview" width="100" height="100">
      </td>
      <td class="align-middle">${x.userName}</td>
      <td class="align-middle">${x.date}</td>
      <td class="align-middle">${x.address}</td>
      <td class="align-middle">
      <span onClick="userProfile(this, ${y})" style="font-size: 2rem" class="material-symbols-outlined"> data_loss_prevention </span>
        <span onClick="editTasks(this, ${y})" style="font-size: 2rem" data-bs-toggle="modal" data-bs-target="#form" class="material-symbols-outlined">edit</span>
        <span onClick="deleteTasks(this, ${y})" style="font-size: 2rem" class="material-symbols-outlined">delete</span>
        </td>
    `;
    tasksBody.appendChild(row);
  });

  resetForm();
};

/* 삭제 기능 */
let deleteTasks = (e, index) => {
  if (confirm("삭제 하시겠습니까?")) {
    e.parentElement.parentElement.remove();
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
  }
};

/* 수정 기능 */
let editTasks = (e, index) => {
  $img.src = data[index].image || "";
  $userName.value = data[index].userName;
  $dateInput.value = data[index].date;
  $addressInput.value = data[index].address;

  data.splice(index, 1); // 기존 데이터 삭제
  localStorage.setItem("data", JSON.stringify(data));
};

/* 폼 초기화 */
let resetForm = () => {
  $userName.value = "";
  $dateInput.value = "";
  $addressInput.value = "";
  $img.src = "";
};

// 취소 버튼 클릭 이벤트 리스너 추가
$cancel.addEventListener("click", () => {
  resetForm();
});

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();
