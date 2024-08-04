import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import CategoryItem from "./CategoryItem";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryList((prevList) => [...prevList, doc.data()]);
    });
  };
  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          marginTop: 10,
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
          Category
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
        data={categoryList}
        horizontal={true}
        style={{ marginLeft: 10 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, indx }) => (
          <CategoryItem
            category={item}
            key={indx}
            onCategoryPress={(category) =>
              router.push("/businesslist/" + item.name)
            }
          />
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
