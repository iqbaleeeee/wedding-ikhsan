import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Calendar, Clock, MapPin, Gift, Music } from 'lucide-react';
import './App.css';

// Komponen Partikel Bunga Jatuh
const FallingPetals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate 40 kelopak bunga dengan posisi dan delay acak
    const newPetals = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      width: `${Math.random() * 15 + 10}px`,
      height: `${Math.random() * 15 + 10}px`,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="petals-container">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: petal.width,
            height: petal.height,
            animationDuration: `${petal.animationDuration}, ${petal.animationDuration}`,
            animationDelay: `${petal.animationDelay}, ${petal.animationDelay}`
          }}
        />
      ))}
    </div>
  );
};

// Corak Gunungan (Custom SVG Motif)
const GununganSVG = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', opacity: 0.8 }}>
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5 C75 40, 95 65, 95 95 L5 95 C5 65, 25 40, 50 5 Z" fill="var(--primary-light)" fillOpacity="0.15" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M50 20 C65 45, 80 65, 80 95 L20 95 C20 65, 35 45, 50 20 Z" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" strokeLinejoin="round"/>
      <path d="M50 40 C55 60, 65 75, 65 95 L35 95 C35 75, 45 60, 50 40 Z" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="0" y1="95" x2="100" y2="95" stroke="var(--primary)" strokeWidth="3" />
    </svg>
  </div>
);

// Komponen Hitung Mundur (Countdown)
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target hari H: 8 Agustus 2026
    const targetDate = new Date("August 8, 2026 08:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-item">
        <span className="number">{timeLeft.days}</span>
        <span className="label">Hari</span>
      </div>
      <div className="countdown-item">
        <span className="number">{timeLeft.hours}</span>
        <span className="label">Jam</span>
      </div>
      <div className="countdown-item">
        <span className="number">{timeLeft.minutes}</span>
        <span className="label">Menit</span>
      </div>
      <div className="countdown-item">
        <span className="number">{timeLeft.seconds}</span>
        <span className="label">Detik</span>
      </div>
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Framer motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  const openInvitation = () => {
    setIsOpen(true);
    // Mainkan musik saat undangan dibuka
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsPlaying(true);
    }
    window.scrollTo(0, 0);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-wrapper">
      {/* Audio Element (Nusantara Theme) */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.webm" type="audio/webm" />
      </audio>

      {/* Tampilkan Animasi Daun Jatuh hanya jika undangan sudah dibuka */}
      {isOpen && (
        <FallingPetals />
      )}

      {/* Cover Screen */}
      <motion.div 
        className="cover-screen"
        initial={false}
        animate={{ y: isOpen ? '-100vh' : 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      >
        {!isOpen && (
          <motion.div 
            className="cover-content"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="subtitle">Ngunduh Mantu</motion.p>
            <motion.h1 variants={fadeUp} className="title">Ikhsan Pratama Nuriana<br/>&<br/>Indah Nur Octaviani</motion.h1>
            <motion.div variants={fadeUp} className="date-badge">
              <span>08</span>
              <span className="divider">/</span>
              <span>08</span>
              <span className="divider">/</span>
              <span>2026</span>
            </motion.div>
            <motion.button 
              variants={fadeUp}
              className="btn-open-envelope" 
              onClick={openInvitation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="heart-icon" size={20} />
              Buka Undangan
            </motion.button>
          </motion.div>
        )}
        <div className="cover-bg" style={{ backgroundImage: 'url(/hero.jpg)' }}></div>
        <div className="cover-overlay"></div>
      </motion.div>

      {isOpen && (
        <main className="main-content">
          {/* Hero Section */}
          <section className="hero-section">
            <motion.div className="hero-bg" style={{ y: yHero, opacity: opacityHero, backgroundImage: 'url(/hero.jpg)' }}></motion.div>
            <div className="hero-overlay"></div>
            <motion.div 
              className="hero-text"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={fadeUp} className="subtitle">Ngunduh Mantu</motion.p>
              <motion.h1 variants={fadeUp} className="title large">Ikhsan Pratama Nuriana<br/>&<br/>Indah Nur Octaviani</motion.h1>
              <motion.div variants={fadeUp} className="scroll-indicator">
                <p>Scroll ke Bawah</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Turut Mengundang Section */}
          <section className="turut-mengundang-section">
            <div className="floral-corner floral-top-right"></div>
            <div className="floral-corner floral-bottom-left"></div>
            <GununganSVG />
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="turut-mengundang-content"
            >
              <motion.h2 variants={fadeUp} className="section-heading">Turut Mengundang</motion.h2>
              <motion.div variants={fadeUp} className="turut-mengundang-list">
                <p>1. Segenap Keluarga Besar Bapak Waryana & Ibu Yeti Nurhayati</p>
                <p>2. Segenap Keluarga Besar Bapak Suherman & Ibu Dina</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Intro Section with Corner Florals */}
          <section className="intro-section">
            <div className="floral-corner floral-top-left"></div>
            <GununganSVG />
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUp} className="greeting-text">
                Assalamu'alaikum Warahmatullahi Wabarakatuh
              </motion.h3>
              <motion.p variants={fadeUp} className="intro-paragraph">
                Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan di antara putra-putri kami.
              </motion.p>
              <motion.p variants={fadeUp} className="quran-text">
                "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
              </motion.p>
              <motion.p variants={fadeUp} className="quran-ref">
                (QS. Ar-Rum : 21)
              </motion.p>
              <motion.p variants={fadeUp} className="intro-paragraph bottom-text">
                Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Ngunduh Mantu putra-putri kami.
              </motion.p>
            </motion.div>
          </section>

          {/* Prewedding Photo Section */}
          <section className="prewedding-section">
            <div className="floral-corner floral-top-left"></div>
            <div className="floral-corner floral-bottom-right"></div>
            <GununganSVG />
            <motion.h2 
              className="section-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '2rem' }}
            >
              Galeri Pre-Wedding
            </motion.h2>
            <div className="prewedding-gallery">
              {[
                '/prewed1.jpg',
                '/prewed2.jpeg',
                '/prewed3.jpeg',
                '/prewed4.png'
              ].map((src, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="gallery-item"
                >
                  <img src={src} alt={`Prewedding ${index + 1}`} className="prewedding-img" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Couple Section */}
          <section className="couple-section">
            <div className="floral-corner floral-top-right"></div>
            <div className="floral-corner floral-bottom-left"></div>
            <div className="couple-grid">
              
              <motion.div 
                className="couple-card groom"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
              >
                <div className="couple-info text-only">
                  <h2>Ikhsan Pratama Nuriana</h2>
                  <p className="parents-text">Putra dari Bapak Waryana<br/>& Ibu Yeti Nurhayati</p>
                </div>
              </motion.div>

              <div className="ampersand-elegant">&</div>

              <motion.div 
                className="couple-card bride"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="couple-info text-only">
                  <h2>Indah Nur Octaviani</h2>
                  <p className="parents-text">Putri dari Bapak Suherman<br/>& Ibu Dina</p>
                </div>
              </motion.div>

            </div>
          </section>

          {/* Events */}
          <section className="event-section">
            <div className="floral-corner floral-top-left"></div>
            <div className="floral-corner floral-bottom-right"></div>
            
            <GununganSVG />
            <motion.h2 
              className="section-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Rangkaian Acara
            </motion.h2>

            {/* Countdown Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <CountdownTimer />
            </motion.div>

            <div className="event-cards">
              <motion.div 
                className="event-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                <motion.h3 variants={fadeUp}>Akan Dilaksanakan:<br/>Akad Nikah & Resepsi</motion.h3>
                <motion.div variants={fadeUp} className="event-detail-row">
                  <Calendar size={20} />
                  <span>5 Agustus 2026</span>
                </motion.div>
                <motion.div variants={fadeUp} className="event-detail-row address">
                  <MapPin size={24} />
                  <span>Leviticus 11</span>
                </motion.div>
                <motion.div variants={fadeUp} className="event-note" style={{ marginTop: '15px', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent)', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--accent)'}}>
                  *Acara ini telah berlangsung. Undangan ini adalah untuk menghadiri resepsi Ngunduh Mantu di rumah pada tanggal 8 Agustus.
                </motion.div>
              </motion.div>

              <motion.div 
                className="event-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                <motion.h3 variants={fadeUp}>Ngunduh Mantu</motion.h3>
                <motion.div variants={fadeUp} className="event-detail-row">
                  <Calendar size={20} />
                  <span>8 Agustus 2026</span>
                </motion.div>
                <motion.div variants={fadeUp} className="event-detail-row">
                  <Clock size={20} />
                  <span>Jam 10 Pagi - 19.00</span>
                </motion.div>
                <motion.div variants={fadeUp} className="event-detail-row address">
                  <MapPin size={24} />
                  <span>Kediaman Bapak Waryana & Ibu Yeti<br/>Perumahan Puri Lakshita No B12A RT 001 RW 006, Tajurhalang, Kab. Bogor</span>
                </motion.div>
                <motion.div variants={fadeUp} className="map-container" style={{ width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', border: '2px solid var(--primary-light)' }}>
                  <iframe 
                    src="https://maps.google.com/maps?q=Perumahan%20Puri%20Lakshita,%20Tajurhalang,%20Kabupaten%20Bogor&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </motion.div>
                <motion.a 
                  variants={fadeUp}
                  href="https://maps.google.com/?q=Perumahan+Puri+Lakshita,+Tajurhalang,+Kabupaten+Bogor" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-outline"
                >
                  Buka di Aplikasi Google Maps
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* Closing / Doa Restu (Menggantikan Wedding Gift) */}
          <section className="gift-section">
            <div className="floral-corner floral-top-left"></div>
            <div className="floral-corner floral-top-right"></div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="gift-icon-wrapper">
                <Heart size={40} />
              </motion.div>
              <motion.h2 variants={fadeUp} className="section-heading">Ungkapan Terima Kasih</motion.h2>
              <motion.p variants={fadeUp} className="gift-text">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
                <br/><br/>
                Atas kehadiran dan doa restunya, kami ucapkan terima kasih yang sebesar-besarnya. Semoga rahmat dan berkah senantiasa menyertai kita semua.
              </motion.p>
              <br/>
              <motion.div variants={fadeUp} className="arabic-prayer" style={{ fontSize: '1.5rem', marginTop: '1rem', lineHeight: '2', fontFamily: 'serif' }}>
                بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                <p style={{ fontSize: '1rem', marginTop: '0.8rem', fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>
                  "Semoga Allah memberkahimu dan menetapkan keberkahan atasmu, serta mengumpulkan kalian berdua dalam kebaikan."
                </p>
              </motion.div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="footer-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="footer-content"
            >
              <h3 className="footer-greeting">Wassalamu'alaikum Warahmatullahi Wabarakatuh</h3>
              <p className="footer-message">Kehadiran Anda adalah anugerah terbesar dalam lembaran baru kehidupan kami.</p>
              
              <div className="footer-family">
                <p>Kami yang berbahagia,</p>
                <p>Kel. Bpk Waryana & Ibu Yeti Nurhayati</p>
                <p>Kel. Bpk Suherman & Ibu Dina</p>
              </div>

              <h2 className="footer-names">Ikhsan Pratama Nuriana & Indah Nur Octaviani</h2>
              <div className="footer-bottom-line"></div>
            </motion.div>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
