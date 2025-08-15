const searchInput = document.getElementById("inp");
var url;

function run() {
  url = "https://duckduckgo.com/?q=" + document.getElementById("inp").value;
  window.location = url;
}

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    run();
    event.preventDefault(); // Prevent form submission if within a form
  }
});
