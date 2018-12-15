import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import { formatNumber } from "../utils/utils";
import "rc-slider/assets/index.css";
import "./Filter.scss";

class Filters extends Component {
  constructor(props) {
    super(props);
  }

  resetFilter = () => {
    this.props.resetFilter(
      this.refs.imageCheck,
      this.refs.priceSlider,
      this.refs.areaSlider
    );
  };

  onAreaChange = area => {
    this.props.onAreaChange(area, this.refs.imageCheck);
  };

  onPriceChange = price => {
    this.props.onPriceChange(price, this.refs.imageCheck);
  };

  render() {
    const {
      priceMin,
      priceMax,
      priceStep,
      priceValue,
      areaMin,
      areaMax,
      areaStep,
      area,
      isFilterActive
    } = this.props.state;
    return (
      <div>
        {/* Reset button */}

        <div className="flex-center-v justify-between py-4 bg-whiteShade px-35">
          <h3 className="h3">Filters</h3>
          {isFilterActive && (
            <span className="filter-reset" onClick={this.resetFilter}>
              Reset All
            </span>
          )}
        </div>

        <div className="p-35 border-top">
          {/* Filter by price */}
          <h4 className="h4 mb-3">Budget</h4>
          <div className="mb-3">
            <div className="d-flex justify-between mb-3">
              <span>
                Rs.{" "}
                <span className="bold-md">{formatNumber(priceValue[0])}</span>{" "}
              </span>
              <span>
                Rs.{" "}
                <span className="bold-md">{formatNumber(priceValue[1])}</span>
              </span>
            </div>
            <Range
              ref="priceSlider"
              allowCross={false}
              defaultValue={priceValue}
              min={priceMin}
              max={priceMax}
              step={priceStep}
              onChange={value => {
                this.onPriceChange(value);
              }}
            />
          </div>

          {/* Filter by Property */}
          <h4 className="h4 mb-3">Area</h4>
          <div className="mb-3">
            <div className="d-flex justify-between mb-3">
              <span>
                Sqrt. <span className="bold-md">{formatNumber(area[0])}</span>{" "}
              </span>
              <span>
                Sqrt. <span className="bold-md">{formatNumber(area[1])}</span>{" "}
              </span>
            </div>
            <Range
              ref="areaSlider"
              allowCross={false}
              defaultValue={area}
              min={areaMin}
              max={areaMax}
              step={areaStep}
              onChange={value => {
                this.onAreaChange(value);
              }}
            />
          </div>

          {/* Filter by Image */}
          <div className="flex-center-v pt-2">
            <input
              id="imageCheck"
              ref="imageCheck"
              type="checkbox"
              onChange={this.props.onImageTypeChange}
            />
            <label htmlFor="imageCheck" className="text-secondary ml-2 fnt-md">
              Show only with Photos
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
