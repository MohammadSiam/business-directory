import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import About from "../../components/BusinessDetail/About";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import Intro from "../../components/BusinessDetail/Intro";
import Review from "../../components/BusinessDetail/Review";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

const BusinessDetail = () => {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBusinessDetailById();
  }, []);

  const getBusinessDetailById = async () => {
    setLoading(true);
    setBusiness({});
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusiness({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: "70%" }}
        size={"large"}
        color={Colors.PRIMARY}
      />
    );
  }

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "intro":
        return <Intro business={business} />;
      case "actionButton":
        return <ActionButton business={business} />;
      case "about":
        return <About business={business} />;
      case "review":
        return <Review business={business} />;
      default:
        return null;
    }
  };

  const sections = [
    { type: "intro" },
    { type: "actionButton" },
    { type: "about" },
    { type: "review" },
  ];

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default BusinessDetail;

const styles = StyleSheet.create({});
