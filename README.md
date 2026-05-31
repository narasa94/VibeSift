# 🚀 VibeShift

> **"Ubah emosi menjadi komunikasi."** 
> Aplikasi cerdas berbasis AI untuk menerjemahkan draf pesan kasar atau emosional Anda menjadi pesan yang terstruktur, profesional, atau kasual secara instan. Dibuat khusus untuk Hackathon/Study Jam.

🌍 **Live Demo:** [https://vibesift.netlify.app/](https://vibesift.netlify.app/)

---

## 📖 Latar Belakang Masalah
Seringkali kita merasa kesal, marah, atau malas saat harus membalas pesan dari rekan kerja, klien, atau teman. Hal ini memicu *decision fatigue* dan miskomunikasi karena kita kesulitan merangkai kata-kata yang pantas saat sedang emosi. 

**VibeShift** hadir sebagai solusi cerdas. Anda cukup mengetik pesan sejujur dan sekasar mungkin (draf kasar), memilih *Vibe* (nada bicara) yang Anda inginkan, dan AI akan merangkai ulang kata-katanya menjadi pesan yang siap dikirim!

---

## ✨ Fitur Utama

Aplikasi ini menyediakan 4 opsi perubahan *Vibe* (Nada Bicara):
1. 💼 **Profesional & Tegas:** Mengubah pesan menjadi formal, sopan, namun tetap memiliki batasan yang tegas. Sangat cocok untuk membalas email bos atau klien.
2. 🤝 **Ramah & Kooperatif:** Mengubah pesan menjadi hangat dan bersahabat.
3. 🛑 **Menolak Halus:** Sulit menolak ajakan atau tugas tambahan? Fitur ini akan merangkai kalimat penolakan yang sangat halus tanpa menyinggung perasaan.
4. 🧊 **Santai & Kasual:** Pesan bergaya santai yang cocok untuk dikirim ke grup WhatsApp teman atau *circle* terdekat.

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur *Fullstack Serverless* modern:
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS (dengan palet warna kustom Google)
- **Animasi & UI:** Framer Motion & Lucide React Icons
- **Kecerdasan Buatan (AI):** [Google Gemini API](https://ai.google.dev/) (Model: `gemini-2.5-flash`) via `@google/genai` SDK.
- **Infrastruktur:** *Container-ready* (Dockerfile disertakan) untuk Google Cloud Run atau kompatibel langsung dengan platform seperti Netlify/Vercel.

---

## 🚀 Panduan Memulai (Getting Started)

Ikuti langkah-langkah mudah di bawah ini untuk menjalankan aplikasi VibeShift secara lokal di komputer Anda:

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal aplikasi berikut di komputer Anda:
- [Node.js](https://nodejs.org/en/) (Versi 18 atau lebih baru)
- Git (opsional)

### 2. Kloning Proyek & Instalasi
Buka terminal/Command Prompt Anda, lalu jalankan perintah berikut:

```bash
# Salin proyek ini (jika Anda menggunakan Git)
git clone https://github.com/USERNAME_ANDA/vibeshift-app.git

# Masuk ke folder proyek
cd vibeshift-app

# Instal semua dependensi
npm install
```

### 3. Pengaturan API Key (PENTING!)
Aplikasi ini membutuhkan akses ke otak AI Google Gemini.
1. Dapatkan API Key secara gratis di [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Buat sebuah file baru bernama `.env.local` di folder utama aplikasi ini.
3. Buka file tersebut, lalu ketik baris berikut:

```env
GEMINI_API_KEY=MASUKKAN_API_KEY_ANDA_DI_SINI
```

### 4. Jalankan Aplikasi Lokal
Setelah API Key dimasukkan, jalankan server pengembangan (Development Server):

```bash
npm run dev
```

Buka **[http://localhost:3000](http://localhost:3000)** di *browser* Anda untuk melihat aplikasinya! 🎉

---

## 🌐 Cara Deploy (Hosting Publik)

Jika Anda ingin mempublikasikan aplikasi ini agar dapat diakses semua orang, Anda bisa menggunakan platform **Netlify** secara gratis:

1. Buat *repository* baru di GitHub Anda dan unggah seluruh kode ini.
2. Login ke [Netlify](https://www.netlify.com/) dan pilih opsi **"Add new site"** -> **"Import an existing project"**.
3. Pilih repository GitHub Anda tadi.
4. **Sangat Penting:** Sebelum menekan tombol Deploy, klik **"Add environment variables"** dan masukkan `GEMINI_API_KEY` beserta nilainya.
5. Tekan **Deploy**. Selesai!

*(Catatan: Proyek ini juga sudah menyediakan `Dockerfile` jika Anda lebih memilih untuk men-deploy-nya ke VPS, AWS, atau Google Cloud Run).*

---

## ⚖️ Lisensi
Proyek ini dilisensikan di bawah **GNU General Public License v3.0 (GPLv3)**.
Secara singkat: Anda bebas (dan diizinkan) untuk menggunakan, menyalin, mendistribusikan, dan memodifikasi aplikasi ini, asalkan setiap modifikasi yang Anda bagikan ke publik *juga harus* bersifat *open-source* dengan lisensi GPL yang sama. 

Lihat file `LICENSE` untuk detail lebih lanjut.

---
*Dibuat dengan ❤️ untuk Semuanya 2026 oleh Nara Sa.*
