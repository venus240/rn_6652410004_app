import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const taxilogo = require("@/assets/images/taxilogo.png");

export default function Index() {
  //หน่วงหน้าจอตอนโหลด
  useEffect(() => {
    setTimeout(() => {
      router.replace("/calculator");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={taxilogo} style={styles.taxilogo} />
        <Text style={styles.appnameen}>TAXI METER</Text>
        <Text style={styles.appnameth}>THAI FARE CALCULATOR</Text>
        <ActivityIndicator
          size="large"
          color="#2ba048"
          style={{ marginTop: 40 }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={styles.footer}>ID: 6652410004</Text>
        <Text style={styles.footer}>NAME: Venus Thongkonghan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  appnameen: {
    fontSize: 40,
    fontFamily: "Kanit_700Bold",
    color: "#19172f",
    marginTop: 10,
  },
  appnameth: {
    fontSize: 15,
    fontFamily: "Kanit_700Bold",
    color: "#2ba048",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#ffffff50",
    padding: 40,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    height: "45%",
    shadowColor: "#a49f9f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcd619",
  },
  taxilogo: {
    width: 150,
    height: 150,
  },
});
