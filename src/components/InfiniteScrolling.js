import React from "react";
import Thumbnail from "./Thumbnail";
import ImageSlider from "./ImageSlider";
import like from "../assets/like.png";

function InfiniteScrolling(props) {
  const { properties, imageBaseUrl, placeholderImage } = props.state;

  if (properties.length > 0) {
    return (
      <div>
        <ul className="list cards">
          {properties.map((property, index) => {
            const showImageOrSlider = () => {
              if (property.photoAvailable) {
                return (
                  <ImageSlider
                    property={property}
                    imageBaseUrl={imageBaseUrl}
                  />
                );
              }
              return (
                <Thumbnail
                  property={property}
                  imageBaseUrl={imageBaseUrl}
                  placeholderImage={placeholderImage}
                />
              );
            };

            return (
              <li key={index} className="card list-card">
                <div className="card-image-wrapper">{showImageOrSlider()}</div>
                <div className="card-content">
                  {/* Top Block */}
                  <a
                    className="d-block pb-3"
                    href={property.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="h3">{property.title}</h3>
                    <p className="fnt-sm text-tertiary truncate-md">
                      {property.secondaryTitle}
                    </p>
                  </a>
                  {/* Middle Block */}
                  <a
                    className="d-block pb-3"
                    href={property.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="d-flex mb-2">
                      <div className="w-50">
                        <div className="text-tertiary fnt-sm">Rent</div>{" "}
                        <div className="bold-md">
                          ₹ {property.rent.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="text-tertiary fnt-sm">Deposit</div>{" "}
                        <div className="bold-md">
                          ₹ {property.deposit.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="w-50">
                        <div className="text-tertiary fnt-sm">Size</div>{" "}
                        <div className="bold-md">
                          Sqft. {property.propertySize.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="text-tertiary fnt-sm">Type</div>{" "}
                        <div className="bold-md">{property.type}</div>
                      </div>
                    </div>
                  </a>

                  {/* Bottom Block */}
                  <div className="bottom-block flex-center-v">
                    <button
                      type="button"
                      className="button button-outline button-icon"
                    >
                      <img src={like} alt="add to wishlist" className="icon" />
                    </button>
                    <button type="button" className="button button-accent ml-3">
                      Get Owner Details
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return <div />;
}
export default InfiniteScrolling;
