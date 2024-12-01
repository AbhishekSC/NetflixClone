import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { SwitchTabs } from "../../../components/switchTabs/SwitchTabs";
import "../style.scss";
import useFetch from "../../../hooks/useFetch";
import { Carousel } from "../../../components/carousel/Carousel";

export const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onSwitchTabChange = (tab) => {
    setEndpoint(tab == "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending Now</span>
        <SwitchTabs
          data={["Day", "Week"]}
          onSwitchTabChange={onSwitchTabChange}
        />
      </ContentWrapper>
      <Carousel data= {data?.results} loading= {loading} />
    </div>
  );
};
