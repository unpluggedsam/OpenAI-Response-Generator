// Function to make API request
async function fetchOpenAICompletions(prompt, jsonParameter, maxTokens) {
    // Load config from JSON file
    const configResponse = await fetch("config.json");
    const config = await configResponse.json();
    const apiKey = config.apiKey;
    
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
    
    const response = await fetch("https://api.openai.com/v1/completions", requestOptions);
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    
    const data = await response.json();
    return data.choices[0].text.trim();
  }
  