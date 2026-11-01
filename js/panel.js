if (!authHandle()) {
  window.location.href = "../login.html";
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
  loadContent("../snippet/resources.html", "#panel-right");
});

$("#file-button").click(() => {
  loadContent("../snippet/filemanager.html", "#panel-right");
});
