import React from "react";
import { Text, View } from "react-native";
import MenuList from "../../components/Profile/MenuList";
import UserIntro from "../../components/Profile/UserIntro";

const Profile = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 35 }}>Profile</Text>

      <UserIntro />
      <MenuList />
    </View>
  );
};

export default Profile;
