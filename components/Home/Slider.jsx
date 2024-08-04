import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { db } from "../../configs/FirebaseConfig";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((snap) => {
      setSliderList((prevList) => [...prevList, snap.data()]);
    });
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        # Special For You
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 10 }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 150,
              borderRadius: 15,
              marginRight: 15,
            }}
          />
        )}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
