import React, { Fragment } from "react";
import Seo from "./Seo";
import MAP_KEY from "../secrets";

const Map = () => {
  return (
    <Fragment>
      {" "}
      <Seo />
      <script type="text/javascript"></script>
      <div style={{

        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: 50
      }}>

        <iframe
          width="800"
          height="550"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
          referrerpolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${MAP_KEY}&q=Memorial+Student+Center,+275+Joe+Routt+Blvd,+College+Station,+TX+77840`}
        ></iframe>
      </div>
    </Fragment>
  );
};

export default Map;
