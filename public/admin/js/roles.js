console.log("roles.js loaded");
// Permissions
const tablePermissions = document.querySelector("table[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");

    // console.log(rows);
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      // console.log(name);

      const inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          // console.log(name);
          // console.log(index);
          // console.log(checked);
          // console.log("-------------");

          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });

    console.log(permissions);
    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector(
        "#form-change-permissions",
      );

      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']",
      );
      inputPermissions.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
}
//   enMDA Permissions

// Permissions data table
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  console.log(records);

  const tablePermissions = document.querySelector("table[table-permissions]");

  records.forEach((records, index) => {
    const permissions = records.permissions;

    permissions.forEach((permission) => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const inputs = row.querySelectorAll("input")[index];

      inputs.checked = true;
      // console.log(permission);
      // console.log(index);
    });
    // console.log("-------------");
  });
}

// End Permissions data table
