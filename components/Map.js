import React, { Fragment } from "react";
import Seo from "./Seo";
import MAP_KEY from "../secrets";

console.log("HOWDY THE KEY IS " + MAP_KEY);
const Map = () => {
  return (
    <Fragment>
      {" "}
      <Seo />
      <script type="text/javascript"></script>
      <div className="mapText">
        Cabo Grill is located in the Memorial Student Center in the MSC!
      </div>
      <iframe
        width="600"
        height="450"
        style={{ border: "0" }}
        loading="lazy"
        allowFullScreen
        referrerpolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${MAP_KEY}&q=Memorial+Student+Center,+275+Joe+Routt+Blvd,+College+Station,+TX+77840`}
      ></iframe>
      <div>Feel free to stop by!</div>
    </Fragment>
  );
};

export default Map;
