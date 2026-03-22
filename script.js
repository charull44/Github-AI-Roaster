async function roastUser() {
  const username = document.getElementById("username").value;

  if (!username) return alert("Enter username!");

  const res = await fetch(`https://api.github.com/users/${username}`);
  const user = await res.json();

  if (user.message === "Not Found") {
    alert("User not found!");
    return;
  }

  document.getElementById("avatar").src = user.avatar_url;
  document.getElementById("name").innerText = user.login;
  document.getElementById("stats").innerText =
    `Repos: ${user.public_repos} | Followers: ${user.followers}`;

  // SCORE
  let score = user.public_repos * 2 + user.followers * 2;
  score = Math.min(score, 100);

  document.getElementById("score").innerText = score + "/100";
  document.getElementById("progress").style.width = score + "%";

  // ROAST
  let roast = "";
  if (user.public_repos < 5)
    roast += "💀 Very few repos\n";
  if (user.followers < 10)
    roast += "😭 No followers\n";
  if (!user.bio)
    roast += "🤖 No bio\n";

  if (roast === "") roast = "😎 Pretty solid profile";

  document.getElementById("roast").innerText = roast;

  // SUGGESTIONS
  let suggestions = [];

  if (user.public_repos < 5)
    suggestions.push("Create more projects");
  if (!user.bio)
    suggestions.push("Add a bio");
  if (user.followers < 10)
    suggestions.push("Be active");

  const list = document.getElementById("suggestions");
  list.innerHTML = "";

  suggestions.forEach(s => {
    const li = document.createElement("li");
    li.innerText = "👉 " + s;
    list.appendChild(li);
  });
}