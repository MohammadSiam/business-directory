import React from "react";
import { ScrollView, View } from "react-native";
import Category from "../../components/Home/Category";
import Header from "../../components/Home/Header";
import PopularBusiness from "../../components/Home/PopularBusiness";
import Slider from "../../components/Home/Slider";

const Home = () => {
  return (
    <ScrollView>
      <Header />
      <Slider />
      <Category />
      <PopularBusiness />
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default Home;
