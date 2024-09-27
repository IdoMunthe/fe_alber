import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";

interface OrderCardProps {
  no_order: string;
  jenis_alber: string;
  pekerjaan: string;
  kapal?: string;
  created_at: Date;
  area?: string;
  requested_by: string;
  status: string;
  updated_by: string;
  id: number;
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}.${minutes}`;
};

const OrderCard: React.FC<OrderCardProps> = ({
  no_order,
  jenis_alber,
  pekerjaan,
  kapal,
  created_at,
  area,
  requested_by,
  status,
  updated_by,
  id
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`${id}`)} style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.h1}>{jenis_alber}</Text>
        <Text style={styles.h2}>{pekerjaan}</Text>
        {pekerjaan === "Loading/Unloading" ? (
          <Text style={styles.h2}>Kapal {kapal}</Text>
        ) : (
          <Text style={styles.h2}>Area {area}</Text>
        )}
        <Text style={styles.h3}>No. Order : {no_order}</Text>
        <Text style={styles.h3}>
          {created_at
            ? "Req Date  : " + formatDate(created_at)
            : "Date is not available"}
        </Text>
        <Text style={styles.h3}>Request By : {requested_by}</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.statusContainer}>
          <AntDesign name="clockcircleo" size={16} color="#117C00" />
          <View>
            <Text style={[styles.h2, { lineHeight: 16, fontSize: 10 }]}>
              {status}
            </Text>
            <Text style={[styles.h3, { fontWeight: "500", fontSize: 8 }]}>
              By: {updated_by}
            </Text>
          </View>
        </View>
        <Link href={`tracking-history/${id}`}>
          <Image
            className="scale-[1.2] ml-2"
            source={require("../assets/images/see-tracking-history.png")}
          />
        </Link>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#AAFF9C",
    flexDirection: "row",
    paddingHorizontal: "7%",
    paddingVertical: "3%",
    borderRadius: 12,
    justifyContent: "space-between",
    marginVertical: "1%",
    marginHorizontal: "5%",
    alignSelf: "center",
    maxWidth: "92%",
    width: 600,
  },
  h1: {
    fontSize: 20,
    fontWeight: "900",
    color: "#117C00",
  },
  h2: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 28,
    color: "#117C00",
    maxWidth: 150,
  },
  h3: {
    color: "#117C00",
    fontSize: 10,
    fontWeight: "600",
  },
  leftContainer: {
    marginRight: "5%",
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  statusContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0D800",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    paddingRight: "20%",
    marginBottom: "5%",
    borderRadius: 10,
    columnGap: 6,
    width: 120,
    maxHeight: 50
    // flexWrap: "wrap",
  },
});

export default OrderCard;
