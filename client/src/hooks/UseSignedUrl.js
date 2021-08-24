import { useEffect, useState } from "react";
const axios = require("axios");

export default function UseSignedUrl() {
  const [url, setUrl] = useState();
  const [fields, setFields] = useState();
  useEffect(() => {
    signedurl();
  }, []);
  const signedurl = async function getSignedUrl() {
    try {
      const response = await axios.get(
        "http://localhost:5000/Storage/signedurl",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response);
      setUrl(response.data.url);
      setFields(response.data.fields);
    } catch (error) {
      console.log(error);
    }
  };
  return [url, fields];
}
