// script.js – mengambil data dari Google Apps Script, menampilkan tombol, menghitung klik

// Ganti bagian ini dengan URL Web‑App yang Anda dapatkan setelah men‑deploy Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbyx2BHCypDVUQDtjzZ2xwdTEP0Q6ui8tURAyI-SrWdwsquGUVB7_kQEsP5OZxtJE6jM/exec"; // ← ubah

/** Memuat daftar aplikasi dari Sheet lewat API */
async function loadApps() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    renderButtons(json.apps);
  } catch (e) {
    console.error('Gagal ambil data:', e);
    document.getElementById('apps').innerHTML =
      '<p class="text-red-500">Tidak dapat memuat aplikasi.</p>';
  }
}

/** Membuat kartu tombol untuk tiap aplikasi */
function renderButtons(apps) {
  const container = document.getElementById('apps');
  container.innerHTML = '';
  apps.forEach(app => {
    const btn = document.createElement('a');
    // kelas Tailwind untuk tampilan kartu
    btn.className =
      'block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-colors text-center';
    btn.title = app.Nama;

    // jika ada password, gunakan button + modal (saat ini belum ada modal – hanya contoh)
    if (app.Password && app.Password.trim() !== '') {
      btn.href = '#';
      btn.onclick = e => {
        e.preventDefault();
        const pwd = prompt('Masukkan password untuk ' + app.Nama + ':');
        if (pwd === null) return; // batal
        verifyPassword(app.ID, pwd);
      };
    } else {
      btn.href = app.URL;
      btn.target = '_blank';
    }

    btn.innerHTML = `
      <strong class="block text-lg text-gray-800 dark:text-gray-100 mb-1">${app.Nama}</strong>
      <span class="text-sm text-gray-500 dark:text-gray-400">${app.Kategori}</span>
    `;

    // catat klik (fire‑and‑forget)
    btn.addEventListener('click', () => {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'click', id: app.ID })
      }).catch(console.error);
    });

    container.appendChild(btn);
  });
}

/** Verifikasi password (jika ada) */
async function verifyPassword(appId, pwd) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'verify', appId, password: pwd })
    });
    const data = await res.json();
    if (data.success) {
      window.open(data.url, '_blank');
    } else {
      alert(data.message || 'Password salah');
    }
  } catch (e) {
    console.error(e);
    alert('Terjadi kesalahan saat memverifikasi.');
  }
}

// Jalankan saat halaman siap
document.addEventListener('DOMContentLoaded', loadApps);
