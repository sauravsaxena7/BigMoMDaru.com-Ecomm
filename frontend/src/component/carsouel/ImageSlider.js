import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./image.css"

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({ slides }) => {
  return (
    <Carousel showThumbs={false} infiniteLoop>
      {slides.map((slide,i) => {
        return <Image className="imageS" src={slide.url} key={i}/>;
      })}
    </Carousel>
  );
};

export default ImageSlider;
