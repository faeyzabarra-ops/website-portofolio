// ====== Ubah data proyek di sini ======
const projects = [
  { judul: "Toko Online UMKM", deskripsi: "Katalog produk dan keranjang belanja untuk usaha kecil.", kategori: "web", tags: ["HTML", "CSS", "JS"], link: "#" },
  { judul: "Aplikasi Catatan Harian", deskripsi: "Pencatat harian dengan pencarian dan mode gelap.", kategori: "app", tags: ["React", "Firebase"], link: "#" },
  { judul: "Landing Page Event", deskripsi: "Halaman pendaftaran seminar dengan hitung mundur.", kategori: "web", tags: ["HTML", "CSS"], link: "#" },
  { judul: "Dashboard Penjualan", deskripsi: "Grafik penjualan bulanan dari data CSV.", kategori: "app", tags: ["JS", "Chart.js"], link: "#" }
];

const grid = document.getElementById("projectGrid");

function renderProjects(filter = "all") {
  grid.innerHTML = "";
  projects
    .filter(p => filter === "all" || p.kategori === filter)
    .forEach(p => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="thumb" aria-hidden="true">${p.judul.charAt(0)}</div>
        <div class="card-body">
          <h3></h3>
          <p></p>
          <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
          <a href="${p.link}">Lihat proyek</a>
        </div>`;
      card.querySelector("h3").textContent = p.judul;
      card.querySelector("p").textContent = p.deskripsi;
      grid.appendChild(card);
    });
}

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".chip.active").classList.remove("active");
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});
renderProjects();

// ====== Tema terang/gelap ======
const root = document.documentElement;
try {
  const saved = localStorage.getItem("tema");
  if (saved) root.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
} catch (e) {}
document.getElementById("themeBtn").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("tema", next); } catch (e) {}
});

// ====== Validasi formulir ======
// Catatan: ini hanya validasi di sisi klien. Untuk benar-benar mengirim email,
// sambungkan ke layanan seperti Formspree atau Web3Forms (ganti bagian "TODO").
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("input, textarea").forEach(el => {
    const valid = el.value.trim() !== "" && (el.type !== "email" || /^\S+@\S+\.\S+$/.test(el.value));
    el.classList.toggle("error", !valid);
    if (!valid) ok = false;
  });
  status.classList.toggle("error", !ok);
  if (!ok) { status.textContent = "Lengkapi semua kolom dengan benar."; return; }
  // TODO: kirim data ke layanan formulir pilihanmu di sini
  status.textContent = "Terima kasih! Pesanmu sudah tercatat.";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();