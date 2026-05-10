// Mock data untuk portfolio proyek
export const portfolioData = [
  {
    id: "5",
    title: "Cover atau casing komponen elektronik",
    category: "Fabrikasi",
    price: "Rp 200.000",
    image:
      "https://images.unsplash.com/photo-1776001175145-8edb1e367b57?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    client: " - ",
    duration: "1 minggu",
    description:
      "Pembuatan casing pelindung untuk komponen elektronik industri dengan material tahan panas dan desain ergonomis untuk memudahkan akses maintenance.",
    software: ["SolidWorks", "Cura"],
    deliverables: [
      "Unit Casing Jadi",
      "File Desain 3D",
      "Laporan Quality Control",
    ],
    challenge:
      "Memastikan presisi dimensi agar komponen elektronik pas di dalam casing serta menyediakan ventilasi yang cukup.",
    solution:
      "Menggunakan teknik 3D printing presisi tinggi dan desain modular untuk sirkulasi udara yang optimal.",
  },
  {
    id: "1",
    title: "Desain Rope Brake Dynamometer",
    category: "Desain 3D",
    price: "Rp 300.000",
    image:
      "https://images.unsplash.com/photo-1775741982095-5ca0273f066e?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    client: " - ",
    duration: "4 Hari",
    description:
      "Desain alat uji Rope Brake Dynamometer untuk mengukur torsi dan daya pada poros mesin. Sistem menggunakan pulley, tali rem, dan pemberat untuk menghasilkan gaya pengereman pada poros.",
    software: ["SolidWorks"],
    deliverables: [
      "File 3D STEP",
      "Gambar Teknik PDF",
      "BOM Excel",
    ],
    challenge:
      "Merancang sistem pengereman yang stabil agar pengukuran torsi akurat tanpa slip pada pulley.",
    solution:
      "Menggunakan desain pulley presisi dan sistem pemberat yang dapat disesuaikan untuk menghasilkan gaya pengereman yang konsisten.",
  },
  {
    id: "2",
    title: "Rope Brake Dynamometer",
    category: "Fabrikasi",
    price: "Rp 4.000.000",
    image:
      "https://images.unsplash.com/photo-1775744721804-dfe4d0ce0103?q=80&w=1419&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    client: " - ",
    duration: "3 minggu",
    description:
      "Pembuatan alat uji Rope Brake Dynamometer untuk mengukur torsi dan daya mesin melalui sistem pengereman pada pulley menggunakan tali dan beban.",
    software: ["SolidWorks"],
    deliverables: [
      "Alat Rope Brake Dynamometer",
      "Manual Penggunaan",
      "Gambar Teknik",
    ],
    challenge:
      "Menjaga kestabilan gaya pengereman agar hasil pengukuran torsi dan daya mesin tetap akurat.",
    solution:
      "Menggunakan pulley presisi, sistem pemberat yang dapat diatur, serta rangka kokoh untuk meminimalkan getaran saat pengujian.",
  },
  {
    id: "3",
    title: "Desain Tempat Sampah Pencacah dan Pemilah",
    category: "Desain 3D",
    price: "Rp 300.000",
    image:
      "https://images.unsplash.com/photo-1775747983680-13c61226d44c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    client: " - ",
    duration: "10 hari",
    description:
      "Perancangan alat tempat sampah pencacah dan pemilah yang mampu menghancurkan sampah menjadi ukuran kecil serta memisahkan jenis sampah dalam satu sistem mesin.",
    software: ["SolidWorks"],
    deliverables: [
      "Drawing 2D DWG",
      "PDF dengan dimensi",
      "BOM lengkap",
    ],
    challenge:
      "Merancang sistem pencacah yang kuat untuk berbagai jenis sampah serta mekanisme pemilah yang efisien dalam satu rangka alat.",
    solution:
      "Menggunakan sistem pisau pencacah berputar dengan rangka baja dan mekanisme pemisahan berbasis saringan untuk memisahkan jenis sampah secara efektif.",
  },
  {
    id: "4",
    title: "Tempat Sampah Pencacah dan Pemilah",
    category: "Fabrikasi",
    price: "Rp 3.000.000",
    image:
      "https://images.unsplash.com/photo-1775748180057-2729e36efac8?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    client: "Workshop Fabrication",
    duration: "3 minggu",
    description:
      "Pembuatan alat tempat sampah pencacah dan pemilah yang mampu menghancurkan sampah menjadi ukuran kecil serta memisahkan jenis sampah dalam satu sistem mekanis.",
    software: ["SolidWorks"],
    deliverables: [
     "Unit Mesin Jadi",
    "Dokumentasi Desain",
    "Panduan Pengoperasian",
    ],
    challenge:
      "Merancang sistem pencacah yang kuat serta mekanisme pemilah yang efektif untuk berbagai jenis sampah.",
    solution:
      "Menggunakan pisau pencacah baja dengan motor penggerak serta sistem pemisah berbasis saringan untuk memisahkan sampah sesuai jenisnya.",
  },
];

export function getProjectById(id: string) {
  return portfolioData.find((project) => project.id === id);
}
