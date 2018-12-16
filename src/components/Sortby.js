import React from "react";

const Sortby = props => {
  return (
    <div className="listing-sort">
      {/* Sort */}
      <label className="mr-2 text-secondary">Sort by: </label>
      <select name="sort" onChange={props.handleSort}>
        <option value="reset">Select</option>
        <option value="RentLow2High">Rent(Low to High)</option>
        <option value="RentHigh2Low">Rent(High to Low)</option>
        <option value="PropertySizeSmall2Big">Size(Small to Big)</option>
        <option value="PropertySizeBig2Small">Size(Big to Small)</option>
        <option value="PostedNew">Posted(Newest First)</option>
        <option value="PostedOld">Posted(Oldest First)</option>
      </select>
    </div>
  );
};

export default Sortby;
