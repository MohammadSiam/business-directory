import { useUser } from "@clerk/clerk-expo";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { db, storage } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

const AddBusiness = () => {
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    contact: "",
    website: "",
    about: "",
  });

  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Business",
      headerShown: true,
    });
    getCategoryList();
  }, []);

  const onImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result.assets[0].uri);
  };

  const handleInputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpeg";
    const res = await fetch(image);
    const blob = await res.blob();

    const imageRef = ref(storage, "business-app/" + fileName);
    uploadBytes(imageRef, blob)
      .then(() => console.log("uploaded..."))
      .then((res) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          saveBusinessDetail(downloadUrl);
        });
      });
    setLoading(false);
  };

  const saveBusinessDetail = async (downloadUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      about: formValues.about,
      address: formValues.address,
      category: selectedCategory,
      contact: formValues.contact,
      imageUrl: downloadUrl,
      name: formValues.name,
      website: formValues.website,
      user: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
    });
    setLoading(false);
    ToastAndroid.show("New business Added...", ToastAndroid.LONG);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
        }}
      >
        Fill all the details in order to add new business
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
        onPress={() => onImagePick()}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          value={formValues.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholder="Name"
          style={{
            ...styles.textInput,
            marginTop: 20,
          }}
        />
        <TextInput
          value={formValues.address}
          onChangeText={(text) => handleInputChange("address", text)}
          placeholder="Address"
          style={styles.textInput}
        />
        <TextInput
          value={formValues.contact}
          onChangeText={(text) => handleInputChange("contact", text)}
          placeholder="Contact"
          style={styles.textInput}
        />
        <TextInput
          value={formValues.website}
          onChangeText={(text) => handleInputChange("website", text)}
          placeholder="Website"
          style={styles.textInput}
        />
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="About"
          style={{
            ...styles.textInput,
            height: 100,
            textAlignVertical: "top",
          }}
          value={formValues.about}
          onChangeText={(text) => handleInputChange("about", text)}
        />
        <View>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }
            style={{ ...styles.textInput }}
          >
            {categoryList.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity disabled={loading} onPress={() => onAddNewBusiness()}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              ...styles.btn,
            }}
          >
            Add Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddBusiness;

const styles = StyleSheet.create({
  textInput: {
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: Colors.PRIMARY,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "outfit",
    fontSize: 17,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    color: "#fff",
    fontSize: 18,
    fontFamily: "outfit-medium",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
});
