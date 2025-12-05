# Cara Pakai

1. Setelah clone, lakukan instalasi `npm i`
2. Buat file `.env` dan isi sesuai dengan `.env.example`
3. Untuk menjalankan nya, jalankan command `npm run generate MPASS-xxxx` ganti MPASS-xxxx dengan sesuai dengan issue key
4. Hasil yaml ada di file output.yaml

5. Cara running:
   -- Untuk generate TS gunakan command: `npm run generate TS`
   -- Untuk generate TC gunakan command: `npm run generate TC MPASS-xxxx`

6. Variabel isScenario jika value nya `true` Label di TS akan mengambil dari deskripsi scenario, jika false akan mengambil value test case
