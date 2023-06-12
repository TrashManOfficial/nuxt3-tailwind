const getAssetsFile = (url) => {
  console.log('111',new URL(`./assets/images/${url}.png`, import.meta.url).href, url);
  return new URL(`~/assets/images/${url}.png`, import.meta.url).href;
};

const replaceImgPath = (str) => {
  const reg = new RegExp("_600");
  if (str) {
    return str.replace(reg, "");  
  }
  return
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
    // window.open(metaInfo.linkDoc, "_blank");
  }
  if (metaInfo.docType === 4) {
    // window.open(metaInfo.linkDoc, "_blank");
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
      // return herf.href
    } else {
      window.location.href = `https://www.xkb.com.cn/fundhtml/#/specialdoc?id=${data.id}`;
    }
  } else {
    path = "detail";
    const originalUrl = metaInfo.shareUrl
    const originalId = originalUrl.split('?id=')[1]
    params = {
      id: originalId || data.docId,
    };
    const herf = router.resolve({
      name: path,
      query: params,
    });
    if (flag.value) {
      window.open(herf.href, "_blank");
      // console.log(herf.href);
      // return herf.href
    } else {
      window.location.href = `https://www.xkb.com.cn/fundhtml/#/details?id=${data.id}`;
    }
  }
};

const renderLink = (data, router, flag) => {
  const { metaInfo } = data;
  let params = {};
  let path = "";
  if (metaInfo.docType === 8) {
    // window.open(metaInfo.linkDoc, "_blank");
    return metaInfo.linkDoc;
  }
  if (metaInfo.docType === 4) {
    // window.open(metaInfo.linkDoc, "_blank");
    return metaInfo.linkDoc;
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
    return herf.href
    // if (flag.value) {
    //   // window.open(herf.href, "_blank");
    //   return herf.href
    // } else {
    //   return `https://www.xkb.com.cn/fundhtml/#/specialdoc?id=${data.id}`
    //   // window.location.href = `https://www.xkb.com.cn/fundhtml/#/specialdoc?id=${data.id}`;
    // }
  } else {
    path = "detail";
    const originalUrl = metaInfo.shareUrl
    const originalId = originalUrl.split('?id=')[1]
    params = {
      id: originalId || data.docId,
    };
    const herf = router.resolve({
      name: path,
      query: params,
    });
    return herf.href
    // if (flag.value) {
    //   // window.open(herf.href, "_blank");
    //   return herf.href
    // } else {
    //   // window.location.href = `https://www.xkb.com.cn/fundhtml/#/details?id=${data.id}`;
    //   return `https://www.xkb.com.cn/fundhtml/#/details?id=${data.id}`;
    // }
  }
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

function mergeDuplicateItems(list) {
  // 创建一个对象用于存储每个标题对应的合并项
  const mergedItems = {};

  // 遍历列表中的每一项
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const title = item.listTitle;

    // 如果标题在 mergedItems 中已存在，则将当前项合并到已存在的项中
    if (mergedItems.hasOwnProperty(title)) {
      mergedItems[title].count += item.count;
      // 可根据实际需求进行其他属性的合并操作
    } else {
      // 如果标题不存在于 mergedItems 中，则将当前项作为新的合并项
      mergedItems[title] = { ...item };
    }
  }

  // 将合并后的项从 mergedItems 对象中提取为一个新的数组
  const mergedList = Object.values(mergedItems);

  return mergedList;
}


export default {
  getAssetsFile,
  timeFormat,
  jump,
  replaceImgPath,
  splitAndMergeArray,
  renderLink,
  mergeDuplicateItems
};
