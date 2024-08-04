import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import PopularBusinessCard from "./PopularBusinessCard";

const PopularBusiness = () => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prevList) => [
        ...prevList,
        { id: doc.id, ...doc.data() },
      ]);
    });
  };
  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          marginTop: 20,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit",
            paddingRight: 10,
          }}
        >
          View All
        </Text>
      </View>
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PopularBusinessCard business={item} key={index} />
        )}
      />
    </View>
  );
};

export default PopularBusiness;

const styles = StyleSheet.create({});
