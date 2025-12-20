module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  // Cập nhật class active cho filterStatus
  if (query.status) {
    const indexStatus = filterStatus.findIndex(
      (item) => item.status == query.status
    );
    // console.log(indexStatus);
    filterStatus[indexStatus].class = "active";
  } else {
    const indexStatus = filterStatus.findIndex((item) => item.status == "");
    // console.log(indexStatus);
    filterStatus[indexStatus].class = "active";
  }

  return filterStatus;
};
