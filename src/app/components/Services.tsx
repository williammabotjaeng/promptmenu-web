const Services: React.FC = () => {
    return (
      <section className="grid-x grid-padding-x" style={{ padding: '50px 20px', backgroundColor: '#1a1a1a' }}>
        <div className="cell small-12 text-center">
          <h2>Our Services</h2>
        </div>
        <div className="cell small-6 medium-3">
          <div className="card" style={{ backgroundColor: 'var(--non-photo-blue)', color: '#1a1a1a' }}>
            <div className="card-section">
              <h3>Talent Casting</h3>
              <p>We help you find the perfect talent for your project.</p>
            </div>
          </div>
        </div>
        <div className="cell small-6 medium-3">
          <div className="card" style={{ backgroundColor: 'var(--non-photo-blue)', color: '#1a1a1a' }}>
            <div className="card-section">
              <h3>Audition Management</h3>
              <p>We handle the entire audition process for you.</p>
            </div>
          </div>
        </div>
        <div className="cell small-6 medium-3">
          <div className="card" style={{ backgroundColor: 'var(--non-photo-blue)', color: '#1a1a1a' }}>
            <div className="card-section">
              <h3>Portfolio Development</h3>
              <p>We help you create a professional portfolio.</p>
            </div>
          </div>
        </div>
        <div className="cell small-6 medium-3">
          <div className="card" style={{ backgroundColor: 'var(--non-photo-blue)', color: '#1a1a1a' }}>
            <div className="card-section">
              <h3>Career Guidance</h3>
              <p>We provide expert advice to advance your career.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Services;