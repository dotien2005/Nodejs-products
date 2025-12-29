//  cập nhật status
// console.log("Change Status Product Page");
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  // console.log("Path change status: ", path);
  buttonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";
      console.log(statusCurrent, id);
      console.log("Change status to ", statusChange);
      // cập nhât action cho form
      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}

// -- checkbox multi khi click
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  // console.log(checkboxMulti);
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  // console.log(inputCheckAll);
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
  // console.log(inputCheckBox);
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      // đếm số lượng tick
      const countCheck = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      // console.log(countCheck);
      if (countCheck == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

// --Dùng để áp dụng thay đổi cho nhiều sp --

const formChangeMulti = document.querySelector("[form-change-multi]");
// console.log(formChangeMulti);
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e);
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    // console.log(inputsChecked);
    // Xóa nhiều sản phẩm
    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("bạn chắc chắn muốn xóa");
      if (!isConfirm) {
        return;
      }
    }
    // end xoas nhieeuf

    // --cập nhật trạng thái
    if (inputsChecked.length > 0) {
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      let ids = [];
      inputsChecked.forEach((input) => {
        const id = input.value;
        // thay đổi vị trí
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          // console.log(`${id}-${position}`);
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      console.log(ids.join(", "));
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("chưa tíck giá trị");
      // alert("chuaw tick");
    }
  });
}

//  Phần xóa sản phẩm : deltete
const buttonDelete = document.querySelectorAll("[data-delete]");
// console.log(buttonDelete);
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#delete-item");
  const pathDelete = formDeleteItem.getAttribute("data-path");
  buttonDelete.forEach((item) => {
    // console.log(item);
    item.addEventListener("click", () => {
      const isConfirm = confirm("bạn chắc chắn xóa vĩnh viễn");
      if (isConfirm) {
        console.log("đã xóa");
        const id = item.getAttribute("data-id");
        console.log(id);
        // console.log(pathDelete);
        const action = `${pathDelete}/${id}?_method=DELETE`;
        console.log(action);
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//--END  Phần xóa sản phẩm : deltete
