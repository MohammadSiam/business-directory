import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import CategoryItem from "./CategoryItem";

const Category = ({ explore = false, onCategorySelect }) => {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryList((prevList) => [...prevList, doc.data()]);
    });
    setLoading(false);
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push("/businesslist/" + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };

  return (
    <View>
      {!explore && (
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
      )}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
        <FlatList
          data={categoryList}
          horizontal={true}
          style={{ paddingLeft: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, indx }) => (
            <CategoryItem
              category={item}
              key={indx}
              onCategoryPress={(category) => onCategoryPressHandler(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
