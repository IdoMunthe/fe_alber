import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";

interface OrderCardProps {
  no_order: string;
  jenis_alber: string;
  pekerjaan: string;
  kapal?: string;
  no_palka?: string;
  created_at: Date;
  area?: string;
  kegiatan?: string;
  requested_by: string;
  status: string;
  updated_by: string;
  id: number;
  time_start?: string;
  time_end?: string;
  isDisabled: boolean;
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
  no_palka,
  created_at,
  area,
  kegiatan,
  requested_by,
  status,
  updated_by,
  id,
  time_start,
  time_end,
  isDisabled,
}) => {
  const router = useRouter();
  return (
    <>
      {isDisabled ? (
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `${id}`,
              params: {
                no_order,
                jenis_alber,
                pekerjaan,
                kapal,
                no_palka,
                created_at: created_at.toISOString(), // pass date as string
                area,
                kegiatan,
                requested_by,
                status,
                updated_by,
                time_start,
                time_end,
              },
            });
            console.log(
              no_order,
              jenis_alber,
              pekerjaan,
              kapal,
              no_palka,
              created_at,
              area,
              kegiatan,
              requested_by,
              status,
              updated_by,
              id,
              time_start,
              time_end
            );
          }}
          style={[styles.container, { backgroundColor: "#CECECE" }]}
        >
          <View style={styles.leftContainer}>
            <Text style={styles1.h1}>{jenis_alber}</Text>
            <Text style={styles1.h2}>{pekerjaan}</Text>
            {pekerjaan === "Loading/Unloading" ? (
              <Text style={styles1.h2}>Kapal {kapal}</Text>
            ) : (
              <Text style={styles1.h2}>Area {area}</Text>
            )}
            <Text style={styles1.h3}>No. Order : {no_order}</Text>
            <Text style={styles1.h3}>
              {created_at
                ? "Req Date  : " + formatDate(created_at)
                : "Date is not available"}
            </Text>
            <Text style={styles1.h3}>Request By : {requested_by}</Text>
          </View>
          <View style={styles.rightContainer}>
            <View
              style={[styles.statusContainer, { backgroundColor: "#3D3D3D" }]}
            >
              <AntDesign name="clockcircleo" size={16} color="#FFFFFF" />
              <View>
                <Text
                  style={[
                    styles1.h2,
                    { lineHeight: 16, fontSize: 10, color: "#FFFFFF" },
                  ]}
                >
                  {status === "Order Request"
                    ? "Manage Alber"
                    : status === "Start Working"
                    ? "On Working"
                    : status}
                </Text>
                <Text
                  style={[
                    styles1.h3,
                    { fontWeight: "500", fontSize: 8, color: "#FFFFFF" },
                  ]}
                >
                  By: {updated_by}
                </Text>
              </View>
            </View>
            <Link href={`tracking-history/${id}`}>
              <Image
                className="scale-[1.2] ml-2"
                source={require("../assets/images/see-tracking-history-dark.png")}
              />
            </Link>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `${id}`,
              params: {
                no_order,
                jenis_alber,
                pekerjaan,
                kapal,
                no_palka,
                created_at: created_at.toISOString(), // pass date as string
                area,
                kegiatan,
                requested_by,
                status,
                updated_by,
                time_start,
                time_end,
              },
            });
            // console.log(
            //   no_order,
            //   jenis_alber,
            //   pekerjaan,
            //   kapal,
            //   no_palka,
            //   created_at,
            //   area,
            //   kegiatan,
            //   requested_by,
            //   status,
            //   updated_by,
            //   id,
            //   time_start,
            //   time_end
            // );
          }}
          style={styles.container}
        >
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
                  {status === "Order Request"
                    ? "Manage Alber"
                    : status === "Start Working"
                    ? "On Working"
                    : status}
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
      )}
    </>
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
    maxHeight: 50,
    // flexWrap: "wrap",
  },
});

const styles1 = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontWeight: "900",
    color: "#3D3D3D",
  },
  h2: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 28,
    color: "#3D3D3D",
    maxWidth: 150,
  },
  h3: {
    color: "#3D3D3D",
    fontSize: 10,
    fontWeight: "600",
  },
});

export default OrderCard;
