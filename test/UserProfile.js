const $profileModal = document.getElementById("profileModal");

/* 유저 프로필 기능 */
function userProfile(e) {
  const row = e.parentElement.parentElement;
  const image = row.children[0].children[0].src;
  const userName = row.children[1].textContent;
  const date = row.children[2].textContent;
  const address = row.children[3].textContent;

  // 프로필 모달에 데이터 채우기
  $profileModal.querySelector(".img").src = image;
  $profileModal.querySelector("#textInput").value = userName;
  $profileModal.querySelector("#dateInput").value = date;
  $profileModal.querySelector("#addressInput").value = address;

  // 프로필 모달 열기
  const profileModal = new bootstrap.Modal($profileModal);
  profileModal.show();
}
