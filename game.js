/* Section Switching */
function showSection(id) {
  document.querySelectorAll("main section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* Quiz Answers */
function checkAnswer(type, ans) {
  let feedback = "";
  if (type === "eq") feedback = (ans === 'b') ? "✅ Correct: Hide under sturdy furniture." : "❌ Incorrect.";
  if (type === "fl") feedback = (ans === 'a') ? "✅ Correct: Avoid flood waters." : "❌ Incorrect.";
  if (type === "fi") feedback = (ans === 'b') ? "✅ Correct: Stop, Drop, and Roll." : "❌ Incorrect.";
  document.getElementById(type + "-feedback").innerText = feedback;
}

/* Start Simulation */
function startSimulation(type) {
  if (type === 'earthquake') {
    document.querySelector('#earthquake .game-box button').style.display = 'none';
    document.getElementById('earthquake-sim').style.display = 'block';
    runSim('quakeCanvas', 'green');
  }
  if (type === 'flood') {
    document.querySelector('#flood .game-box button').style.display = 'none';
    document.getElementById('flood-sim').style.display = 'block';
    runSim('floodCanvas', 'blue');
  }
  if (type === 'fire') {
    document.querySelector('#fire .game-box button').style.display = 'none';
    document.getElementById('fire-sim').style.display = 'block';
    runSim('fireCanvas', 'orange');
  }
}

/* Core Simulation Function */
function runSim(canvasId, safeColor) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  let x = 50, y = 200, safeZoneX = 400;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 30, 30); // player
    ctx.fillStyle = safeColor;
    ctx.fillRect(safeZoneX, y, 40, 40); // safe zone
  }

  function move(e) {
    if (e.key === "ArrowRight") x += 10;
    if (x > safeZoneX) {
      alert("✅ You reached the safe zone! Drill complete.");
      document.removeEventListener("keydown", move);
    }
    draw();
  }

  document.addEventListener("keydown", move);
  draw();
}
