import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import Category from "../../components/Home/Category";
import Header from "../../components/Home/Header";
import PopularBusiness from "../../components/Home/PopularBusiness";
import Slider from "../../components/Home/Slider";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    setRefresh(true);
    <Slider />;

    setRefresh(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
    >
      <Header />
      <Slider />
      <Category />
      <PopularBusiness />
    </ScrollView>
  );
};

export default Home;
