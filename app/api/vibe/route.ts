import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Sistem Rate Limiter In-Memory (Proteksi Bot/Spam)
const rateLimitMap = new Map<string, { count: number; startTime: number }>();
const MAX_REQUESTS = 5; // Maksimal 5 kali request
const WINDOW_MS = 60 * 1000; // Dalam 1 menit (60 detik)

export async function POST(request: Request) {
  try {
    // Ambil IP pengunjung dari header (didukung oleh Netlify)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const now = Date.now();

    // Logika Rate Limiter
    if (rateLimitMap.has(ip)) {
      const data = rateLimitMap.get(ip)!;
      if (now - data.startTime > WINDOW_MS) {
        // Reset jika sudah lewat 1 menit
        rateLimitMap.set(ip, { count: 1, startTime: now });
      } else {
        data.count++;
        if (data.count > MAX_REQUESTS) {
          return Response.json(
            { error: "Tunggu sebentar! Anda terlalu cepat. Coba lagi dalam 1 menit." },
            { status: 429 }
          );
        }
      }
    } else {
      rateLimitMap.set(ip, { count: 1, startTime: now });
    }

    const body = await request.json();
    const { text, vibe, language = "Indonesia" } = body;

    if (!text || !vibe) {
      return Response.json({ error: 'Text and vibe are required' }, { status: 400 });
    }

    const prompt = `Kamu adalah asisten komunikasi ahli. Tugasmu adalah mengubah draf pesan kasar dari pengguna menjadi pesan yang terstruktur dengan nada bicara: ${vibe}, dan terjemahkan hasilnya secara natural ke dalam bahasa: ${language}. Pertahankan makna dan tujuan asli pesan, namun perbaiki tata bahasa, tingkat kesopanan, dan profesionalismenya. Berikan HANYA teks hasilnya saja dalam bahasa ${language}, tanpa basa-basi, tanpa pembuka/penutup, tanpa tanda kutip ekstra, atau penjelasan tambahan.\n\nPesan kasar: ${text}`;

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
