// components/Hero.tsx
const Hero: React.FC = () => {
    return (
      <section className="grid-x grid-padding-x align-center-middle" style={{ 
        background: `linear-gradient(180deg, var(--blue-munsell), var(--moonstone))`, 
        padding: '100px 20px', 
        color: '#fff' 
      }}>
        <div className="cell small-12 text-center">
          <h2>Welcome to Our Casting Agency</h2>
          <p>Your journey to stardom starts here!</p>
          <button className="button" style={{ backgroundColor: 'var(--blue-munsell-2)' }}>
            Get Started
          </button>
        </div>
      </section>
    );
  };
  
  export default Hero;