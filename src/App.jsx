import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Intersection Observer Hook for scroll animations
function useOnScreen(options) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
}

const FadeInSection = ({ children, delay = '' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${delay}`}
    >
      {children}
    </div>
  );
};


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Sound playback logic would go here
  };

  if (!isOpen) {
    return (
      <div className="app-container">
        <section className="cover-section">
          <div className="animate-fade-in">
            <p className="save-the-date">The Wedding Of</p>
            <h1>Ikhsan & Indah</h1>
            <p className="save-the-date" style={{ marginTop: '1rem', letterSpacing: '6px' }}>25 . 08 . 2026</p>
          </div>
          <button 
            className="btn-open animate-fade-in delay-2" 
            style={{ marginTop: '4rem' }}
            onClick={handleOpen}
          >
            Buka Undangan
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Inner Hero Header */}
      <section className="cover-section inner-hero animate-fade-in">
        <p className="save-the-date">We Are Getting Married</p>
        <h1>Ikhsan & Indah</h1>
      </section>

      {/* Couple Section */}
      <section className="couple-section">
        <FadeInSection>
          <p className="greeting">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang..." <br/><br/>
            (QS. Ar-Rum: 21)
          </p>
        </FadeInSection>

        <FadeInSection delay="delay-1">
          <div className="person">
            <div className="person-img-wrapper">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Groom" className="person-img" />
            </div>
            <h2>Ikhsan</h2>
            <p>Putra dari Bapak Fulan & Ibu Fulanah</p>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="ampersand">&</div>
        </FadeInSection>

        <FadeInSection delay="delay-1">
          <div className="person">
            <div className="person-img-wrapper">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Bride" className="person-img" />
            </div>
            <h2>Indah</h2>
            <p>Putri dari Bapak Fulan & Ibu Fulanah</p>
          </div>
        </FadeInSection>
      </section>

      {/* Event Section */}
      <section className="event-section">
        <FadeInSection>
          <h2 className="section-title">Detail Acara</h2>
        </FadeInSection>
        
        <FadeInSection delay="delay-1">
          <div className="event-card glass">
            <h3>Akad Nikah</h3>
            <div className="event-details">
              <p><strong>Minggu, 25 Agustus 2026</strong></p>
              <p>Pukul 08:00 - 10:00 WIB</p>
              <p style={{marginTop: '1rem'}}>Masjid Agung Al-Hidayah<br/>Jl. Kebahagiaan No. 1, Jakarta</p>
            </div>
            <a href="#" className="btn-map">Buka di Google Maps</a>
          </div>
        </FadeInSection>

        <FadeInSection delay="delay-2">
          <div className="event-card glass">
            <h3>Resepsi</h3>
            <div className="event-details">
              <p><strong>Minggu, 25 Agustus 2026</strong></p>
              <p>Pukul 11:00 - Selesai</p>
              <p style={{marginTop: '1rem'}}>Gedung Serbaguna Indah<br/>Jl. Kenangan No. 99, Jakarta</p>
            </div>
            <a href="#" className="btn-map">Buka di Google Maps</a>
          </div>
        </FadeInSection>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <FadeInSection>
          <h2 className="section-title">Galeri</h2>
        </FadeInSection>
        <div className="gallery-grid">
          <FadeInSection><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gallery 1" className="gallery-item large" /></FadeInSection>
          <FadeInSection delay="delay-1"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Gallery 2" className="gallery-item" /></FadeInSection>
          <FadeInSection delay="delay-2"><img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Gallery 3" className="gallery-item" /></FadeInSection>
          <FadeInSection delay="delay-1"><img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gallery 4" className="gallery-item large" /></FadeInSection>
        </div>
      </section>

      {/* Gift Section */}
      <section className="gift-section">
        <FadeInSection>
          <h2 className="section-title">Amplop Digital</h2>
          <p>Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.</p>
        </FadeInSection>
        
        <FadeInSection delay="delay-1">
          <div className="bank-card">
            <div className="bank-name">BCA</div>
            <div className="bank-number">1234 5678 90</div>
            <div className="bank-owner">a.n. Ikhsan</div>
          </div>
        </FadeInSection>

        <FadeInSection delay="delay-2">
          <div className="bank-card">
            <div className="bank-name">MANDIRI</div>
            <div className="bank-number">0987 6543 21</div>
            <div className="bank-owner">a.n. Indah</div>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <section className="footer">
        <FadeInSection>
          <p className="greeting" style={{ marginBottom: '2rem' }}>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.</p>
          <h2>Ikhsan & Indah</h2>
          <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Created with ♥ for You</p>
        </FadeInSection>
      </section>
    </div>
  );
}

export default App;
