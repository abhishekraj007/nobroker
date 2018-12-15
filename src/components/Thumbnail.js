import React, { Component } from "react";

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
        <img className="card-image" src={placeholderImage} />
      </a>
    );
  }
}

export default Thumbnail;
