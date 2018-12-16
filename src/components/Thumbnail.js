import React from "react";

function Thumbnail(props) {
  const { property, imageBaseUrl, placeholderImage } = props;
  const photoAvailable = property.photoAvailable;
  if (photoAvailable) {
    return (
      <a
        href={property.shortUrl}
        target="_blank"
        className="d-block"
        rel="noopener noreferrer"
      >
        <img
          className="card-image"
          src={
            imageBaseUrl +
            property.id +
            "/" +
            property.photos[0].imagesMap.thumbnail
          }
          alt="Property thumb"
        />
      </a>
    );
  } else {
    return (
      <a
        href={property.shortUrl}
        target="_blank"
        className="d-block"
        rel="noopener noreferrer"
      >
        <img
          className="card-image"
          src={placeholderImage}
          alt="Property thumb"
        />
      </a>
    );
  }
}

export default Thumbnail;
