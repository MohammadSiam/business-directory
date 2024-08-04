import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

const BusinessListByCategory = () => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View>
      {businessList.length > 0 && loading == false ? (
        <FlatList
          onRefresh={getBusinessList}
          refreshing={loading}
          data={businessList}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
};

export default BusinessListByCategory;

const styles = StyleSheet.create({});
