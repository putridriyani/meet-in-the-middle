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
   
2. Install dependencies:
   ```bash
   npm install

3. Buat file .env.local di root project dan isi dengan API key kamu:
   ```bash
   OPENCAGE_KEY=your_opencage_api_key
   OPENTRIPMAP_KEY=your_opentripmap_api_key
   
5. Jalankan project secara lokal:
   ```bash
   npm run dev
   
6. Buka browser dan akses: http://localhost:3000

