import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

const Review = ({ business }) => {
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: comment,
        userName: user?.fullName,
        userImageUrl: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    ToastAndroid.show("Comment Added Successfully", ToastAndroid.BOTTOM);
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>
      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          numberOfLines={4}
          onChangeText={(value) => setComment(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
          }}
          placeholder="Write your comments"
        />
        <TouchableOpacity
          disabled={!comment}
          onPress={onSubmit}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#fff", textAlign: "center" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* display previous review */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 15,
              marginTop: 10,
            }}
            key={index}
          >
            <Image
              source={{ uri: item.userImageUrl }}
              style={{ width: 50, height: 50, borderRadius: 99 }}
            />
            <View style={{ display: "flex", gap: 5 }}>
              <Text style={{ fontFamily: "outfit", fontSize: 15 }}>
                {item.userName}
              </Text>
              <Rating
                style={{ alignItems: "flex-start" }}
                imageSize={20}
                ratingCount={item.rating}
              />
              <Text style={{ fontFamily: "outfit", fontSize: 15 }}>
                {item.comment}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({});
