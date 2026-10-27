async function loadContent(src, target) {
  console.log("load");
  try {
    const response = await fetch(src);
    const str = await response.text();
    $(target).html(str);
  } catch (error) {
    console.error("Error while loading content: ", error);
  }
}

function dropdown(BoxID, ButtonID) {
  const Box = document.getElementById(BoxID);
  const Button = document.getElementById(ButtonID);

  Button.addEventListener("click", () => {
    Box.classList.toggle("hidden");
  });
}
