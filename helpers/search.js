module.exports = (query) => {
  let objeactSearch = {
    keyword: "",
  };

  // 2 Tìm kiếm theo từ khóa nếu có
  // let keyword = "";
  if (query.keyword) {
    objeactSearch.keyword = query.keyword;
    const regex = new RegExp(objeactSearch.keyword, "i"); // 'i' for case-insensitive
    objeactSearch.title = regex;
  }
  return objeactSearch;
};
