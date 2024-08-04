import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

const CategoryItem = ({ category, onCategoryPress }) => {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.ICON_BG,
          borderRadius: 99,
          marginRight: 15,
        }}
      >
        <Image
          style={{ height: 40, width: 40 }}
          source={{ uri: category.icon }}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-medium",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
