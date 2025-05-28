// Buttons
const karakterButtons = document.querySelectorAll("#karakter button");
const filmButtons = document.querySelectorAll("#film button");
const favoriteButtons = document.querySelectorAll("#Favorite-Button");
const blacklistButtons = document.querySelectorAll("#Blacklist-Button");

function changeButtonColor(button) {
  button.classList.toggle("active");

  const parent = button.parentElement;
  const siblings = parent.querySelectorAll("button");
  siblings.forEach((sibling) => {
    if (sibling !== button) {
      sibling.classList.remove("active");
    }
  });
}
function changeImage(button) {
  document.getElementById("favBut").src = "/assets/white_heart.png";
}
function changeImage10(button) {
  document.getElementById("blackBut").src = "/assets/white_forbidden.png";
}

karakterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeButtonColor(button);
  });
});

filmButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeButtonColor(button);
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    changeImage(button);

    const quote = document.querySelector('blockquote').innerText;
    const selectedCharacterInput = document.querySelector('input[name="selectedCharacter"]:checked');
    if (!selectedCharacterInput) return alert("Selecteer eerst een karakter.");

    const characterLabel = selectedCharacterInput.nextElementSibling.textContent.trim();

    try {
      const res = await fetch('/favorites/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote, character: characterLabel }),
      });

      if (res.ok) {
        alert("Quote toegevoegd aan favorieten.");
      } else {
        alert("Fout bij toevoegen aan favorieten.");
      }
    } catch (error) {
      console.error("Error tijdens favorite toevoegen:", error);
    }
  });
});

blacklistButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    changeImage10(button);

    const quote = document.querySelector('blockquote').innerText;
    const selectedCharacterInput = document.querySelector('input[name="selectedCharacter"]:checked');
    if (!selectedCharacterInput) return alert("Selecteer eerst een karakter.");

    const characterLabel = selectedCharacterInput.nextElementSibling.textContent.trim();
    const reason = prompt("Waarom wil je deze quote blacklisten?");
    if (!reason) return;

    try {
      const res = await fetch('/blacklist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote, character: characterLabel, reason }),
      });

      if (res.ok) {
        alert("Quote toegevoegd aan blacklist.");
      } else {
        alert("Fout bij toevoegen aan blacklist.");
      }
    } catch (error) {
      console.error("Error tijdens blacklist toevoegen:", error);
    }
  });
});

// API
