import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    setLoading(true);
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((snap) => {
      setSliderList((prevList) => [...prevList, snap.data()]);
    });
    setLoading(false);
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
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
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
      )}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
