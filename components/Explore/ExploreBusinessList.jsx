import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BusinessListCard from "./BusinessListCard";

const ExploreBusinessList = ({ businessList }) => {
  return (
    <View>
      <FlatList
        data={businessList}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
      <View style={{ height: 100 }}></View>
    </View>
  );
};

export default ExploreBusinessList;

const styles = StyleSheet.create({});
