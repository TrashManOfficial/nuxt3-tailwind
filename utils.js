const getAssetsFile = (url) => {
  console.log('111',new URL(`./assets/images/${url}.png`, import.meta.url).href, url);
  return new URL(`~/assets/images/${url}.png`, import.meta.url).href;
};

const replaceImgPath = (str) => {
  const reg = new RegExp("_600");
  return str.replace(reg, "");
};

const timeFormat = (dateStr) => {
  if (!dateStr) {
    return "";
  }
  const date = new Date(timeStringHandler(dateStr));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hour = date.getHours();
  // const minute = date.getMinutes();
  // const second = date.getSeconds();

  // 使用正则表达式检查日期格式是否为'yyyy-MM-dd'
  const dateString = `${year}-${month}-${day}`;
  const regEx = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;
  if (regEx.test(dateString)) {
    return dateString; // 如果不符合格式，则返回false
  } else {
    return "";
  }
  // return dateString;
};

const timeStringHandler = (timeStr) => {
  var regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
  var resArr = regex.exec(timeStr); // 匹配到 "2023-04-11T02:20:20.888+0000" 这种格式时间

  if (Array.isArray(resArr) && resArr.length) {
    var year = resArr[1],
      month = resArr[2],
      day = resArr[3],
      hour = resArr[4],
      minute = resArr[5],
      second = resArr[6];

    var newT =
      year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second; // 加上8个小时

    newT = new Date(newT).getTime() + 8 * 3600 * 1000; // console.log(new Date(newT).toLocaleString());

    return newT;
  } // 返回原来的
  return timeStr;
};

const jump = (data, router, flag) => {
  const { metaInfo } = data;
  let params = {};
  let path = "";
  if (metaInfo.docType === 8) {
    window.open(metaInfo.linkDoc, "_blank");
    return;
  }
  if (metaInfo.docType === 4) {
    window.open(metaInfo.linkDoc, "_blank");
    return;
  }
  if (metaInfo.docType === 3) {
    path = "special";
    // const groupid = data.metaInfo.specialDoc.groups[0].groupId;
    const { docId } = data;
    params = {
      // groupid,
      docid: docId,
    };
    const herf = router.resolve({
      name: path,
      query: params,
    });
    if (flag.value) {
      window.open(herf.href, "_blank");
    } else {
      window.location.href = `https://www.xkb.com.cn/fundhtml/#/specialdoc?id=${data.id}`;
    }
  } else {
    path = "detail";
    params = {
      id: data.id || data.docId,
    };
    const herf = router.resolve({
      name: path,
      query: params,
    });
    if (flag.value) {
      window.open(herf.href, "_blank");
    } else {
      window.location.href = `https://www.xkb.com.cn/fundhtml/#/details?id=${data.id}`;
    }
  }
  // const herf = router.resolve({
  //   name: path,
  //   query: params,
  // });
  // if (flag.value) {
  //   window.open(herf.href, "_blank");
  // } else {
  //   window.location.href = `https://app.xkb.com.cn/fundhtml/#/details?id=${data.id}`;
  // }
};

function splitAndMergeArray(arr, len, index) {
  // 按照指定长度将数组分成前半段和后半段
  const firstHalf = arr.slice(0, len);
  const secondHalf = arr.slice(len);

  if (index < len) {
    // 如果下标在前半段，则直接返回合并的数组
    return firstHalf.concat(secondHalf);
  } else {
    // 如果下标在后半段，则交换前半段末尾和指定下标所在位置
    const lastItem = firstHalf.pop();
    const indexInSecondHalf = index - len;
    if (indexInSecondHalf < secondHalf.length) {
      secondHalf[indexInSecondHalf] = lastItem;
    }
    firstHalf.push(arr[index]);
    return firstHalf.concat(secondHalf);
  }
}

export default {
  getAssetsFile,
  timeFormat,
  jump,
  replaceImgPath,
  splitAndMergeArray,
};
