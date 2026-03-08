export default async function handler(req, res) {
  // --- CONFIGURACIÓN DE CORS (PERMISOS) ---
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite llamadas desde cualquier sitio
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Responder a la petición de "pre-vuelo" (browser check)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (req.method === 'POST') {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: req.body.messages,
          max_tokens: 60
        })
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error llamando a Groq", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}