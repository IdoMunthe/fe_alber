import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import CustomHeader from "../components/CustomHeader";
import Title from "../components/Title";
import Green1 from "../components/Green1";
// @ts-ignore
import { BASE_URL } from "@env";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Colors = {
  [key: string]: string; // This means the keys are strings and the values are also strings (color codes).
};

const AlberVisualization = () => {
  const [modalVisible, setModalVisble] = useState(false);
  const [selectedAlber, setSelectedAlber] = useState<string | null>(null);
  const [colors, setColors] = useState<Colors>({}); // Start with an empty object
  const [loading, setLoading] = useState(true);

  const colorChoices = ["#F0D800", "#117C00", "#FF0D0D"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("no token found!");
        }

        const response = await axios.get(
          `${BASE_URL}/api/alber-visualizations/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const conditionData = response.data;

        // Ensure the backend response structure maps correctly to your state
        const initialColors = conditionData.reduce((acc: Colors, item: any) => {
          acc[item.alber_id] = item.color || "#F0D800";
          return acc;
        }, {});

        // Update colors state with fetched data
        setColors(initialColors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleColorChange = async (color: string) => {
    if (selectedAlber) {
      // Update the colors state
      setColors((prevColors) => ({
        ...prevColors,
        [selectedAlber]: color,
      }));

      // Call the update API
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("no token found!");
        }

        await axios.put(
          `${BASE_URL}/api/alber-visualizations/${selectedAlber}`,
          {
            color,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Color updated successfully:", color);
        console.log(selectedAlber);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error updating color:", axiosError.response?.data);
      }

      setModalVisble(false); // Close the modal
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-white">
      <Modal
        animationType="fade"
        visible={modalVisible}
        style={{ width: 200, height: 200 }}
        transparent={true}
      >
        <View className="flex-1 justify-center items-center">
          <View
            className="h-64 w-64 gap-y-2 py-6"
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text className="text-lg">Ubah kondisi alber:</Text>
            <FlatList
              data={colorChoices}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleColorChange(item)}>
                  <View
                    style={{
                      backgroundColor: item,
                      width: 40,
                      height: 40,
                      marginBottom: 10,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <CustomHeader />
      <Title title="Alber Visualization" />

      {/* Display Wheel Loaders */}
      <View className="flex-row justify-evenly items-start">
        <View className="gap-y-5">
          {["wd1", "wd2", "wd3", "wd4", "wd5", "wd6"].map((alber) => (
            <TouchableOpacity
              key={alber}
              className="flex-row gap-x-2 items-center"
              onPress={() => {
                setSelectedAlber(alber);
                setModalVisble(true);
              }}
            >
              <View
                style={{
                  backgroundColor: colors[alber] || "#F0D800",
                  width: 16,
                  height: 16,
                }}
              />
              <Text>{`${alber.charAt(0).toUpperCase()}${alber.slice(
                1,
                2
              )}-${alber.slice(2)}`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Separator */}
        <View style={{ width: 0.7, height: 250, backgroundColor: "black" }} />

        {/* Display Excavators */}
        <View className="gap-y-5">
          {["exc1", "exc2", "exc3", "exc4", "exc5", "exc6"].map((alber) => (
            <TouchableOpacity
              key={alber}
              className="flex-row gap-x-2 items-center"
              onPress={() => {
                setSelectedAlber(alber);
                setModalVisble(true);
              }}
            >
              <View
                style={{
                  backgroundColor: colors[alber] || "#F0D800",
                  width: 16,
                  height: 16,
                }}
              />
              <Text>{`${alber.charAt(0).toUpperCase()}${alber.slice(
                1,
                3
              )}-${alber.slice(3)}`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Separator */}
        <View style={{ width: 0.7, height: 250, backgroundColor: "black" }} />

        {/* Display Forklifts */}
        <View className="gap-y-5">
          {["fo1", "fo2"].map((alber) => (
            <TouchableOpacity
              key={alber}
              className="flex-row gap-x-2 items-center"
              onPress={() => {
                setSelectedAlber(alber);
                setModalVisble(true);
              }}
            >
              <View
                style={{
                  backgroundColor: colors[alber] || "#F0D800",
                  width: 16,
                  height: 16,
                }}
              />
              <Text>{`${alber.charAt(0).toUpperCase()}${alber.slice(
                1,
                2
              )}-${alber.slice(2)}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View className="pl-[10%] pt-[15%] gap-y-4">
        <View className="flex-row items-center gap-x-2">
          <View className="bg-[#FF0D0D] w-6 h-6" />
          <Text className="text-lg">Rusak/breakdown</Text>
        </View>
        <View className="flex-row items-center gap-x-2">
          <View className="bg-[#F0D800] w-6 h-6" />
          <Text className="text-lg">Standby</Text>
        </View>
        <View className="flex-row items-center gap-x-2">
          <View className="w-6 h-6" style={{ backgroundColor: "#117C00" }} />
          <Text className="text-lg">In Use</Text>
        </View>
      </View>

      <Green1 />
    </View>
  );
};

export default AlberVisualization;
