loadContent("../src/snippet/topbar.html", "#topbar").then(() => {
  dropdown("topbar-menu-box", "topbar-menu-button");
  dropdown("topbar-account-box", "topbar-account-button");
  if (authHandle()) {
    $("#nameplate").html("Witaj " + sessionStorage.getItem("auth"));
    $("#topbar-account-buttons").html(
      '<button class="topbar-account-button" id="panel-redirect">Moje konto</button><button id="logout" class="topbar-account-button">Wyloguj się</button>',
    );
    $("#panel-redirect").click(() => {
      window.location.href = "../src/panel.html";
    });
    $("#logout").click(() => {
      sessionStorage.removeItem("auth");
      window.location.href = "../src/index.html";
    });
  } else {
    $("#topbar-account-buttons").html(
      '<button class="topbar-account-button" id="signup-redirect">Zarejestruj się</button><button id="signin-redirect" class="topbar-account-button">Zaloguj się</button>',
    );
    $("#signup-redirect").click(() => {
      window.location.href = "../src/register.html";
    });
    $("#signin-redirect").click(() => {
      window.location.href = "../src/login.html";
    });
  }
});
