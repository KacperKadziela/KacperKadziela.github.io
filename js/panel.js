if (!authHandle()) {
  window.location.href = "../src/login.html";
  alert("Musisz być zalogowany/a");
}
$("#console-button").click(() => {
  $("#panel-right").html(
    '<div class="terminal-out-wrapper"><div id="terminal"></div></div>',
  );
  $(function () {
    $("#terminal").terminal(
      {},
      {
        greetings: "Witaj " + sessionStorage.getItem("auth"),
        name: "",
        state: false,
        history: false,
        historyStorage: false,
        checkArity: false,
        onInit: function (term) {
          for (let key in localStorage) {
            if (key.includes("_interpreters")) {
              localStorage.removeItem(key);
            }
          }
        },
      },
    );
  });
});

$("#resource-button").click(() => {
  loadContent("../src/snippet/resources.html", "#panel-right");
});

$("#file-button").click(() => {
  loadContent("../src/snippet/filemanager.html", "#panel-right");
});
