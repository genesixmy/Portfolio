# Panduan Update Portfolio

Panduan lengkap untuk update portfolio Khalid Zainal.

---

## 📁 Struktur Folder Penting

```
Portfolio/
├── public/
│   └── projects/          # <- Letak gambar projek di sini
│       ├── rarebits.png
│       ├── draftlycv.png
│       ├── genesix-blog.png
│       └── arenahub.png
├── src/
│   ├── app/
│   │   └── page.tsx       # Main page
│   └── components/
│       └── sections/
│           └── Work.tsx   # <- Edit projek di sini
```

---

## 🖼️ Cara Tambah Gambar Background Projek

### Langkah 1: Sediakan Gambar

1. Screenshot interface projek anda
2. Saiz yang disyorkan: **1200x800px** atau **16:9 ratio**
3. Format: **PNG** atau **JPG**
4. Nama fail tanpa spaces, guna dash: `nama-projek.png`

### Langkah 2: Letak Gambar dalam Folder

Letak gambar dalam folder `public/projects/`:

```
public/
└── projects/
    ├── rarebits.png
    ├── draftlycv.png
    ├── genesix-blog.png
    └── arenahub.png
```

### Langkah 3: Update Work.tsx

Buka file `src/components/sections/Work.tsx`

Cari array `projects` (sekitar line 4-50):

```tsx
const projects = [
  {
    id: 1,
    title: "Rarebits",
    category: "Web Application",
    description: "Platform untuk...",
    image: "/projects/rarebits.png",  // <- Tambah line ini
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "#",
    github: "#",
  },
  // ... projek lain
];
```

### Langkah 4: Update ProjectCard Component

Cari component `ProjectCard` dalam file yang sama dan tambah background image:

```tsx
// Cari bahagian ini dalam ProjectCard:
<div className="relative aspect-video overflow-hidden">
  {/* Tambah image */}
  {project.image && (
    <img
      src={project.image}
      alt={project.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}
  {/* Overlay gradient supaya text nampak */}
  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
</div>
```

---

## ✏️ Cara Edit Projek Sedia Ada

### Update Title/Description

Dalam `Work.tsx`, cari projek yang nak edit:

```tsx
{
  id: 1,
  title: "Rarebits",                    // <- Edit nama
  category: "Web Application",           // <- Edit kategori
  description: "Platform untuk...",      // <- Edit description
  tags: ["Next.js", "TypeScript"],       // <- Edit/tambah tags
  link: "https://rarebits.com",          // <- Link ke live site
  github: "https://github.com/...",      // <- Link ke repo
},
```

---

## ➕ Cara Tambah Projek Baru

### Langkah 1: Tambah dalam Array

```tsx
const projects = [
  // ... projek sedia ada ...

  // Tambah projek baru:
  {
    id: 5,  // Increment dari projek terakhir
    title: "Nama Projek Baru",
    category: "Mobile App",
    description: "Penerangan ringkas tentang projek ini dan apa yang ia buat.",
    image: "/projects/projek-baru.png",
    tags: ["React Native", "Firebase"],
    link: "https://projek-baru.com",
    github: "https://github.com/username/projek-baru",
  },
];
```

### Langkah 2: Letak Gambar

```
public/projects/projek-baru.png
```

---

## 🎨 Tips Gambar yang Cantik

### Screenshot yang Baik

1. **Pastikan interface bersih** - Tiada notification/popup
2. **Guna browser full screen** - Lebih professional
3. **Dark mode** - Sesuai dengan tema portfolio

### Edit Gambar (Optional)

Guna Figma/Photoshop untuk:
- Tambah subtle shadow
- Crop bahagian penting
- Adjust brightness jika terlalu terang

### Recommended Tools

- **Screenshot**: ShareX (Windows), CleanShot (Mac)
- **Edit**: Figma, Canva, Photoshop
- **Compress**: TinyPNG.com (untuk optimize size)

---

## 🚀 Selepas Update

### Test Locally

```bash
npm run dev
```

Buka `http://localhost:3000` dan check:
- Gambar load dengan betul
- Responsive di mobile
- Text readable di atas gambar

### Deploy

```bash
git add .
git commit -m "Update projek dengan gambar baru"
git push
```

---

## ❓ Troubleshooting

### Gambar Tak Muncul

1. Check path betul: `/projects/nama.png` (mesti ada `/` di depan)
2. Check nama fail sama dengan dalam code
3. Check gambar ada dalam `public/projects/`

### Gambar Blur/Pecah

- Guna gambar minimum 1200px width
- Format PNG untuk screenshot interface

### Text Tak Nampak

- Pastikan ada overlay gradient di atas gambar
- Adjust opacity gradient jika perlu

---

## 📞 Bantuan

Jika ada masalah, rujuk:
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
