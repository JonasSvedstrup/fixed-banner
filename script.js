var banner = document.getElementById("fixedBanner");
var expandElement = document.getElementById("expandedContent");

function show() {
  console.log("show");
  expandElement.style.display = "block";
}
function hide() {
  console.log("hide");
  expandElement.style.display = "none";
}

function getDocHeight() {
  var e = window,
    o = document,
    t = o.documentElement,
    i = o.getElementsByTagName("body")[0];
  return Math.max(
    Math.max(o.body.scrollHeight, o.documentElement.scrollHeight),
    Math.max(o.body.offsetHeight, o.documentElement.offsetHeight),
    Math.max(o.body.clientHeight, o.documentElement.clientHeight),
    e.innerHeight || t.clientHeight || i.clientHeight
  );
}

function getWinHeight() {
  var e = window,
    o = document,
    t = o.documentElement,
    o = o.getElementsByTagName("body")[0];
  return e.innerHeight || t.clientHeight || o.clientHeight;
}

function setFixedBanner() {
  console.log("setFixedBanner");
  debug();

  var top = getWinHeight() - banner.offsetHeight;

  banner.style.position = "fixed";
  banner.style.top = top + "px";
}

function addEventListenerResize() {
  window.addEventListener
    ? (window.addEventListener(
        "resize",
        function () {
          beginSetFixedBanner();
        },
        !1
      ),
      window.addEventListener(
        "orientationchange",
        function () {
          beginSetFixedBanner();
        },
        !1
      ))
    : (window.attachEvent("onresize", function () {
        beginSetFixedBanner();
      }),
      window.attachEvent("orientationchange", function () {
        beginSetFixedBanner();
      }));
}
function addEventListenerScroll() {
  window.addEventListener
    ? window.addEventListener("scroll", beginSetFixedBanner, !1)
    : window.attachEvent("onscroll", beginSetFixedBanner);
}
function addEventListenerClick() {
  document
    .getElementById("showButton")
    .addEventListener("click", beginSetFixedBanner);
  document
    .getElementById("hideButton")
    .addEventListener("click", beginSetFixedBanner);
}

// https://gist.github.com/peduarte/7ee475dd0fae1940f857582ecbb9dc5f
function debounce(func) {
  var wait =
    arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

  var timeout = void 0;
  return function () {
    var _this = this;

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(_this, args);
    }, wait);
  };
}

var beginSetFixedBanner = debounce(setFixedBanner, 500);

addEventListenerResize();
addEventListenerScroll();
addEventListenerClick();
setFixedBanner();

function debug() {
  console.log({
    "banner.offsetHeight": banner.offsetHeight,
    getDocHeight: getDocHeight(),
    getWinHeight: getWinHeight(),
    top: getWinHeight() - banner.offsetHeight,
  });
}
