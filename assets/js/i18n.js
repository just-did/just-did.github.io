/* just-did portal — 语言切换 + 移动端导航 */
(function () {
  "use strict";

  var STORAGE_KEY = "just-did-lang";

  function currentLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    return saved === "en" ? "en" : "zh";
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    var nodes = document.querySelectorAll("[data-zh]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var text = lang === "en" ? n.getAttribute("data-en") : n.getAttribute("data-zh");
      if (text !== null) n.textContent = text;
    }
    var toggles = document.querySelectorAll("[data-lang-btn]");
    for (var j = 0; j < toggles.length; j++) {
      toggles[j].classList.toggle("active", toggles[j].getAttribute("data-lang-btn") === lang);
    }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyLang(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(currentLang());

    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var k = 0; k < btns.length; k++) {
      btns[k].addEventListener("click", function () {
        setLang(this.getAttribute("data-lang-btn"));
      });
    }

    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
      });
    }
  });
})();
