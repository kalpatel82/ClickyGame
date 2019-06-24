import React from "react";
import "./ImageBlockListing.css";
import ImageBlock from "../ImageBlock";

const ImageBlockListing = (props) => (
	<div className="container">
		<div className="row">
	    {props.imageFileNames.map((imageNames, index) => {
	      return <ImageBlock key={index} imageFileName={imageNames} alt={imageNames} clickHandler={props.handleclick} gameStatus={props.status} />



	    })}
	  </div>
  </div>
);

export default ImageBlockListing;