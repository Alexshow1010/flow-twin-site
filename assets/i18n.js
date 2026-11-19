(function () {
  var SUPPORTED = ["zh-Hant", "zh-Hans", "ja", "ko", "en"];

  function detectLang() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get("lang");
    if (q && SUPPORTED.indexOf(q) !== -1) return q;
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("zh-hant") !== -1 || nav.indexOf("zh-tw") !== -1 || nav.indexOf("zh-hk") !== -1) return "zh-Hant";
    if (nav.indexOf("zh") !== -1) return "zh-Hans";
    if (nav.indexOf("ja") !== -1) return "ja";
    if (nav.indexOf("ko") !== -1) return "ko";
    return "en";
  }

  window.setFlowTwinLang = function (lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";
    document.documentElement.lang = lang;
    var blocks = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].style.display = blocks[i].getAttribute("data-lang") === lang ? "block" : "none";
    }
    var btns = document.querySelectorAll(".lang-btn");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle("active", btns[j].getAttribute("data-set-lang") === lang);
    }
    var links = document.querySelectorAll("a[data-keep-lang]");
    for (var k = 0; k < links.length; k++) {
      var base = links[k].getAttribute("data-base-href");
      links[k].setAttribute("href", base + "?lang=" + encodeURIComponent(lang));
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    window.setFlowTwinLang(detectLang());
  });
})();
