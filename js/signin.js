if (authHandle()) {
  alert("Jesteś już zalogowany: ");
  window.location.href = "../src/panel.html";
}

function processForm(formData) {
  console.log(formData.login);
  const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{10,}$/;
  const namePattern = /[a-zA-Z0-9]+/;
  if (3 <= formData.login.length <= 32) {
    if (!namePattern.test(formData.login)) {
      return false;
    }
  } else {
    return false;
  }
  if (10 <= formData.pass.length <= 32) {
    if (!passPattern.test(formData.pass)) {
      return false;
    }
  } else {
    return false;
  }
  if (formData.pass2) {
    if (10 <= formData.pass2.length <= 32) {
      if (!passPattern.test(formData.pass2)) {
        return false;
      } else {
        if (formData.pass !== formData.pass2) {
          $("#input-error").html("Hasła nie są jednakowe");
          return false;
        }
      }
    } else {
      return false;
    }
  }
  if (formData.date) {
    const today = new Date();
    const birthDate = new Date(formData.birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    console.log(age);
    if (age < 18) {
      $("#input-error").html(
        "Musisz być pełnoletni/a aby zarejestrować się na tej stronie",
      );
      return false;
    }
  }
  return true;
}

async function hashString(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

$("#register-form").submit(async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  if (processForm(data)) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    data.pass = await hashString(data.pass);
    if (users) {
      const user = users.find((u) => u.username === data.login);
      if (!user) {
        const user = users.find((u) => u.email === data.email);
        if (user) {
          console.log("Email taken");
          $("#input-error").html("Użytkownik o tym adresie email już istnieje");
          return;
        }
      } else {
        console.log("Username taken");
        $("#input-error").html("Ta nazwa użytkownika jest już zajęta");
        return;
      }
    }
    users.push({
      email: data.email,
      username: data.login,
      password: data.pass,
      dateOfBirth: data.date,
      tos: data.TOS,
      privacyPolicy: data.privacyPolicy,
    });
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("auth", data.login);
    window.location.href = "../src/panel.html";
  }
});

$("#login-form").submit(async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  if (processForm(data)) {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      $("#input-error").html(
        "Nazwa użytkownika lub hasło są nieprawidłowe. Popraw dane i spróbuj ponownie.",
      );
      console.error("Database empty");
      return;
    }

    const user = users.find((u) => u.username === data.login);
    if (!user) {
      $("#input-error").html(
        "Nazwa użytkownika lub hasło jest nieprawidłowe. Popraw dane i spróbuj ponownie.",
      );
      console.error("Account name not found");
      return;
    }

    const hash = await hashString(data.pass);
    if (hash === user.password) {
      console.log("wth");
      sessionStorage.setItem("auth", data.login);
      window.location.href = "../src/panel.html";
    } else {
      console.log("wtf");
      $("#input-error").html(
        "Nazwa użytkownika lub hasło jest nieprawidłowe. Popraw dane i spróbuj ponownie.",
      );
    }
  }
});

$("#reset-form").submit(async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  if (processForm(data)) {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      $("#input-error").html(
        "Nie znaleziono użytkownika o tej nazwie. Popraw dane i spróbuj ponownie",
      );
      console.error("Database empty");
      return;
    }

    const user = users.find((u) => u.username === data.login);
    if (!user) {
      $("#input-error").html(
        "Nie znaleziono użytkownika o tej nazwie. Popraw dane i spróbuj ponownie.",
      );
      console.error("Account name not found");
      return;
    }

    const hash = await hashString(data.pass);
    let index = users.findIndex((u) => u.username === data.login);
    user.password = hash;
    let updatedJson = JSON.stringify(users, null, index);
    localStorage.setItem("users", updatedJson);
    window.location.href = "../src/login.html";
  }
});
