import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const OPENCAGE_KEY = process.env.OPENCAGE_KEY!;
const OPENTRIPMAP_KEY = process.env.OPENTRIPMAP_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { addresses } = await req.json();

    if (!Array.isArray(addresses) || addresses.length < 2) {
      return NextResponse.json({ error: "Minimal 2 alamat diperlukan." }, { status: 400 });
    }

    // 1. Convert each address to coordinates using OpenCage
    const coords: { lat: number; lng: number }[] = [];

    for (const address of addresses) {
      const geoRes = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          key: OPENCAGE_KEY,
          q: address,
          limit: 1,
        },
      });

      const result = geoRes.data.results?.[0];
      if (result && result.geometry?.lat !== undefined && result.geometry?.lng !== undefined) {
        coords.push({
          lat: result.geometry.lat,
          lng: result.geometry.lng,
        });
      }
    }

    if (coords.length < 2) {
      return NextResponse.json({ error: "Gagal mendapatkan koordinat dari alamat." }, { status: 400 });
    }

    // 2. Hitung titik tengah (average)
    const midLat = coords.reduce((sum, c) => sum + c.lat, 0) / coords.length;
    const midLng = coords.reduce((sum, c) => sum + c.lng, 0) / coords.length;

    console.log("Midpoint:", { lat: midLat, lng: midLng });

    // 3. Ambil rekomendasi tempat dari OpenTripMap
    const radius = 5000; // 5 km
    const limit = 5;

    const placeRes = await axios.get("https://api.opentripmap.com/0.1/en/places/radius", {
      params: {
        lat: midLat,
        lon: midLng,
        radius,
        limit,
        rate: 2,
        format: "json",
        apikey: OPENTRIPMAP_KEY,
      },
    });

    const places = placeRes.data;
    console.log("Found places:", places.length);

    // 4. Ambil detail nama tempat dari setiap xid dan validasi koordinatnya
    const suggestions = await Promise.all(
      places.map(async (place: any) => {
        try {
          if (!place.xid) return null;

          const detailRes = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${place.xid}`, {
            params: { apikey: OPENTRIPMAP_KEY },
          });

          const lat = place.point?.lat;
          const lng = place.point?.lon;
          if (lat === undefined || lng === undefined) return null;

          return {
            name: detailRes.data.name || "No Name",
            url: detailRes.data.otm || null,
            lat: place.point.lat,
            lng: place.point.lon, // Kalau ini 'lon' di backend, harus dipastikan di frontend juga menggunakan 'lng'
          };
          
        } catch {
          return null;
        }
      })
    );

    // Filter yang null dan juga cek lat/lng undefined
    const cleanSuggestions = suggestions.filter(
      (s): s is { name: string; url: string | null; lat: number; lng: number } =>
        !!s && s.lat !== undefined && s.lng !== undefined
    );

    return NextResponse.json({
      coords,
      midpoint: { lat: midLat, lng: midLng },
      suggestions: cleanSuggestions,
    });
  } catch (error: any) {
    console.error("API error:", error.message);
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
