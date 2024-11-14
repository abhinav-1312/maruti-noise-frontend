function displayFileName() {
  const fileInput = document.getElementById("file-upload");
  const fileUploadLabel = document.getElementById("file-upload-label");
  const fileNameDisplay = document.getElementById("file-name");
  const submitButton = document.getElementById("submit-btn");

  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
    submitButton.style.display = "block";
    fileUploadLabel.style.display = "none";
  } else {
    fileNameDisplay.textContent = "";
    submitButton.disabled = true;
  }
}

async function submitFile(event) {
  event.preventDefault();
    document.getElementById("before-response").style.display="block"
    document.getElementById("after-response").style.display="none"
  document.getElementById("before-response").innerHTML = "<h2> Generating results. Please wait... </h2>"
  const fileInput = document.getElementById("file-upload");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    // Send the audio file to the backend
    const response = await fetch(
      "https://maruti-noise-test.onrender.com/predict/",
      {
        method: "POST",
        body: formData,
      }
    );

    // Check if the response is okay
    if (!response.ok) throw new Error("Failed to upload audio");

    // Parse and display the response JSON data
    const result = await response.json();

    document.getElementById("before-response").style.display="none"
    document.getElementById("after-response").style.display="block"

    // Display each field in the response-container
    document.getElementById("training-accuracy").innerText =
      result.training_accuracy;
    document.getElementById("validation-accuracy").innerText =
      result.validation_accuracy;
    document.getElementById("probability").innerText = result.probability;
    document.getElementById("remark").innerText = result.remark;
  } catch (error) {
    console.error(error);
    document.getElementById("response-container").innerText =
      "Error uploading audio.";
  }
}
