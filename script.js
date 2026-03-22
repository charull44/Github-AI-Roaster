const HF_TOKEN = "PASTE_YOUR_TOKEN_HERE";

async function roastUser() {
  const username = document.getElementById("username").value;

  if (!username) {
    alert("Enter username!");
    return;
  }

  const res = await fetch(`https://api.github.com/users/${username}`);
  const user = await res.json();

  if (user.message === "Not Found") {
    alert("User not found!");
    return;
  }

  document.getElementById("card").classList.remove("hidden");

  document.getElementById("avatar").src = user.avatar_url;
  document.getElementById("name").innerText = user.name || user.login;
  document.getElementById("stats").innerText =
    `Repos: ${user.public_repos} | Followers: ${user.followers}`;

  const roast = await generateAIroast(user);
  document.getElementById("roast").innerText = roast;
}

async function generateAIroast(user) {
  const prompt = `
Roast this GitHub user in a funny way:

Repos: ${user.public_repos}
Followers: ${user.followers}
Bio: ${user.bio}

Make it savage but funny.
`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  const data = await response.json();

  return data[0]?.generated_text || "AI is speechless 😭";
}

// 📸 Save screenshot
function download() {
  alert("Take screenshot & share 🔥 (Auto-download upgrade next level)");
}