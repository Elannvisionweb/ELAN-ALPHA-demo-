import { useEffect } from 'react';
import './VerticalMarquee.css';

function VerticalMarquee() {
  useEffect(() => {
    function move() {
      const marquee = document.querySelector('.vertical-marquee');
      if (!marquee) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      // Combine continuous animation with subtle scroll-based offset
      marquee.style.animationDelay = `${-scrollTop * 0.01}s`;
    }
    window.addEventListener('scroll', move);
    return () => {
      window.removeEventListener('scroll', move);
    };
  }, []);

  const marqueeItems = Array(40).fill("Elan and nVision 2027");

  return (
    <div className='vertical-marquee-link' style={{ cursor: 'default' }}>
      <div className='vertical-marquee-container' id='vertical-marquee-container'>
        <div className='vertical-marquee' id='vertical-marquee'>
          {marqueeItems.map((text, idx) => (
            <span key={idx} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className='vertical-marquee-text'>{text}</span>
              <span className='vertical-marquee-star'>&#10022;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerticalMarquee;
