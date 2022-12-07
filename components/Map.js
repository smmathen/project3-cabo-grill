import React, { Fragment } from "react";
import Seo from "./Seo";
import MAP_KEY from "../secrets";

/**
 * @swagger
 * Map:
 *   get:
 *     description: Displays the location of the restaurant on a page for the user to view.
 *     summary: Utilizes Google Maps API to show current location   
 *     parameters:
 */
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


        <form action="//www.google.com/maps" id="">
          <input aria-label="Your Location" id="" name="saddr" placeholder="FROM" type={"text"} ></input>
          <input aria-label="Our Location" id="" name="daddr" placeholder="TO" type={"hidden"} value={'Memorial+Student+Center,+275+Joe+Routt+Blvd,+College+Station,+TX+77840'}></input>
          <input type={"submit"} value="Get Distance" formTarget="_blank"></input>

        </form>

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
