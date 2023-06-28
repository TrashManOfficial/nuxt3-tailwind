// if (process.client) {
//   /*
//    ** 百度统计
//    */
//   var _hmt = _hmt || [];
//   (function () {
//     var hm = document.createElement("script");
//     hm.src = "https://hm.baidu.com/hm.js?1924177ad2e7e7298da96b4846fdf1d4";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
//   })();
// }

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?1924177ad2e7e7298da96b4846fdf1d4";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    (function (b, a, e, h, f, c, g, s) {
      b[h] =
        b[h] ||
        function () {
          (b[h].c = b[h].c || []).push(arguments);
        };
      b[h].s = !!c;
      g = a.getElementsByTagName(e)[0];
      s = a.createElement(e);
      s.src = "//s.union.360.cn/" + f + ".js";
      s.defer = !0;
      s.async = !0;
      g.parentNode.insertBefore(s, g);
    })(window, document, "script", "_qha", 486570, false);
    
    (function (b, a, e, h, f, c, g, s) {
      b[h] =
        b[h] ||
        function () {
          (b[h].c = b[h].c || []).push(arguments);
        };
      b[h].s = !!c;
      g = a.getElementsByTagName(e)[0];
      s = a.createElement(e);
      s.src = "//s.union.360.cn/" + f + ".js";
      s.defer = !0;
      s.async = !0;
      g.parentNode.insertBefore(s, g);
    })(window, document, "script", "_qha", 511832, false)

    // (function () {
    //   var src = "https://s.ssl.qhres2.com/ssl/ab77b6ea7f3fbf79.js";
    //   document.write('<script src="' + src + '" id="sozz"><\/script>');
    // })();
  }
})
