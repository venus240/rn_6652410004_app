import React, { useState } from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ใช้ SVG หรือ Image URL ที่เข้าถึงได้ง่ายเพื่อความปลอดภัยในการแสดงผลหน้าเว็บ
const TAXI_ICON = "https://cdn-icons-png.flaticon.com/512/3448/3448339.png";

export default function App() {
  // State สำหรับรับค่า Input
  const [distance, setDistance] = useState("");
  const [waitTime, setWaitTime] = useState("");

  // State สำหรับแสดงผลลัพธ์
  const [totalFare, setTotalFare] = useState(0);
  const [distancePrice, setDistancePrice] = useState(0);
  const [timePrice, setTimePrice] = useState(0);

  // ฟังก์ชันคำนวณราคา (Logic ขั้นบันไดตามกฎกระทรวง)
  const calculateFare = () => {
    // ปิด Keyboard เมื่อกดคำนวณ (ใช้ได้ในมือถือจริง)
    if (typeof Keyboard !== "undefined" && Keyboard.dismiss) {
      Keyboard.dismiss();
    }

    const dist = parseFloat(distance) || 0;
    const time = parseFloat(waitTime) || 0;

    let calDistanceCharge = 0;
    let baseFare = 35; // เริ่มต้น 35 บาท (1 กม. แรก)

    // --- ส่วนที่ 1: คำนวณตามระยะทาง (Distance Charge) ---
    if (dist <= 1) {
      calDistanceCharge = 0;
    } else {
      let remainingDist = dist - 1;

      // กิโลเมตรที่ 2 - 10: กม. ละ 6.50 บาท
      if (remainingDist > 0) {
        const step = Math.min(remainingDist, 9);
        calDistanceCharge += step * 6.5;
        remainingDist -= step;
      }

      // กิโลเมตรที่ 10 - 20: กม. ละ 7.00 บาท
      if (remainingDist > 0) {
        const step = Math.min(remainingDist, 10);
        calDistanceCharge += step * 7.0;
        remainingDist -= step;
      }

      // กิโลเมตรที่ 20 - 40: กม. ละ 8.00 บาท
      if (remainingDist > 0) {
        const step = Math.min(remainingDist, 20);
        calDistanceCharge += step * 8.0;
        remainingDist -= step;
      }

      // กิโลเมตรที่ 40 - 60: กม. ละ 8.50 บาท
      if (remainingDist > 0) {
        const step = Math.min(remainingDist, 20);
        calDistanceCharge += step * 8.5;
        remainingDist -= step;
      }

      // กิโลเมตรที่ 60 - 80: กม. ละ 9.00 บาท
      if (remainingDist > 0) {
        const step = Math.min(remainingDist, 20);
        calDistanceCharge += step * 9.0;
        remainingDist -= step;
      }

      // เกิน 80 กิโลเมตรขึ้นไป: กม. ละ 10.50 บาท
      if (remainingDist > 0) {
        calDistanceCharge += remainingDist * 10.5;
      }
    }

    // คำนวณเวลารถติด นาทีละ 3.00 บาท
    const calTimeCharge = time * 3.0;

    // สรุปค่าโดยสาร
    const total = baseFare + calDistanceCharge + calTimeCharge;

    setDistancePrice(baseFare + calDistanceCharge);
    setTimePrice(calTimeCharge);
    setTotalFare(total);
  };

  const resetFields = () => {
    setDistance("");
    setWaitTime("");
    setTotalFare(0);
    setDistancePrice(0);
    setTimePrice(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={{ uri: TAXI_ICON }} style={styles.logo} />
          <Text style={styles.title}>คำนวณค่าแท็กซี่</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>ระยะทาง (กิโลเมตร)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.0"
            placeholderTextColor="#C4C4C4"
            keyboardType="decimal-pad"
            value={distance}
            onChangeText={setDistance}
          />

          <Text style={styles.label}>เวลารถติด (นาที)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#C4C4C4"
            keyboardType="number-pad"
            value={waitTime}
            onChangeText={setWaitTime}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.calButton} onPress={calculateFare}>
              <Text style={styles.calButtonText}>คำนวณราคา</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
              <Text style={styles.resetButtonText}>ล้างค่า</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <Text style={styles.resultHeaderLabel}>ค่าโดยสารโดยประมาณ</Text>

          <View style={styles.totalContainer}>
            <Text style={styles.totalAmount}>{totalFare.toFixed(2)}</Text>
            <Text style={styles.currencyUnit}>บาท</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              ค่าโดยสารตามระยะทาง (รวมเริ่มต้น)
            </Text>
            <Text style={styles.detailValue}>{distancePrice.toFixed(2)} ฿</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              ค่ารถติด ({waitTime || 0} นาที)
            </Text>
            <Text style={styles.detailValue}>{timePrice.toFixed(2)} ฿</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>ID: 6652410004</Text>
          <Text style={styles.footerText}>NAME: Venus Thongkonghan</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f1c40f",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: "#34495E",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F0F3F4",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#2C3E50",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  calButton: {
    flex: 2,
    backgroundColor: "#009688",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  calButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E74C3C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  resetButtonText: {
    color: "#E74C3C",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: "#2C3E50",
    width: "100%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  resultHeaderLabel: {
    color: "#BDC3C7",
    fontSize: 14,
    marginBottom: 10,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 48,
    color: "#F1C40F",
    fontWeight: "bold",
  },
  currencyUnit: {
    fontSize: 20,
    color: "#F1C40F",
    marginLeft: 8,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#465868",
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  detailLabel: {
    color: "#BDC3C7",
    fontSize: 14,
  },
  detailValue: {
    color: "#ECF0F1",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "bold",
    marginBottom: 4,
  },
});
