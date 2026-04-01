import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  CheckCircle2, 
  MessageCircle, 
  Instagram, 
  ArrowRight, 
  Menu, 
  X,
  Database,
  Palette,
  Type,
  Camera,
  PlusCircle,
  HelpCircle,
  CreditCard,
  Calendar
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#tentang' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Harga', href: '#harga' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src="https://i.ibb.co.com/M5SFX09k/Playful-Logo-with-Cheerful-Girl-Character-1-removebg-preview.png" 
            alt="Teman Kerja Online Logo" 
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-700 hover:text-[#DD2D4A] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/6289669184369" 
            target="_blank"
            className="bg-[#DD2D4A] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden py-6 px-6 flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-800"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/6289669184369" 
              className="bg-[#DD2D4A] text-white py-3 rounded-xl text-center font-bold"
            >
              Hubungi Kami
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
}

const Accordion = ({ title, children, icon: Icon }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-center space-x-4">
          {Icon && <div className="p-2 bg-[#F1D1D6] rounded-lg text-[#DD2D4A]"><Icon size={20} /></div>}
          <span className="font-bold text-gray-800 group-hover:text-[#DD2D4A] transition-colors">{title}</span>
        </div>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#DD2D4A]' : 'text-gray-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-14 text-gray-600 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Slider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl bg-white">
      <div className="aspect-[16/9] md:aspect-[21/9] flex items-center justify-center bg-gray-50">
        <img 
          src={images[currentIndex]} 
          alt={`Portfolio ${currentIndex}`} 
          className="max-h-full max-w-full object-contain transition-opacity duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronDown className="rotate-90" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronDown className="-rotate-90" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-[#DD2D4A]' : 'w-1.5 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#F1D1D6] selection:text-[#DD2D4A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#F1D1D6] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#DD2D4A]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#F1D1D6] text-[#DD2D4A] text-xs font-bold tracking-widest uppercase rounded-full mb-6">
              Partner Kerja Terpercaya
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              TEMAN KERJA <span className="text-[#DD2D4A]">ONLINE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
              Teman Setia di setiap tugasmu
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#layanan" 
                className="w-full sm:w-auto bg-[#DD2D4A] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Lihat Layanan <ArrowRight size={20} />
              </a>
              <a 
                href="#portfolio" 
                className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
              >
                Portofolio Kami
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section id="tentang" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-gray-900 uppercase tracking-tight">
              TENTANG <span className="text-[#DD2D4A]">KAMI</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">TEMAN KERJA ONLINE</strong> hadir sebagai partner yang siap bantu kamu menyelesaikan pekerjaan harian dengan lebih ringan dan teratur. Kami percaya, tidak semua tugas harus kamu kerjakan sendiri.
              </p>
              <p>
                Kami membantu pekerjaan seperti data entry, desain, jasa ketik dan remake wajah AI dengan cara kerja yang fleksibel, komunikatif, dan mudah diajak koordinasi.
              </p>
              <div className="p-6 bg-white rounded-2xl border-l-4 border-[#DD2D4A] shadow-sm max-w-2xl mx-auto">
                <p className="font-bold text-gray-800 italic">
                  "Butuh support tambahan tanpa harus rekrut karyawan tetap? TEMAN KERJA ONLINE siap jadi solusi praktis untuk kamu."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Layanan (Accordion) */}
      <section id="layanan" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">APA YANG BISA KAMI KERJAKAN?</h2>
            <div className="w-20 h-1.5 bg-[#DD2D4A] mx-auto rounded-full" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-4 md:p-8">
            <Accordion title="DATA ENTRY" icon={Database}>
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Menginput data ke Excel / Google Sheets dengan rapi dan akurat</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Merekap data penjualan, stok, atau daftar pelanggan</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Merapikan data agar tidak berantakan</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Mengelompokkan data sesuai kebutuhan (tanggal, kategori, dll)</li>
              </ul>
            </Accordion>

            <Accordion title="JASA DESAIN" icon={Palette}>
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Membuat desain poster promosi sederhana</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Mendesain feed Instagram yang clean dan konsisten</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Membuat cover konten (YouTube, e-book, dll)</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Mengedit template Canva sesuai kebutuhan brand</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Desain basic yang siap dipakai tanpa konsep rumit</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-[#DD2D4A] mt-1 shrink-0" /> Desain cover E-Book</li>
              </ul>
            </Accordion>

            <Accordion title="JASA KETIK" icon={Type}>
              <p className="mb-4">Gak perlu pusing ngetik ulang! Kami bantu konversi PDF/Gambar/Tulisan Tangan ke Word & Excel dengan hasil rapi, teliti, dan tepat waktu. Data aman, privasi terjamin, dan ada garansi revisi. Serahkan tugasmu, kami selesaikan!</p>
            </Accordion>

            <Accordion title="JASA EDIT FOTO AI (Remake Wajah)" icon={Camera}>
              <p>Punya foto lama yang buram, hitam putih, atau rusak? Sekarang bisa diperbaiki dan dibuat lebih hidup dengan teknologi AI! Kami menyediakan jasa edit foto berbasis AI untuk memperbaiki dan mengubah foto lama menjadi lebih jelas, berwarna, dan terlihat seperti baru.</p>
            </Accordion>

            <Accordion title="LAYANAN LAIN" icon={PlusCircle}>
              <p>Jika ada pekerjaan online selain layanan di atas yang ingin dibantu, kami siap membantu dengan senang hati. Bisa diskusi santai dulu supaya semuanya jelas dan sesuai kebutuhanmu.</p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">PORTFOLIO</h2>
            <p className="text-gray-400 font-medium">Bukti nyata hasil kerja keras kami</p>
          </div>

          {/* Data Entry Portfolio */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-2 bg-[#DD2D4A] rounded-full" />
              <h3 className="text-2xl font-bold uppercase tracking-widest">DATA ENTRY</h3>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-white h-[450px] relative group">
                <iframe 
                  src="https://docs.google.com/spreadsheets/d/1mS41WyFvNfILXLVLLnOx9pMC6-M4lgg7pEVRETMqNLQ/edit?usp=sharing&rm=minimal" 
                  className="w-full h-full border-0"
                  title="Spreadsheet Portfolio"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a 
                    href="https://docs.google.com/spreadsheets/d/1mS41WyFvNfILXLVLLnOx9pMC6-M4lgg7pEVRETMqNLQ/edit?usp=sharing" 
                    target="_blank"
                    className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    Buka Spreadsheet <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700">
                  <h4 className="text-xl font-bold text-[#F1D1D6] mb-4 flex items-center gap-2">
                    Project: Greenleaf Eco-Store Tracker 🌿
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Ini dummy project yang TEMAN KERJA ONLINE bikin untuk simulasi sistem kumpulan data simpel. Intinya sih buat nunjukin gimana cara kelola data jualan biar serba otomatis.
                  </p>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#DD2D4A]/20 text-[#DD2D4A] rounded-full flex items-center justify-center shrink-0">•</div>
                      <span><strong>Gak Pakai Manual:</strong> Harga produk otomatis muncul pakai VLOOKUP, jadi nggak perlu ngetik satu-satu.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#DD2D4A]/20 text-[#DD2D4A] rounded-full flex items-center justify-center shrink-0">•</div>
                      <span><strong>Input Rapih:</strong> Udah ada drop-down menu buat pilih kategori & metode bayar biar datanya konsisten.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#DD2D4A]/20 text-[#DD2D4A] rounded-full flex items-center justify-center shrink-0">•</div>
                      <span><strong>Rekap Otomatis:</strong> Pakai SUMIFS sama Nested IF buat hitung total jualan dan kategori secara instan.</span>
                    </li>
                  </ul>
                </div>
                <p className="text-lg font-medium text-gray-400 italic border-l-2 border-[#DD2D4A] pl-6">
                  Fokus TEMAN KERJA ONLINE bukan hanya memasukkan data, tetapi memastikan data terstruktur, mudah dibaca, dan siap dianalisis.
                </p>
              </div>
            </div>
          </div>

          {/* Design Portfolio */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-2 bg-[#DD2D4A] rounded-full" />
              <h3 className="text-2xl font-bold uppercase tracking-widest">DESAIN BANNER</h3>
            </div>
            <div className="space-y-12">
              <Slider images={[
                "https://cdn.phototourl.com/free/2026-04-01-a2e52274-2534-45e4-9b65-6a9c52284321.png",
                "https://cdn.phototourl.com/free/2026-04-01-626b67a1-662e-44a2-bd7f-287547e90a1d.png",
                "https://cdn.phototourl.com/free/2026-04-01-7af8129b-54fb-4c0a-b8be-e6708706e586.png",
                "https://cdn.phototourl.com/free/2026-04-01-77978d2c-62f6-4491-909c-7bcb2ab3c35c.png",
                "https://cdn.phototourl.com/free/2026-04-01-d23f927d-349c-4dce-a1e5-ee9383667eb4.png",
                "https://cdn.phototourl.com/free/2026-04-01-30d7aba0-85d1-4a3a-8de8-97d5d097fe96.png"
              ]} />
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>Kumpulan desain ini merupakan hasil eksplorasi berbagai kebutuhan visual promosi — mulai dari kuliner, fashion, hingga campaign digital.</p>
                  <p>Setiap desain dibuat dengan menyesuaikan karakter brand dan target audiensnya. Visual yang menggugah selera, layout yang clean dan modern, hingga desain yang bold dan eye-catching untuk media sosial, semuanya dirancang dengan konsep yang berbeda namun tetap komunikatif.</p>
                </div>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>Dalam proses pengerjaan, TEMAN KERJA ONLINE menggunakan Canva sebagai tools utama untuk layouting, komposisi, dan finalisasi desain. Selain itu, TEMAN KERJA ONLINE juga memanfaatkan bantuan AI (Artificial Intelligence) untuk eksplorasi ide visual, referensi gambar, dan pengembangan konsep kreatif.</p>
                  <p className="text-[#F1D1D6] font-bold">Portofolio ini menunjukkan kemampuan TEMAN KERJA ONLINE dalam menggabungkan kreativitas dan teknologi untuk menghasilkan desain promosi yang menarik dan siap digunakan untuk kebutuhan marketing digital.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Photo Portfolio */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-2 bg-[#DD2D4A] rounded-full" />
              <h3 className="text-2xl font-bold uppercase tracking-widest">JASA EDIT FOTO AI</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://cdn.phototourl.com/free/2026-04-01-1fb12d6e-79d8-441f-bffb-19b7263a891d.png" 
                  alt="AI Photo 1" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://cdn.phototourl.com/free/2026-04-01-a845c18f-ac5a-481a-967d-a81126e229b7.png" 
                  alt="AI Photo 2" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xl font-medium text-[#F1D1D6]">
                Bikin fotomu lebih jernih, ganti outfit, atau ubah latar belakang hanya dengan satu klik. Hasil natural, pengerjaan cepat, dan harga bersahabat!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kenapa Pilih Kami */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black mb-4">KENAPA PILIH TEMAN KERJA ONLINE?</h2>
            <div className="w-20 h-1.5 bg-[#DD2D4A] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Praktis & Gak Ribet", desc: "Langsung fokus ke kerjaan. Komunikasi jelas, proses simpel." },
              { title: "Fleksibel", desc: "Bisa disesuaikan dengan kebutuhan kamu. Tugas ringan? Bisa. Bantuan rutin? Siap!" },
              { title: "Harga Lebih Terjangkau", desc: "Solusi praktis untuk bantu kerjaan digital tanpa biaya besar." },
              { title: "Responsif & Mudah Diajak Koordinasi", desc: "Nggak ghosting, update jelas, dan enak diajak kerja bareng." },
              { title: "Cocok untuk UMKM & Personal Brand", desc: "Solusi hemat tanpa harus rekrut karyawan tetap." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-[#F1D1D6] text-[#DD2D4A] rounded-2xl flex items-center justify-center mb-6 font-black text-xl">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section (Marquee) */}
      <section className="py-20 bg-gray-50 overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-2xl font-black text-gray-400 uppercase tracking-widest">TOOLS YANG KAMI GUNAKAN</h2>
        </div>
        
        <div className="flex overflow-hidden select-none marquee-container">
          <div className="flex flex-nowrap flex-shrink-0 animate-marquee items-center space-x-12 md:space-x-16 py-4 pr-12 md:pr-16 whitespace-nowrap">
            {[
              "https://cdn.phototourl.com/member/2026-04-01-a3ce71b7-6b5d-41a8-ba22-50f2ae1fb113.png",
              "https://cdn.phototourl.com/member/2026-04-01-4b20e42f-4ae8-4307-97ed-20e98021e2f2.jpg",
              "https://cdn.phototourl.com/free/2026-04-01-9c4182c4-c632-4c5f-928d-a2c82697bfa8.png",
              "https://cdn.phototourl.com/member/2026-04-01-59565dd3-d78c-4a86-92d9-c9726166e65c.png",
              "https://cdn.phototourl.com/member/2026-04-01-f33fb16c-db73-4c71-ab40-f32035c2261c.jpg",
              "https://cdn.phototourl.com/member/2026-04-01-e436247a-1ddd-4cb7-b815-ccec2bd4345a.png",
              "https://cdn.phototourl.com/member/2026-04-01-e5644e8d-5e88-4d88-a412-e45e9b4bf5f0.png"
            ].map((logo, i) => (
              <img key={i} src={logo} alt="Tool Logo" className="h-10 md:h-14 w-auto flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex flex-nowrap flex-shrink-0 animate-marquee items-center space-x-12 md:space-x-16 py-4 pr-12 md:pr-16 whitespace-nowrap">
            {[
              "https://cdn.phototourl.com/member/2026-04-01-a3ce71b7-6b5d-41a8-ba22-50f2ae1fb113.png",
              "https://cdn.phototourl.com/member/2026-04-01-4b20e42f-4ae8-4307-97ed-20e98021e2f2.jpg",
              "https://cdn.phototourl.com/free/2026-04-01-9c4182c4-c632-4c5f-928d-a2c82697bfa8.png",
              "https://cdn.phototourl.com/member/2026-04-01-59565dd3-d78c-4a86-92d9-c9726166e65c.png",
              "https://cdn.phototourl.com/member/2026-04-01-f33fb16c-db73-4c71-ab40-f32035c2261c.jpg",
              "https://cdn.phototourl.com/member/2026-04-01-e436247a-1ddd-4cb7-b815-ccec2bd4345a.png",
              "https://cdn.phototourl.com/member/2026-04-01-e5644e8d-5e88-4d88-a412-e45e9b4bf5f0.png"
            ].map((logo, i) => (
              <img key={i} src={logo} alt="Tool Logo" className="h-10 md:h-14 w-auto flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">SOLUSI SUPPORT YANG TEPAT UNTUKMU</h2>
            <p className="text-gray-500 font-medium">Pilih paket yang sesuai dengan kebutuhan bisnismu</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Data Entry */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all flex flex-col">
              <h4 className="text-sm font-black text-[#DD2D4A] uppercase tracking-widest mb-2">DATA ENTRY</h4>
              <div className="mb-6">
                <span className="text-3xl font-black text-gray-900">Rp 1.000.000</span>
                <span className="text-gray-400 text-sm">/Bulan</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Input data Excel / Sheet</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Copy–paste & rapikan</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Maks 3–4 jam kerja</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Revisi ringan</li>
              </ul>
              <div className="pt-6 border-t border-gray-50 mt-auto">
                <p className="text-xs text-gray-500 mb-4 italic">Cocok untuk UMKM & online shop yang butuh bantuan rutin.</p>
                <div className="bg-gray-50 p-3 rounded-xl text-center font-bold text-gray-700 text-sm">
                  Harian: Rp 80.000
                </div>
              </div>
            </div>

            {/* Desain */}
            <div className="bg-gray-900 p-8 rounded-3xl border-4 border-[#DD2D4A] shadow-2xl hover:scale-105 transition-all flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#DD2D4A] text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                Populer
              </div>
              <h4 className="text-sm font-black text-[#F1D1D6] uppercase tracking-widest mb-2">DESAIN</h4>
              <div className="mb-6">
                <span className="text-3xl font-black text-white">Rp 350.000</span>
                <span className="text-gray-500 text-sm">/Bulan</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#DD2D4A]" /> 8–12 Desain</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#DD2D4A]" /> Revisi ringan</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#DD2D4A]" /> Feed matching warna</li>
              </ul>
              <div className="pt-6 border-t border-gray-800 mt-auto">
                <p className="text-xs text-gray-400 mb-4 italic">Cocok untuk yang baru mulai dan konten tidak terlalu banyak.</p>
                <div className="bg-[#DD2D4A] p-3 rounded-xl text-center font-bold text-white text-sm">
                  Satuan: Rp 30.000
                </div>
              </div>
            </div>

            {/* Jasa Ketik */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all flex flex-col">
              <h4 className="text-sm font-black text-[#DD2D4A] uppercase tracking-widest mb-2">JASA KETIK</h4>
              <div className="mb-6">
                <span className="text-3xl font-black text-gray-900">Rp 80.000</span>
                <span className="text-gray-400 text-sm">/Project</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> PDF ke Word / Excel</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Gambar / Scan / Tulis Tangan</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Hasil rapi & teliti</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Kerahasiaan terjamin</li>
              </ul>
              <div className="pt-6 border-t border-gray-50 mt-auto">
                <p className="text-xs text-gray-500 italic">Cocok untuk yang tidak punya waktu mengetik ulang tulisan.</p>
              </div>
            </div>

            {/* AI Photo */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all flex flex-col">
              <h4 className="text-sm font-black text-[#DD2D4A] uppercase tracking-widest mb-2">EDIT FOTO AI</h4>
              <div className="mb-6">
                <span className="text-3xl font-black text-gray-900">Rp 20.000</span>
                <span className="text-gray-400 text-sm">/Kepala</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Ganti Background Custom</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Perbaikan Wajah Otomatis</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Restorasi Foto Lama</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Gaya CV / LinkedIn / Sosmed</li>
              </ul>
              <div className="pt-6 border-t border-gray-50 mt-auto">
                <p className="text-xs text-gray-500 italic">Hasil cepat, realistis, dan sentuhan AI terbaru.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metode Pembayaran */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-gray-400 uppercase tracking-widest mb-12">METODE PEMBAYARAN</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <img 
              src="https://cdn.phototourl.com/member/2026-04-01-8d28ed09-d2ea-4275-bb92-a01bcb5d41f1.png" 
              alt="Gopay" 
              className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://cdn.phototourl.com/free/2026-04-01-d660e64d-77d4-451f-b7d4-776e6e5e6c6b.png" 
              alt="Bank Jago" 
              className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">FAQ</h2>
            <div className="w-20 h-1.5 bg-[#DD2D4A] mx-auto rounded-full" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-4 md:p-8">
            <Accordion title="Cara Kerja" icon={HelpCircle}>
              <div className="flex flex-col space-y-4">
                {[
                  "Kamu memesan jasa",
                  "Kamu memberikan instruksi",
                  "Diskusi Harga",
                  "TEMAN KERJA ONLINE mengerjakan sesuai instruksi",
                  "Kamu melakukan pembayaran",
                  "Pengiriman File"
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#F1D1D6] text-[#DD2D4A] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion title="Metode Pembayaran" icon={CreditCard}>
              <p>Saat ini TEMAN KERJA ONLINE hanya memiliki 2 metode pembayaran yaitu menggunakan <strong>Gopay & Bank Jago</strong>.</p>
            </Accordion>

            <Accordion title="Metode Pemesanan" icon={Calendar}>
              <p>Diharapkan memesan <strong>H-2 deadline</strong> untuk data entry dan jasa ketik agar hasil maksimal dan tepat waktu.</p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer / Kontak */}
      <footer className="bg-gray-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <img 
                src="https://i.ibb.co.com/M5SFX09k/Playful-Logo-with-Cheerful-Girl-Character-1-removebg-preview.png" 
                alt="Logo Footer" 
                className="h-20 w-auto mb-8 brightness-0 invert"
              />
              <h3 className="text-3xl font-black mb-6">SIAP JADI SOLUSI PRAKTIS UNTUKMU</h3>
              <p className="text-gray-400 text-lg max-w-md">
                Jangan biarkan tugas harian menghambat produktivitasmu. Serahkan pada kami, fokus pada apa yang paling penting bagimu.
              </p>
            </div>

            <div id="kontak" className="space-y-12">
              <div>
                <h4 className="text-sm font-black text-[#DD2D4A] uppercase tracking-widest mb-6">KONTAK KAMI</h4>
                <div className="space-y-6">
                  <a 
                    href="https://wa.me/6289669184369" 
                    target="_blank"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                      <MessageCircle size={28} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">WhatsApp</p>
                      <p className="text-xl font-bold">6289669184369</p>
                    </div>
                  </a>
                  <a 
                    href="https://instagram.com/temankerjaonline" 
                    target="_blank"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 bg-pink-500/10 text-pink-500 rounded-2xl flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all">
                      <Instagram size={28} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Instagram</p>
                      <p className="text-xl font-bold">@temankerjaonline</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TEMAN KERJA ONLINE. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WA Button */}
      <a 
        href="https://wa.me/6289669184369" 
        target="_blank"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
