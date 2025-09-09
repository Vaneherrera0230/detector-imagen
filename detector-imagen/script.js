// --- Vista previa de la imagen ---
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  preview.innerHTML = "";
  preview.appendChild(img);

  // Cargar modelo COCO-SSD y detectar objetos
  cocoSsd.load().then(model => {
    model.detect(img).then(predictions => {
      console.log("Predicciones:", predictions);
    });
  });
});

// --- Comentarios con análisis de sentimiento ---
const sentiment = new Sentiment();
const commentInput = document.getElementById("commentInput");
const sendBtn = document.getElementById("sendBtn");
const commentList = document.getElementById("commentList");

sendBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return;

  const result = sentiment.analyze(text);
  console.log("Análisis:", result);

  const li = document.createElement("li");
  li.textContent = `${text} (Puntaje: ${result.score})`;
  commentList.appendChild(li);

  commentInput.value = "";
});
