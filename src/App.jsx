import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Calendar, Clock, MapPin, Gift, Music } from 'lucide-react';
import './App.css';

// Komponen Partikel Bunga Jatuh
const FallingPetals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate 20 kelopak bunga dengan posisi dan delay acak
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
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
      audioRef.current.play();
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
      {/* Audio Element (Classic Wedding Song) */}
      <audio ref={audioRef} loop>
        <source src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Bridal_Chorus_%28Richard_Wagner%29.ogg" type="audio/ogg" />
      </audio>

      {/* Tampilkan Tombol Musik & Animasi Daun Jatuh hanya jika undangan sudah dibuka */}
      {isOpen && (
        <>
          <FallingPetals />
          <button className={`audio-btn ${isPlaying ? 'spin' : ''}`} onClick={toggleMusic}>
            <Music size={24} />
          </button>
        </>
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
            <motion.h1 variants={fadeUp} className="title">Ikhsan & Indah</motion.h1>
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
              <motion.h1 variants={fadeUp} className="title large">Ikhsan & Indah</motion.h1>
              <motion.div variants={fadeUp} className="scroll-indicator">
                <p>Scroll ke Bawah</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Turut Mengundang Section */}
          <section className="turut-mengundang-section">
            <div className="floral-corner floral-top-left"></div>
            <div className="floral-corner floral-bottom-right"></div>
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="turut-mengundang-content"
            >
              <motion.h2 variants={fadeUp} className="section-heading">Turut Mengundang</motion.h2>
              <motion.div variants={fadeUp} className="turut-mengundang-list">
                <p>Segenap Keluarga Besar Bapak Waryana & Ibu Yeti</p>
                <p>Segenap Keluarga Besar Bapak Suherman & Ibu Dina</p>
                <p>Serta Segenap Sahabat & Rekan-Rekan Kedua Mempelai</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Intro Section with Corner Florals */}
          <section className="intro-section">
            <div className="floral-corner floral-top-left"></div>
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="quran-text">
                "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
              </motion.p>
              <motion.p variants={fadeUp} className="quran-ref">
                Ar-Rum : 21
              </motion.p>
            </motion.div>
          </section>

          {/* Couple Section */}
          <section className="couple-section">
            <div className="couple-grid">
              
              <motion.div 
                className="couple-card groom"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
              >
                <div className="img-frame">
                  <img src="/hero.jpg" alt="Ikhsan" />
                </div>
                <div className="couple-info">
                  <h2>Ikhsan</h2>
                  <p>Putra dari Bapak Waryana<br/>& Ibu Yeti</p>
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
                <div className="img-frame">
                  <img src="/kak%20indah.jpeg" alt="Indah" />
                </div>
                <div className="couple-info">
                  <h2>Indah</h2>
                  <p>Putri dari Bapak Suherman<br/>& Ibu Dina</p>
                </div>
              </motion.div>

            </div>
          </section>

          {/* Events */}
          <section className="event-section">
            <div className="floral-corner floral-top-left"></div>
            <div className="floral-corner floral-bottom-right"></div>
            
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
                <motion.h3 variants={fadeUp}>Telah Dilaksanakan:<br/>Akad Nikah & Resepsi</motion.h3>
                <motion.div variants={fadeUp} className="event-detail-row">
                  <Calendar size={20} />
                  <span>5 Agustus 2026</span>
                </motion.div>
                <motion.div variants={fadeUp} className="event-detail-row address">
                  <MapPin size={24} />
                  <span>Leviticus 11</span>
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
                  <span>Jam 10 Pagi - Selesai</span>
                </motion.div>
                <motion.div variants={fadeUp} className="event-detail-row address">
                  <MapPin size={24} />
                  <span>Kediaman Bapak Waryana & Ibu Yeti<br/>Perumahan Puri Lakshita, Tajurhalang, Kab. Bogor</span>
                </motion.div>
                <motion.a 
                  variants={fadeUp}
                  href="https://maps.google.com/?q=Perumahan+Puri+Lakshita,+Tajurhalang,+Kabupaten+Bogor" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-outline"
                >
                  Lihat Lokasi
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* Closing / Doa Restu (Menggantikan Wedding Gift) */}
          <section className="gift-section">
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
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="footer-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2>Ikhsan & Indah</h2>
              <p>Terima Kasih</p>
            </motion.div>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
