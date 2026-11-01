import './Preloader.css'
import {useEffect, useRef} from "react";

function Preloader() {
  const preloaderRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      preloaderRef.current.style.display = 'none';

    }, 10000);
  }, []);


  return (
    <div className="preloader" ref={preloaderRef}>
      Loading...
    </div>
  )
}

export default Preloader;