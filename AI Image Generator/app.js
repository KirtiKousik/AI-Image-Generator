const API_KEY = "YOUR_OPENAI_API_KEY";
const submitIcon = document.getElementById("submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".images-section");

const getImages = async () => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: inputElement.value,
      n: 4,
      size: "1024x1024",
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();

    data?.data.forEach((imageObject) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", imageObject.url);
      imageElement.setAttribute("alt", imageObject.name);
      imageContainer.append(imageElement);
      imageSection.append(imageContainer);
    });
  } catch (error) {
    console.log(error);
  }
};

submitIcon.addEventListener("click", getImages);

const handleKeyPress = (event) => {
  if (event.keyCode === 13 || event.which === 13) {
    getImages();
  }
};

inputElement.addEventListener("keypress", handleKeyPress);
