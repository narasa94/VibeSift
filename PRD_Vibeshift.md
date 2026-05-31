# Product Requirements Document (PRD): VibeShift

## 1. Project Overview
**Nama Aplikasi:** VibeShift
**Deskripsi Singkat:** Aplikasi web sederhana berbasis AI yang berfungsi sebagai penerjemah "nada bicara" (*tone of voice*). Mengubah draf teks kasar/emosional menjadi pesan profesional atau kasual sesuai pilihan pengguna.
**Tujuan:** Menyelesaikan masalah *decision fatigue* dan miskomunikasi saat mengirim pesan. Harus bisa di-build dalam semalam untuk keperluan Hackathon/Study Jam.

## 2. Tech Stack
* **Framework:** Next.js (Gunakan **App Router** - direktori `app/`)
* **Bahasa:** TypeScript
* **Styling:** Tailwind CSS
* **Ikon & UI:** Lucide React (ikon), Framer Motion (opsional untuk animasi *fade-in* hasil)
* **AI Engine:** Google Gemini API (Model: `gemini-1.5-flash`) via `@google/genai` atau fetch REST standar.
* **Deployment:** Dockerized untuk Google Cloud Run.

## 3. UI/UX & Frontend Requirements
Fokus pada desain minimalis, *clean*, dan langsung pada fungsi utamanya (*no login required*).

### 3.1. Layout Utama (Single Page)
* **Header:** Logo/Teks sederhana "VibeShift" dan *tagline* (misal: "Ubah emosi menjadi komunikasi").
* **Main Container:** Menggunakan layout responsif.
    * *Desktop:* Layout *Split-screen* (kiri untuk Input, kanan untuk Output).
    * *Mobile:* Layout atas-bawah (Input di atas, Output di bawah).

### 3.2. Komponen Frontend
* `TextInput`: Textarea besar (sisi kiri) dengan *placeholder*: "Ketik atau paste pesan kasarmu di sini... (contoh: Saya nggak mau ngerjain ini!)".
* `VibeSelector`: Kumpulan tombol (*button group*) di bawah textarea input. Pilihan Vibe:
    1.  💼 Profesional & Tegas
    2.  🤝 Ramah & Kooperatif
    3.  🛑 Menolak Halus
    4.  🧊 Santai & Kasual
* `SubmitButton`: Tombol "Shift Vibe!" yang menampilkan *loading state* (spinner/teks "Memproses...") saat API dipanggil.
* `OutputDisplay`: Textarea *read-only* (sisi kanan) untuk menampilkan hasil dari AI. Terdapat tombol "Copy to Clipboard" di sudut kanan atas kotak ini.

## 4. Backend & API Requirements
Backend akan dibangun menggunakan **Next.js Route Handlers** untuk menyembunyikan API Key.

### 4.1. API Endpoint
* **Path:** `POST /api/vibe`
* **Request Payload (JSON):**
    ```json
    {
      "text": "Saya nggak mau ngerjain ini karena bukan tugas saya!",
      "vibe": "Profesional & Tegas"
    }
    ```
* **Response Payload (JSON):**
    * *Success (200):* `{ "result": "Mohon maaf, sepertinya tugas ini berada di luar cakupan peran saya saat ini..." }`
    * *Error (500):* `{ "error": "Gagal memproses teks." }`

### 4.2. Prompt Engineering (System Instruction)
Di dalam API route, AI harus diberikan instruksi sistem (konteks) berikut sebelum memproses input:
> "Kamu adalah asisten komunikasi ahli. Tugasmu adalah mengubah draf pesan kasar dari pengguna menjadi pesan yang terstruktur dengan nada bicara: [vibe]. Pertahankan makna dan tujuan asli pesan, namun perbaiki tata bahasa, tingkat kesopanan, dan profesionalismenya. Berikan HANYA teks hasilnya saja, tanpa basa-basi atau penjelasan tambahan."

## 5. System Flow (Alur Kerja)
1.  **User Input:** Pengguna mengetik teks di `TextInput` dan memilih salah satu vibe di `VibeSelector`.
2.  **Trigger:** Pengguna menekan `SubmitButton`.
3.  **Frontend Action:** Frontend mengatur state `isLoading` menjadi `true` dan mengirim HTTP POST request ke `/api/vibe` berisi teks dan vibe.
4.  **Backend Action (`/api/vibe`):** * Menerima request.
    * Menggabungkan *Prompt System* dengan input pengguna.
    * Memanggil Google Gemini API menggunakan `process.env.GEMINI_API_KEY`.
    * Menerima respons teks dari Gemini.
5.  **Return Response:** Backend mengembalikan teks hasil ke Frontend.
6.  **UI Update:** Frontend mengubah state `isLoading` menjadi `false`, menampilkan hasil di `OutputDisplay`, dan pengguna bisa mengklik "Copy to Clipboard".

## 6. Deployment Requirements
* Siapkan `Dockerfile` standar untuk Next.js (Standalone build direkomendasikan untuk ukuran image yang lebih kecil).
* Pastikan `GEMINI_API_KEY` tidak di-*hardcode* di dalam kode, melainkan diakses melalui `process.env.GEMINI_API_KEY`.
* Aplikasi harus *stateless* (tidak menyimpan data ke database atau *local storage* untuk menyederhanakan arsitektur).

## Instruksi Tambahan untuk AI Generator:
Tolong buatkan kode dasar (*scaffolding*) untuk aplikasi ini mulai dari:
1. File `app/page.tsx` untuk UI utama.
2. File `app/api/vibe/route.ts` untuk backend route handler.
3. File `Dockerfile` yang siap untuk di-*deploy* ke Google Cloud Run.

## Catatan tambahan
Pastikan kriteria dibawah ini terpenuhi:
 * **Tombol Copy:** Pastikan tombol benar-benar menyalin teks ke *clipboard* perangkat.
 * **State Error:** Coba matikan koneksi internet sesaat atau kirim teks kosong. Pastikan aplikasi tidak *crash*, melainkan memunculkan pesan error yang rapi (misal: "Oops, gagal menyambung ke AI. Coba lagi ya!").
 * **Batasan Karakter (Opsional):** Tes memasukkan teks yang sangat panjang untuk memastikan kotak input bisa melakukan *scroll* dengan baik.
