"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  const [inputs, setInputs] = useState([{ address: "" }]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index].address = value;
    setInputs(newInputs);
  };

  const handleAdd = () => {
    if (inputs.length < 10) setInputs([...inputs, { address: "" }]);
  };

  const handleSubmit = async () => {
    const addresses = inputs.map((i) => i.address.trim()).filter(Boolean);
    if (addresses.length < 2) {
      alert("Minimal 2 lokasi!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/meetpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addresses }),
      });

      const text = await res.text();
      console.log("STATUS:", res.status);
      console.log("RAW TEXT:", text);

      if (!res.ok) {
        alert("Gagal mengambil data: " + res.status);
        return;
      }

      const data = JSON.parse(text);
      if (data?.suggestions?.length === 0) {
        alert("Tidak ada rekomendasi ditemukan.");
      }

      setResult(data);
    } catch (err) {
      console.error("Gagal parsing / fetch:", err);
      alert("Terjadi kesalahan saat mengambil hasil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cari Titik Tengah & Rekomendasi Tempat</h1>

      {inputs.map((input, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Alamat atau tempat ${i + 1}`}
          value={input.address}
          onChange={(e) => handleChange(i, e.target.value)}
          className="input"
        />
      ))}

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleAdd}
          className="btn btn-secondary"
          disabled={inputs.length >= 10}
        >
          Tambah Lokasi
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Cari Rekomendasi"}
        </button>
      </div>

      {result?.suggestions?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Rekomendasi Tempat</h2>
          <ul className="list-disc pl-5 mb-4">
            {result.suggestions.map((s: any, i: number) => (
              <li key={i}>
                <strong>{s.name}</strong>{" "}
                {s.url && (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Lihat
                  </a>
                )}
              </li>
            ))}
          </ul>

          <MapView
            midpoint={result.midpoint}
            coords={result.coords}
            suggestions={result.suggestions}
          />
        </div>
      )}
    </main>
  );
}
