import React, { Component } from "react";
import axios from "axios";
import InfiniteScrolling from "./InfiniteScrolling";
import ListingPlaceholder from "./ListingPlaceholder";
import Filters from "./Filters";
import Sortby from "./Sortby";
import filterIcon from "../filter.png";

import "./Listing.scss";

class Listing extends Component {
  constructor(props) {
    super(props);

    this.properties = [];
    this.pageNumber = 1;
    this.filterDefaultState = {
      priceMin: 500,
      priceMax: 200000,
      priceStep: 500,
      priceValue: [500, 200000],
      areaMin: 100,
      areaMax: 10000,
      areStep: 100,
      area: [100, 10000],
      isFilterActive: false
    };

    this.state = {
      isLoading: false,
      hasError: false,
      hasMore: true,
      properties: [],
      imageBaseUrl: "https://images.nobroker.in/images/",
      placeholderImage: "https://images.nobroker.in/static/img/nopic_1bhk.jpg",
      city: "Bangalore",
      apartmentTypeSelected: "all",
      ...this.filterDefaultState
    };
  }

  /* Fetch prperties form API one page at a time */
  fetchProperties = page => {
    this.setState({
      ...this.state,
      isLoading: true
    });
    axios
      .get(`https://demo8213882.mockable.io/fetchProperties?page=${page}`)
      .then(res => {
        let fetchedProperties = res.data.data;
        // Filter out result with 0 or null rent
        fetchedProperties = fetchedProperties
          .filter(property => {
            return property.rent !== null;
          })
          .filter(property => {
            return property.rent !== 0;
          });

        this.properties = this.properties.concat(fetchedProperties);

        this.setState({
          ...this.state,
          isLoading: false,
          hasMore: this.pageNumber < 5, // Just to simulate page end
          properties: this.properties
        });
      })
      .catch(error => {
        this.setState({ ...this.state, hasError: true });
        console.log(error);
      });
  };

  componentDidMount() {
    // Display initial properties
    this.fetchProperties(this.pageNumber);
    // Add scroll listner
    window.addEventListener("scroll", this.handleOnScroll, false);
  }

  componentWillUnmount() {
    // Remove scroll listner
    window.removeEventListener("scroll", this.handleOnScroll, false);
  }

  /* Infinite scroll handler */
  handleOnScroll = () => {
    const { isLoading, hasError, hasMore } = this.state;
    // Return early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (isLoading || hasError || !hasMore) return;
    // Checks that the page has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Fetch and display more data
      this.pageNumber++;
      this.fetchProperties(this.pageNumber);
    }
  };

  /* Filter by Price handler */
  onPriceChange = (priceValue, imageCheck) => {
    let properties = this.sliderFilter(
      this.state.area,
      priceValue,
      imageCheck.checked
    );
    this.setState({
      ...this.state,
      properties,
      priceValue,
      isFilterActive: true
    });
  };

  /* Filter by Area handler */
  onAreaChange = (area, imageCheck) => {
    let properties = this.sliderFilter(
      area,
      this.state.priceValue,
      imageCheck.checked
    );
    this.setState({
      ...this.state,
      properties,
      area,
      isFilterActive: true
    });
  };

  /* List property having images */
  onImageTypeChange = e => {
    let properties;
    if (e.target.checked) {
      properties = this.sliderFilter(
        this.state.area,
        this.state.priceValue,
        true
      );
    } else {
      properties = this.sliderFilter(
        this.state.area,
        this.state.priceValue,
        false
      );
    }
    this.setState({ ...this.state, properties, isFilterActive: true });
  };

  /* Helper slider filter */
  sliderFilter = (area, price, checkImage) => {
    let [areaMin, areaMax] = area;
    let [priceMin, priceMax] = price;
    return this.properties.filter(property => {
      if (checkImage) {
        return (
          property.rent >= priceMin &&
          property.rent <= priceMax &&
          (property.propertySize >= areaMin &&
            property.propertySize <= areaMax) &&
          property.photoAvailable
        );
      }
      return (
        property.rent >= priceMin &&
        property.rent <= priceMax &&
        (property.propertySize >= areaMin && property.propertySize <= areaMax)
      );
    });
  };

  /* Reset filter */
  resetFilter = (imageCheckbox, priceSlider, areaSlider) => {
    const { priceMin, priceMax, areaMin, areaMax } = this.filterDefaultState;

    // Set state of checkbox
    imageCheckbox.checked = false;
    // Set states of sliders
    priceSlider.state.bounds[0] = priceMin;
    priceSlider.state.bounds[1] = priceMax;
    areaSlider.state.bounds[0] = areaMin;
    areaSlider.state.bounds[1] = areaMax;

    // Set app state
    this.setState({
      ...this.state,
      ...this.filterDefaultState,
      properties: this.properties
    });
  };

  /* Handle properties sorting */
  handleSort = e => {
    let selected = e.target.value;
    let sortedProperties;

    switch (selected) {
      case "RentLow2High":
        sortedProperties = this.state.properties.sort((a, b) => {
          return a.rent - b.rent;
        });
        break;
      case "RentHigh2Low":
        sortedProperties = this.state.properties.sort((a, b) => {
          return b.rent - a.rent;
        });
        break;
      case "PropertySizeSmall2Big":
        sortedProperties = this.state.properties.sort((a, b) => {
          return a.propertySize - b.propertySize;
        });
        break;
      case "PropertySizeBig2Small":
        sortedProperties = this.state.properties.sort((a, b) => {
          return b.propertySize - a.propertySize;
        });
        break;
      case "PostedNew":
        sortedProperties = this.state.properties.sort((a, b) => {
          return a.creationDate - b.creationDate;
        });
        break;
      case "PostedOld":
        sortedProperties = this.state.properties.sort((a, b) => {
          return b.creationDate - a.creationDate;
        });
        break;
      default:
        sortedProperties = this.state.properties;
    }

    this.setState({
      ...this.state,
      properties: sortedProperties
    });
  };

  toggleFilter = () => {
    this.refs.filterBlock.classList.toggle("active");
    this.refs.filterClose.classList.toggle("active");
  };

  render() {
    return (
      <div className="container">
        <div className="filter-wrapper">
          <div
            className="filter-mobile-toggler visible-xs"
            onClick={this.toggleFilter}
          >
            <img src={filterIcon} />
          </div>
          <div
            className="filter-close"
            ref="filterClose"
            onClick={this.toggleFilter}
          >
            Close
          </div>
          <div className="filter-block" ref="filterBlock">
            <Filters
              state={this.state}
              onAreaChange={this.onAreaChange}
              onPriceChange={this.onPriceChange}
              onImageTypeChange={this.onImageTypeChange}
              resetFilter={this.resetFilter}
            />
          </div>
        </div>
        <div className="listing-wrapper">
          <div className="listing-header my-3 pb-2">
            <div>
              <span className="h3 pr-3">Properties in {this.state.city}</span>
              {this.state.isFilterActive && (
                <span className="fnt-md">
                  ({this.state.properties.length} properties found!)
                </span>
              )}
            </div>
            <Sortby handleSort={this.handleSort} />
          </div>
          <InfiniteScrolling state={this.state} />
          {this.state.hasError && (
            <div className="loader">Something went wrong!</div>
          )}
          {this.state.isLoading && !this.state.hasError && (
            <ListingPlaceholder />
          )}
          {!this.state.hasMore && (
            <div className="loader">You reached the end!</div>
          )}
        </div>
      </div>
    );
  }
}

export default Listing;
