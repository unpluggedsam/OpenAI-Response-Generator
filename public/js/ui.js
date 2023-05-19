// Function to update the response element
function updateResponse(text) {
    const responseElement = document.getElementById("response");
    responseElement.innerText = text;
  }
  
  // Function to show the loader
  function showLoader() {
    const loaderElement = document.getElementById("loader");
    loaderElement.style.display = "inline-block";
  }
  
  // Function to hide the loader
  function hideLoader() {
    const loaderElement = document.getElementById("loader");
    loaderElement.style.display = "none";
  }
  