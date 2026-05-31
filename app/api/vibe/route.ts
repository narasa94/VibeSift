import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, vibe } = body;

    if (!text || !vibe) {
      return Response.json({ error: 'Text and vibe are required' }, { status: 400 });
    }

    const prompt = `Kamu adalah asisten komunikasi ahli. Tugasmu adalah mengubah draf pesan kasar dari pengguna menjadi pesan yang terstruktur dengan nada bicara: ${vibe}. Pertahankan makna dan tujuan asli pesan, namun perbaiki tata bahasa, tingkat kesopanan, dan profesionalismenya. Berikan HANYA teks hasilnya saja, tanpa basa-basi atau penjelasan tambahan.\n\nPesan kasar: ${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const resultText = response.text?.trim() || "Tidak ada hasil.";

    return Response.json({ result: resultText }, { status: 200 });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return Response.json({ error: 'Gagal memproses teks.' }, { status: 500 });
  }
}
