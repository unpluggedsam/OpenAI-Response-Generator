let maxTokens = 100;
let stopGenerationFlag = false;

function updateMaxTokens() {
    const maxTokensInput = document.getElementById("max-tokens");
    maxTokens = parseInt(maxTokensInput.value);
    document.getElementById("max-tokens-value").textContent = maxTokens;
}

function generatePrompt() {
    document.getElementById("loader").style.display = "inline-block"; // Show loader
    const apiKey = "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";
    const promptInput = document.getElementById("prompt");
    const jsonParameterInput = document.getElementById("json-parameter");
    const responseElement = document.getElementById("response");
    const loaderElement = document.getElementById("loader");

    const prompt = promptInput.value;
    const jsonParameter = jsonParameterInput.value;

    const completePrompt = jsonParameter + " " + prompt;

    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: completePrompt,
            max_tokens: maxTokens
        })
    };

    responseElement.innerText = ""; // Clear previous response
    loaderElement.style.display = "block"; // Show loader

    stopGenerationFlag = false;

    fetch("https://api.openai.com/v1/completions", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Request failed with status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const generatedResponse = data.choices[0].text.trim();
            typeOutResponse(generatedResponse, responseElement);
        })
        .catch(error => {
            responseElement.innerText = "Error: " + error;
        })
        .finally(() => {
            loaderElement.style.display = "none"; // Hide loader
        });
}

function typeOutResponse(text, element) {
    document.getElementById("loader").style.display = "none"; // Hide loader
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
    document.getElementById("loader").style.display = "none"; // Hide loader
}

// Update maxTokens value when the input changes
const maxTokensInput = document.getElementById("max-tokens");
maxTokensInput.addEventListener("input", updateMaxTokens);

// Set initial maxTokens value
updateMaxTokens();
