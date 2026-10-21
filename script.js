const layanan = [
  {
    nama: "Pengajuan Persediaan",
    deskripsi: "Ajukan permintaan barang persediaan dan material kantor",
    ikon: "📦",
    url: "GANTI_URL_FORM_PERSEDIAAN"
  },
  {
    nama: "Pengajuan Pemakaian Bahan Lab",
    deskripsi: "Ajukan pemakaian bahan laboratorium untuk kegiatan kantor",
    ikon: "🧪",
    url: "GANTI_URL_FORM_BAHAN_LAB"
  },
  {
    nama: "Permohonan Belanja",
    deskripsi: "Ajukan permohonan pembelian barang atau jasa kantor",
    ikon: "🛒",
    url: "GANTI_URL_FORM_BELANJA"
  }
];

const container = document.getElementById('card-container');

layanan.forEach((l) => {
  const a = document.createElement('a');
  a.href = l.url;
  a.className = 'card';
  a.target = '_blank';   // buka form di tab baru, halaman utama tetap terbuka
  a.rel = 'noopener noreferrer';

  const divHeader = document.createElement('div');
  divHeader.className = 'card-header';

  const divIkon = document.createElement('div');
  divIkon.className = 'ikon';
  divIkon.textContent = l.ikon;
  divHeader.appendChild(divIkon);

  const h3 = document.createElement('h3');
  h3.textContent = l.nama;

  const p = document.createElement('p');
  p.textContent = l.deskripsi;

  a.appendChild(divHeader);
  a.appendChild(h3);
  a.appendChild(p);
  container.appendChild(a);
});

// Salin tautan halaman
document.getElementById('btn-salin').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    tampilkanToast('Tautan halaman berhasil disalin!');
  } catch (err) {
    const tmp = document.createElement('input');
    tmp.value = window.location.href;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    tampilkanToast('Tautan halaman berhasil disalin!');
  }
});

// Bagikan profil
document.getElementById('btn-bagikan').addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Buka portal kantor',
        url: window.location.href
      });
      return;
    } catch (err) {}
  }
  tampilkanToast('Salin tautan secara manual: ' + window.location.href);
});

function tampilkanToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}