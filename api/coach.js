// api/coach.js
export default async function handler(req, res) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY; // Clave oculta en Vercel

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: req.body.messages
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
