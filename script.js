document.addEventListener("DOMContentLoaded", () => {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      let currentScene = data.start;

      function displayScene() {
        const sceneData = data.scenes[currentScene];

        const dialoguesDiv = document.getElementById("dialogues");
        const choicesDiv = document.getElementById("choices");

        const dialogueDiv = document.createElement("div");
        dialogueDiv.textContent = `[${sceneData.role}]: ${sceneData.scene}`;
        dialogueDiv.classList.add(sceneData.role);
        dialoguesDiv.appendChild(dialogueDiv);

        choicesDiv.innerHTML = "";

        sceneData.choices.forEach((choice, index) => {
          const choiceButton = document.createElement("button");
          choiceButton.textContent = choice.option;
          choiceButton.classList.add("button");
          choiceButton.addEventListener("click", () => {
            const choiceDiv = document.createElement("div");
            console.log(sceneData.choices[index].public);
            choiceDiv.textContent = sceneData.choices[index].option;
            choiceDiv.classList.add("choice");
            dialoguesDiv.appendChild(choiceDiv);
            sceneData.choices.forEach((c, i) => {
              const button = choicesDiv.children[i];
              button.textContent = `${c.option} (${c.public}%)`;
            });

            setTimeout(() => {
              currentScene = sceneData.next[index];
              displayScene();
            }, 2000);
          });

          choicesDiv.appendChild(choiceButton);
        });

        dialoguesDiv.scrollTop = dialoguesDiv.scrollHeight;
        choicesDiv.scrollTop = choicesDiv.scrollHeight;
      }

      displayScene();
    });
});

function changeScene(sceneKey) {
  const scene = data.scenes[sceneKey];
  const dialoguesDiv = document.getElementById("dialogues");
  const choicesDiv = document.getElementById("choices");

  // Create a new div for each dialogue and append it
  const dialogueDiv = document.createElement("div");
  dialogueDiv.textContent = scene.scene;
  dialoguesDiv.appendChild(dialogueDiv);

  // Clear old choices
  choicesDiv.innerHTML = "";

  scene.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice.option;
    button.onclick = () => changeScene(scene.next[index]);
    choicesDiv.appendChild(button);
  });

  // Scroll to the bottom
  dialoguesDiv.scrollTop = dialoguesDiv.scrollHeight;
  choicesDiv.scrollTop = choicesDiv.scrollHeight;
}
