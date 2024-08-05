import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";
import Category from "../../components/Home/Category";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

const Explore = () => {
  const [businessList, setBusinessList] = useState([]);

  const getBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prevList) => [
        ...prevList,
        { id: doc.id, ...doc.data() },
      ]);
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>
      {/* search bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#fff",
          alignItems: "center",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "outfit", fontSize: 16 }}
        />
      </View>
      {/* category */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />

      <ExploreBusinessList businessList={businessList} />
    </View>
  );
};

export default Explore;
