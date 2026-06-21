/* 相続・空き家相談室 ― script.js */
(function () {
  "use strict";

  /* スマホ用ナビ開閉 */
  var header = document.getElementById("header");
  var toggle = document.getElementById("navToggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      header.classList.toggle("open");
    });
    header.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("open");
      });
    });
  }

  /* FAQ アコーディオン */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () {
      item.classList.toggle("open");
    });
  });

  /* スムーススクロール（固定ヘッダー分のオフセット補正） */
  var headerH = 64;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH + 1;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();

/* フォーム送信：入力内容をまとめてメール下書きを開く（静的サイト向け）
   ※ 自動送信が必要なら Formspree 等のフォームサービスをご利用ください。 */
var CONTACT_EMAIL = "fudosan.fujigaokas@gmail.com";
function handleSubmit(e) {
  e.preventDefault();
  var f = e.target;
  function val(name) { var el = f.elements[name]; return el ? (el.value || "") : ""; }
  function multi(name) {
    var nodes = f.querySelectorAll('input[name="' + name + '"]:checked');
    return Array.prototype.map.call(nodes, function (n) { return n.value; }).join("、");
  }
  var lines = [
    "お名前：" + val("name"),
    "電話番号：" + val("tel"),
    "メール：" + val("email"),
    "不動産の所在地：" + val("address"),
    "現在の状況：" + multi("status"),
    "建物の有無：" + val("building"),
    "荷物の有無：" + val("goods"),
    "相談したい内容：" + val("message"),
    "希望連絡方法：" + multi("contactway"),
    "希望連絡時間帯：" + val("time"),
    "添付予定資料：" + multi("docs")
  ];
  var body = encodeURIComponent(lines.join("\n"));
  var subject = encodeURIComponent("【相続・空き家相談室】お問い合わせ");
  window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
  return false;
}
