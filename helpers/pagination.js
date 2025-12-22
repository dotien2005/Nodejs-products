module.exports = (objeactPagination, query, countProduct) => {
  if (query.page) {
    objeactPagination.currentPage = parseInt(query.page);
  }
  objeactPagination.skip =
    (objeactPagination.currentPage - 1) * objeactPagination.limitItem;
  // console.log(objeactPagination.currentPage);

  // đếm sản phẩm trong db
  const totalPage = countProduct / objeactPagination.limitItem;
  objeactPagination.totalPage = Math.ceil(totalPage);
  return objeactPagination;
};
