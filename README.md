# Pemutar TikTok Keranjang

Extension Chrome untuk melihat **produk keranjang kuning** dan **memutar video TikTok Shop** langsung dari browser di laptop/PC, tanpa harus membuka aplikasi TikTok di HP.

## Masalah yang diselesaikan

Saat membuka video TikTok yang memiliki keranjang kuning (TikTok Shop) di `tiktok.com`:

- keranjang kuning tidak tampil, sehingga produk di video tidak bisa dilihat;
- video sering **tidak bisa diputar**, karena TikTok web tidak mengirim file videonya.

Akibatnya Anda terpaksa membuka aplikasi TikTok di HP. Extension ini mengembalikan kedua hal itu di browser.

## Fitur

- **Tombol keranjang 🛒** di pojok kanan bawah setiap video yang punya produk, lengkap dengan jumlah produknya.
- **Daftar produk** dengan foto dan nama. Klik produk untuk membuka halaman produknya (Tokopedia / TikTok Shop) di tab baru: harga, varian, ulasan, dan tombol beli ada di sana.
- **Putar video di panel samping** Chrome. Halaman TikTok tetap terbuka di sebelahnya.
- **Ikut berganti saat scroll.** Selama panel samping terbuka, video berkeranjang yang sedang di tengah layar diputar otomatis.
- Bekerja di halaman video, feed For You, Following, hasil pencarian, dan profil.
- Tanpa login tambahan, tanpa akun, tanpa pengaturan.

## Kebutuhan

- Google Chrome versi **116 atau lebih baru** (untuk panel samping). Browser berbasis Chromium lain (Edge, Brave) umumnya juga bisa, tapi belum diuji.
- Koneksi internet ke `tiktok.com` dan `tikwm.com`.

## Cara pasang

Extension ini belum ada di Chrome Web Store, jadi dipasang manual:

1. Unduh kode ini:
   - klik tombol hijau **Code → Download ZIP** di halaman repo, lalu ekstrak; **atau**
   - `git clone https://github.com/Istiqlal8/pemutar-tikok-keranjang.git`
2. Buka `chrome://extensions` di Chrome.
3. Nyalakan **Developer mode** (sakelar di kanan atas).
4. Klik **Load unpacked**, lalu pilih folder hasil unduhan (folder yang berisi `manifest.json`).
5. Extension **TikTok Keranjang** muncul di daftar. Selesai.

Kalau tab TikTok sudah terbuka sebelum extension dipasang, refresh tab itu (Ctrl+R / Cmd+R).

## Cara pakai

### Melihat produk keranjang

1. Buka video TikTok yang ada keranjang kuningnya di Chrome.
2. Di kanan bawah muncul tombol merah **🛒 N** (N = jumlah produk).
3. Klik tombol itu untuk membuka daftar produk.
4. Klik salah satu produk untuk membuka halaman produknya.
5. Klik 🛒 lagi untuk menutup daftar.

### Memutar video

1. Klik **🛒**, lalu klik **▶ Putar video** di bagian atas daftar.
2. Panel samping terbuka di kanan jendela dan memutar videonya.
3. Untuk menutup, klik ✕ di bagian atas panel.

### Putar otomatis saat scroll

1. Buka panel samping sekali dengan **▶ Putar video**.
2. Scroll seperti biasa. Setiap video berkeranjang yang berhenti di tengah layar langsung diputar di panel.
3. Scroll cepat melewati beberapa video tetap aman: yang diputar hanya video tempat Anda berhenti.

Kalau panel tidak mau terbuka saat klik ▶, buka manual lewat ikon **side panel** di toolbar Chrome lalu pilih **TikTok Keranjang**. Videonya akan langsung terisi.

## Cara kerja

1. **Produk.** Saat halaman TikTok dimuat, atau saat feed memuat video baru, TikTok mengirim data video ke browser. Data itu tetap memuat daftar produk keranjang meski tampilannya disembunyikan. Extension membaca data tersebut (`collect.js`) dan menampilkannya (`ui.js`).
2. **Video aktif.** Extension menentukan video mana yang sedang ditonton dari alamat halaman (`/video/<id>`), atau di feed dari video yang paling dekat ke tengah layar.
3. **Pemutaran.** Karena TikTok web tidak mengirim file video untuk video TikTok Shop, extension meminta alamat file videonya ke layanan [tikwm](https://www.tikwm.com), lalu memutarnya di panel samping (`player.html`).

## Privasi

- Extension **tidak mengumpulkan, menyimpan, atau mengirim** data pribadi Anda ke server pembuat extension. Tidak ada server milik extension ini.
- Extension **tidak membaca** cookie, akun, pesan, atau riwayat TikTok Anda.
- Saat Anda memutar video, **alamat video TikTok tersebut** (misalnya `https://www.tiktok.com/@_/video/7427471156183076101`) dikirim ke `tikwm.com` untuk mendapatkan file videonya. Hanya alamat video yang dikirim, tanpa identitas Anda. Tetap perhatikan bahwa tikwm adalah layanan pihak ketiga yang tidak terkait dengan extension ini maupun TikTok.
- Kalau fitur putar video tidak dipakai, extension sama sekali tidak menghubungi tikwm.

### Izin yang diminta

| Izin | Untuk apa |
|------|-----------|
| Akses `www.tiktok.com` | Membaca data produk dan menampilkan tombol keranjang |
| Akses `www.tikwm.com` | Mengambil file video untuk diputar |
| `sidePanel` | Memutar video di panel samping |
| `storage` | Memberi tahu panel video mana yang harus diputar (hanya selama browser terbuka) |

## Batasan

- **Harga tidak tampil di daftar.** TikTok web mengirim harga sebagai 0; harga sebenarnya ada di halaman produk.
- **Panel samping harus dibuka dengan klik.** Chrome tidak mengizinkan panel terbuka sendiri. Putar otomatis baru aktif setelah panel dibuka sekali.
- **Hanya video berkeranjang** yang muncul tombol 🛒 dan diputar di panel. Video biasa tetap diputar oleh TikTok di halaman.
- **Bergantung pada tikwm** untuk pemutaran. Kalau tikwm sedang gangguan atau membatasi permintaan (misalnya karena scroll sangat cepat dalam waktu lama), muncul pesan *"Gagal memuat video"*.
- **Bergantung pada struktur data TikTok.** Kalau TikTok mengubah format datanya, tombol keranjang bisa berhenti muncul sampai extension diperbarui.
- **Suara bisa dobel**, karena TikTok mungkin tetap memutar videonya di halaman. Kecilkan suara TikTok di halaman bila perlu.
- **Belum ada fitur beli langsung.** Pembelian tetap lewat halaman produk Tokopedia / TikTok Shop.

## Mengatasi masalah

| Gejala | Solusi |
|--------|--------|
| *"Gagal memuat ekstensi"* saat Load unpacked | Pastikan folder yang dipilih berisi `manifest.json` dan semua berkas lengkap. Unduh ulang bila perlu. |
| Tombol 🛒 tidak muncul | Pastikan video memang punya keranjang kuning. Refresh tab. Di feed, coba buka videonya langsung (alamat berisi `/video/…`). |
| Tombol 🛒 muncul tapi produknya video lain | Di feed, tunggu sebentar sampai video benar-benar di tengah layar, atau buka videonya langsung. |
| Panel samping tidak terbuka | Buka lewat ikon side panel di toolbar Chrome → **TikTok Keranjang**. Pastikan Chrome versi 116+. |
| *"Gagal memuat video"* | Tunggu beberapa detik lalu klik **▶ Putar video** lagi. Kalau tetap gagal, tikwm mungkin sedang gangguan. |
| Video diputar tanpa suara | Chrome menolak memutar dengan suara secara otomatis. Klik ikon speaker di video. |
| Setelah memperbarui kode, perubahan tidak terasa | Klik ↻ pada kartu extension di `chrome://extensions`, lalu refresh tab TikTok. |

## Memperbarui

- Kalau memasang lewat `git clone`: jalankan `git pull` di foldernya.
- Kalau memasang lewat ZIP: unduh ZIP terbaru dan timpa folder lama.

Setelah itu klik ↻ pada kartu extension di `chrome://extensions` dan refresh tab TikTok.

## Struktur berkas

| Berkas | Isi |
|--------|-----|
| `manifest.json` | Konfigurasi extension (Manifest V3) |
| `collect.js` | Membaca data produk dari halaman dan dari data yang dimuat feed |
| `ui.js` | Tombol 🛒, daftar produk, dan penentuan video yang sedang ditonton |
| `ui.css` | Tampilan tombol dan daftar produk |
| `bridge.js` | Penghubung halaman TikTok dengan bagian extension lain (klik putar, video aktif) |
| `background.js` | Membuka panel samping dan meneruskan video yang harus diputar |
| `player.html`, `player.js` | Pemutar video di panel samping (mengambil file video lewat tikwm) |

## Pengembangan

Tidak ada proses build dan tidak ada dependensi. Cukup ubah berkasnya, lalu klik ↻ pada kartu extension di `chrome://extensions` dan refresh tab TikTok.

`collect.js` dan `ui.js` berjalan di konteks halaman TikTok (`"world": "MAIN"`) supaya bisa membaca data yang dimuat halaman. `bridge.js` berjalan di konteks extension karena butuh API `chrome.*`. Keduanya berkomunikasi lewat DOM (atribut `data-*` dan event `ttk-current`).

Laporan bug dan usulan fitur silakan lewat tab **Issues**.

## Penafian

Proyek ini tidak berafiliasi dengan, didukung, atau disponsori oleh TikTok, ByteDance, Tokopedia, maupun tikwm. Semua merek dagang milik pemiliknya masing-masing. Gunakan sesuai ketentuan layanan platform yang berlaku.
