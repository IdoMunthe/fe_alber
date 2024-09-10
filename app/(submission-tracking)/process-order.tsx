import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Title from "../../components/Title";
import CustomHeader from "../../components/CustomHeader";
import Green1 from "../../components/Green1";
import Green2 from "../../components/Green2";
import OrderCard from "../../components/OrderCard";

const ProcessOrder = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader />
      <SafeAreaView>
        <Title title="Process Order " />
        <View style={styles.container}>
          <OrderCard
            no_order={"PO-WD-001"}
            jenis_alber={"Wheel Loader"}
            pekerjaan={"Loading/Unloading"}
            nama_kapal="Sukowati"
            request_date={new Date()}
            request_by={"Ido Munthe"}
            status={"Start Working"}
            updated_by={"Joko Tingkir"}
          />
          <OrderCard
            no_order={"PO-EX-001"}
            jenis_alber={"Excavator"}
            pekerjaan={"HouseKeeping"}
            area="Cleaning UBB"
            request_date={new Date()}
            request_by={"Ido Munthe"}
            status={"Manage Alber"}
            updated_by={"Mulyono"}
          />
          <OrderCard
            no_order={"PO-EX-002"}
            jenis_alber={"Excavator"}
            pekerjaan={"HouseKeeping"}
            area="Cleaning UBB"
            request_date={new Date()}
            request_by={"Ido Munthe"}
            status={"Start Working"}
            updated_by={"Mulyono"}
          />
        </View>
      </SafeAreaView>
      <Green1 />
      <Green2 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    rowGap: 10
  }
})

export default ProcessOrder;
