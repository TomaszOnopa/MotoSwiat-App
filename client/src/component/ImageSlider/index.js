import './styles.css';

import { useState } from "react"

const ImageSlider =({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    function goToPrevious() {
        setCurrentIndex((slides.length + currentIndex - 1) % slides.length)
    }
    function goToNext() {
        setCurrentIndex((currentIndex + 1) % slides.length)
    }

    return(
        <div className="slider">
            <div className='left arrow' onClick={() => goToPrevious()}>❰</div>
            <div className='right arrow' onClick={() => goToNext()}>❱</div>
            <img src={`/img/${slides[currentIndex]}`} alt=''></img>
        </div>
    )
}

export default ImageSlider