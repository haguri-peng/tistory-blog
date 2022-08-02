var getCategory;

$(function () {
  getCategory = function () {
    var categoryList = [];
    var categoryHtml = `[##_category_list_##]`
      .replace(/\t/g, '')
      .replace(/\n/g, '');
    $(categoryHtml)
      .find('ul.category_list>li')
      .each(function (idx, item) {
        var cntText = $(this).find('a>span').text();
        var menuNm = $(this).find('a').text().replace(cntText, '');
        var contentCnt = cntText.replace(/\(/g, '').replace(/\)/g, '');
        var objCategory = {
          menuNm: menuNm,
          contentCnt: contentCnt,
          link: $(this).find('a').attr('href'),
          newFlag: $(this).find('img').length > 0 ? true : false,
        };
        categoryList.push(objCategory);
      });
    return categoryList;
  };
});
