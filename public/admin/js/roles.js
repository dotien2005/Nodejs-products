console.log("roles.js loaded");
// Permissions
const tablePermissions = document.querySelector("table[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", () => {
    let Permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    console.log(rows);
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");

      console.log(name);
    });
  });
}
//   enMDA Permissions
