import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

const User = () => {
  const params = useLocalSearchParams();
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = {
        employeeId: params?.id,
        employeeName: params?.name,
        date: currentDate.format("MMMM D, YYYY"),
        status: attendanceStatus,
      };
      const response = await axios.post(
        "http://192.168.186.238:3001/attendance",
        attendanceData
      );

      if (response.status === 200) {
        Alert.alert(`Xác nhận điểm danh thành công cho ${params?.name}`);
      }
    } catch (error) {
      console.log("Lỗi khi nộp điểm danh", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateNavigator}>
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>

      <Pressable style={styles.employeeInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{params?.name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.employeeName}>{params?.name}</Text>
          <Text style={styles.employeeDetails}>
            {params?.designation} ({params?.id})
          </Text>
        </View>
      </Pressable>
      <Text style={styles.salaryText}>Lương cơ bản: {params?.salary}</Text>

      <View style={styles.attendanceSection}>
        <Text style={styles.attendanceHeader}>Điểm danh</Text>
        <View style={styles.attendanceButtons}>
          <Pressable
            onPress={() => setAttendanceStatus("present")}
            style={[styles.attendanceButton, attendanceStatus === "present" && styles.selectedButton]}
          >
            {attendanceStatus === "present" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Có mặt</Text>
          </Pressable>

          <Pressable
            onPress={() => setAttendanceStatus("absent")}
            style={[styles.attendanceButton, attendanceStatus === "absent" && styles.selectedButton]}
          >
            {attendanceStatus === "absent" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Vắng mặt</Text>
          </Pressable>
        </View>
        <View style={styles.attendanceButtons}>
          <Pressable
            onPress={() => setAttendanceStatus("halfday")}
            style={[styles.attendanceButton, attendanceStatus === "halfday" && styles.selectedButton]}
          >
            {attendanceStatus === "halfday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Vắng nửa buổi</Text>
          </Pressable>

          <Pressable
            onPress={() => setAttendanceStatus("holiday")}
            style={[styles.attendanceButton, attendanceStatus === "holiday" && styles.selectedButton]}
          >
            {attendanceStatus === "holiday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Nghỉ phép</Text>
          </Pressable>
        </View>
        <View>
          <Text>Lý do:</Text>
        </View>
        <View style={styles.reasonInputContainer}>
          <TextInput
            style={styles.reasonInput}
            placeholderTextColor="black"
            placeholder="Ghi lý do cụ thể (Nếu có mặt không cần ghi)"
          />
        </View>

        <Pressable onPress={submitAttendance} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Xác nhận</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dateNavigator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
  },
  employeeInfo: {
    marginVertical: 10,
    marginHorizontal: 12,
    flexDirection: "row",
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeDetails: {
    marginTop: 5,
    color: "gray",
  },
  salaryText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
  },
  attendanceSection: {
    marginHorizontal: 12,
  },
  attendanceHeader: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 3,
    marginTop: 7,
  },
  attendanceButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 10,
  },
  attendanceButton: {
    backgroundColor: "#C4E0E5",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  selectedButton: {
    backgroundColor: "#A1FFCE", // Highlight color for selected buttons
  },
  reasonInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reasonInput: {
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    padding: 10,
    flex: 1,
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#00c6ff",
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 6,
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
});
