# Meet In The Middle 🗺️

**Meet In The Middle** adalah aplikasi web yang membantu kamu dan teman-temanmu menemukan titik temu terbaik berdasarkan beberapa lokasi yang kalian input. Cocok digunakan untuk merencanakan pertemuan di tempat yang adil dan strategis bagi semua pihak.

## ✨ Fitur Utama

- ✅ Input 2 hingga 10 lokasi berupa alamat atau nama tempat
- 📍 Hitung **titik tengah geografis**
- 🗺️ Tampilkan peta interaktif menggunakan Leaflet
- ⭐ Dapatkan **rekomendasi tempat wisata** di sekitar titik tengah (menggunakan OpenTripMap)
- 🔗 Setiap rekomendasi dilengkapi link untuk informasi lebih lanjut

## 🧰 Teknologi yang Digunakan

- **Next.js** – Framework React modern untuk aplikasi web
- **Leaflet.js** – Peta interaktif open-source
- **Tailwind CSS** – Utility-first CSS untuk styling responsif
- **OpenCage Geocoder API** – Mengubah alamat jadi koordinat
- **OpenTripMap API** – Mendapatkan tempat menarik di sekitar titik tengah

## ⚙️ Instalasi & Menjalankan

1. Clone repositori ini:

   ```bash
   git clone https://github.com/your-username/meet-in-the-middle.git
   cd meet-in-the-middle
Install dependencies:

bash
Copy
Edit
npm install
Buat file .env.local di root project dan isi dengan API key kamu:

env
Copy
Edit
OPENCAGE_KEY=your_opencage_api_key
OPENTRIPMAP_KEY=your_opentripmap_api_key
Jalankan project secara lokal:

bash
Copy
Edit
npm run dev
Buka browser dan akses: http://localhost:3000

