import React, { useEffect, useState } from "react";
import './style.css'

const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async (getUrl) => {
      try {
        setLoading(true);
        const respone = await fetch(getUrl);
        const data = await respone.json();

        if (data && data.products && data.products.length > 0) {
          setData(data.products);
          setLoading(false);
        }
      } catch (e) {
        setErrorMsg(e);
      }
    };
    fetchData(url);
  }, [url]);

  const handleScrollPercentage = () => {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((howMuchScrolled / height) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (errorMsg) {
    return <div>Error ! {errorMsg}</div>;
  }

  if (loading) {
    return <div>Loading data ! Please wait</div>;
  }

  console.log(scrollPercentage);
  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {data && data.length > 0 ? (
          data.map((dataItem) => <p>{dataItem.title}</p>)
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default ScrollIndicator;
