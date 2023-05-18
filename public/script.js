let maxTokens = 100;
let stopGenerationFlag = false;

function updateMaxTokens() {
    const maxTokensInput = document.getElementById("max-tokens");
    maxTokens = parseInt(maxTokensInput.value);
    document.getElementById("max-tokens-value").textContent = maxTokens;
}

function generatePrompt() {
    const apiKey = "YOUR_API_KEY";
    const promptInput = document.getElementById("prompt");
    const parameterInput = document.getElementById("parameter");
    const responseElement = document.getElementById("response");

    const prompt = promptInput.value;
    const parameter = parameterInput.value;

    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: maxTokens
        })
    };

    responseElement.innerText = ""; // Clear previous response
    document.getElementById("loader").style.display = "block"; // Show loader

    stopGenerationFlag = false;

    fetch("https://api.openai.com/v1/completions", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Request failed with status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const text = data.choices[0].text.trim();
            typeOutResponse(text, responseElement);
        })
        .catch(error => {
            responseElement.innerText = "Error: " + error;
        });
}

function typeOutResponse(text, element) {
    const charsPerSecond = 30; // Adjust the typing speed (characters per second)
    const delay = 1000 / charsPerSecond;
  
    const words = text.split(" "); // Split the text into an array of words
    let currentIndex = 0;
  
    const intervalId = setInterval(() => {
      if (stopGenerationFlag) {
        clearInterval(intervalId);
        document.getElementById("loader").style.display = "none"; // Hide loader
        return;
      }
  
      element.innerText += words[currentIndex] + " "; // Add the current word to the element
  
      currentIndex++;
  
      if (currentIndex >= words.length) {
        clearInterval(intervalId);
        element.style.height = "auto"; // Expand the response container
        document.getElementById("loader").style.display = "none"; // Hide loader
      }
    }, delay);
  }
  

function stopGeneration() {
    stopGenerationFlag = true;
}

// Update maxTokens value when the input changes
const maxTokensInput = document.getElementById("max-tokens");
maxTokensInput.addEventListener("input", updateMaxTokens);

// Set initial maxTokens value
updateMaxTokens();

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

