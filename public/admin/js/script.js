//  lọc trạng thái
const buttonStatus = document.querySelectorAll("[button-status]");
// console.log(ButtonStatus);
let url = new URL(window.location.href);
if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      // console.log(url.href);
      window.location.href = url.href;
    });
  });
}

//  tìm sản phẩm
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.elements.keyword.value);
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//  tìm sản phẩm   END

// Pagination : phân trang
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

// END Pagination : phân trang

//Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  // console.log(showAlert);
  const time = parseInt(showAlert.getAttribute("data-time"));

  const closeAlert = showAlert.querySelector("[close-alert]");
  console.log(closeAlert);
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

//END Show Alert

// --Upload ảnh
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// -- End up

// --SORT
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  sortSelect.addEventListener("change", (e) => {
    // e.preventDefault();
    // console.log(e.target.value);
    const value = e.target.value;
    // console.log(value.split("-"));
    const [sortKey, sortValue] = value.split("-");
    console.log(sortKey);
    console.log(sortValue);
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  });
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });
  // theem select
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if (sortKey && sortValue) {
    const stringSelect = `${sortKey}-${sortValue}`;
    // console.log(stringSelect);
    const optionSelected = sortSelect.querySelector(
      `option[value='${stringSelect}']`
    );
    // console.log(optionSelected);
    optionSelected.selected = true;
  }
}
// -- END SORT
