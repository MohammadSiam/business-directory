import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

const PopularBusinessCard = ({ business }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: 200, height: 130, borderRadius: 15 }}
      />
      <View style={{ marginTop: 7, gap: 3 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 15,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 13,
            color: Colors.GRAY,
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../assets/images/star.png")}
            />
            <Text style={{ fontFamily: "outfit" }}>4.5</Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              fontSize: 10,
              borderRadius: 5,
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularBusinessCard;

const styles = StyleSheet.create({});
