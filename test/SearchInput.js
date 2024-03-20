/* 검색 기능 */
$searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const rows = document.querySelectorAll("#tasks tr");
  rows.forEach((row) => {
    const userName = row.children[1].textContent.toLowerCase();
    if (userName.includes(value)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
