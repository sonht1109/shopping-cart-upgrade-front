import React, { useState } from 'react'
import { Carousel, CarouselIndicators, CarouselItem } from 'reactstrap'
import slide1 from '../../assets/images/slide-1.jpg'
import slide2 from '../../assets/images/slide-2.jpg'
import slide3 from '../../assets/images/slide-3.jpg'

const slides = [
    {
        src: slide1
    },
    {
        src: slide2
    },
    {
        src: slide3
    }
]

export default function Slide() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex: number) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const mapSlides = slides.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            > 
                <div className="overlay"></div>
                <img src={item.src} alt="slide" />
            </CarouselItem>
        )
    })


    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators
                items={slides}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {mapSlides}
        </Carousel>
    )
}