import React from "react";
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ActionButton = ({ business }) => {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + business.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/pin.png"),
      url: "https://maps.google.com/?q=" + business.address,
    },
    {
      id: 3,
      name: "Website",
      icon: require("../../assets/images/web.png"),
      url: business.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: `whatsapp://send?text=Hey! I found this business on Outfit: ${business.name} ${business.address}`,
    },
  ];

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.url)}
            key={index}
          >
            <Image style={{ width: 50, height: 50 }} source={item?.icon} />
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({});
