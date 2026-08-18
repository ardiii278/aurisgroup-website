#!/bin/bash
# ===== Publikasikan data.json ke website (Cloudflare Pages) =====
# Cara pakai:
#   1. Buka admin (https://aurisgroup.id/admin/) lalu edit konten.
#   2. Klik tombol "Export data.json" di panel admin -> file terunduh.
#   3. Taruh file data.json hasil unduhan ke folder ini (timpa).
#   4. Jalankan:  ./publish.sh
set -e
cd "$(dirname "$0")"

if [ ! -f data.json ]; then
    echo "❌ File data.json tidak ditemukan di folder ini."
    echo ""
    echo "Langkah yang benar:"
    echo "  1. Buka https://aurisgroup.id/admin/ dan edit konten."
    echo "  2. Klik 'Export data.json' -> dapat file data.json."
    echo "  3. Pindahkan file tersebut ke folder ini (timpa file lama)."
    echo "  4. Jalankan lagi: ./publish.sh"
    exit 1
fi

echo "📦 Menambahkan data.json..."
git add data.json

if git diff --cached --quiet; then
    echo "ℹ️  Tidak ada perubahan pada data.json."
else
    git commit -m "Update konten website (data.json)"
fi

echo "🚀 Push ke GitHub..."
git push origin main

echo ""
echo "✅ Selesai! Cloudflare Pages akan auto-deploy dalam 1-2 menit."
echo "   Cek website: https://aurisgroup.id"
