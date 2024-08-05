import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

const BusinessListCard = ({ business }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      style={{
        backgroundColor: "#fff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      <Image
        style={{
          height: 150,
          width: "100%",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        source={{ uri: business.imageUrl }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          {business.name}
        </Text>
        <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
          {business.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessListCard;

const styles = StyleSheet.create({});
