// Event listener for the generate button
document.getElementById("generate-button").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    const jsonParameter = document.getElementById("json-parameter").value;
    const maxTokens = parseInt(document.getElementById("max-tokens").value);
    
    // Show loader
    showLoader();
    
    try {
      const generatedResponse = await fetchOpenAICompletions(prompt, jsonParameter, maxTokens);
      
      // Update the response element
      updateResponse(generatedResponse);
    } catch (error) {
      console.error("Error:", error);
      updateResponse("Error: " + error.message);
    } finally {
      // Hide loader
      hideLoader();
    }
  });
  
  // Event listener for the stop button
  document.getElementById("stop-button").addEventListener("click", () => {
    // Hide loader
    hideLoader();
  });
  