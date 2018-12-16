import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageSlider.scss";

function ImageSlider(props) {
  const { property, imageBaseUrl } = props;
  const photoAvailable = property.photoAvailable;
  if (photoAvailable) {
    return (
      <Carousel
        showThumbs={false}
        width="100%"
        className="p-slider"
        emulateTouch={true}
      >
        {property.photos.map((image, index) => {
          return (
            <div key={index} className="p-slider-item">
              <a
                href={property.shortUrl}
                target="_blank"
                className="d-block"
                rel="noopener noreferrer"
              >
                <img
                  className="card-image"
                  src={
                    imageBaseUrl + property.id + "/" + image.imagesMap.medium
                  }
                  alt="card"
                />
              </a>
            </div>
          );
        })}
      </Carousel>
    );
  } else {
    return <div />;
  }
}

export default ImageSlider;
