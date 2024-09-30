import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MarkAttendance = () => {
  const router = useRouter();
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

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://192.168.186.238:3001/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu nhân viên", error);
      }
    };
    fetchEmployeeData();
  }, []);

  const [attendance, setAttendance] = useState([]);
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://192.168.186.238:3001/attendance`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu điểm danh", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // 'Not Marked' or a default status
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="white" />
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="white" />
      </View>

      <View style={styles.employeeList}>
        {employeeWithAttendance.map((item, index) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/[user]",
                params: {
                  name: item.employeeName,
                  id: item.employeeId,
                  salary: item?.salary,
                  designation: item?.designation,
                },
              })
            }
            key={index}
            style={styles.employeeItem}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item?.employeeName?.charAt(0)}</Text>
            </View>
            <View style={styles.employeeDetails}>
              <Text style={styles.employeeName}>{item?.employeeName}</Text>
              <Text style={styles.employeeDesignation}>
                {item?.designation} ({item?.employeeId})
              </Text>
            </View>
            {item?.status && (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status.charAt(0)}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MarkAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b6cb7",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dateText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  employeeList: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  employeeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeDetails: {
    flex: 1,
    marginLeft: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeDesignation: {
    marginTop: 5,
    color: "gray",
  },
  statusBadge: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#FF69B4",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
