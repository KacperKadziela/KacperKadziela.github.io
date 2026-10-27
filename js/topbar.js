loadContent("../src/snippet/topbar.html", "#topbar").then(() => {
  dropdown("topbar-menu-box", "topbar-menu-button");
  dropdown("topbar-account-box", "topbar-account-button");
  $("#topbar-account-buttons").html(
    '<button class="topbar-account-button" id="signup-redirect">Zarejestruj się</button><button id="signin-redirect" class="topbar-account-button">Zaloguj się</button>',
  );
  $("#signup-redirect").click(() => {
    window.location.href = "../src/register.html";
  });
  $("#signin-redirect").click(() => {
    window.location.href = "../src/login.html";
  });
});
