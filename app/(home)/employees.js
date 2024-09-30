import { Pressable, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchResults from "../../components/SearchResults";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();

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

  // Hàm để xóa nhân viên
  const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(`http://192.168.186.238:3001/employees/${employeeId}`);
      console.log(response.data.message); // Thông báo từ server
      setEmployees(employees.filter(emp => emp.employeeId !== employeeId)); // Cập nhật danh sách nhân viên
      Alert.alert("Thành công", "Nhân viên đã được xóa.");
    } catch (error) {
      console.error("Lỗi khi xóa nhân viên:", error.response.data.message);
      Alert.alert("Lỗi", "Không thể xóa nhân viên.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Phần còn lại của mã không thay đổi */}
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white" }}>
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign style={{ marginLeft: 10 }} name="search1" size={20} color="black" />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />
          {employees.length > 0 && (
            <View>
              <Pressable onPress={() => router.push("/(home)/adddetails")}>
                <AntDesign name="pluscircle" size={30} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {employees.length > 0 ? (
        <SearchResults
          data={employees}
          input={input}
          handleDelete={deleteEmployee}
          handleEdit={(employeeId) => router.push(`/editEmployee/${employeeId}`)} // Chức năng sửa
          handleView={(employeeId) => router.push(`/EmployeeDetails/${employeeId}`)} // Chức năng xem
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>(Trống)</Text>
          <Text>Nhấn vào để thêm Nhân viên của bạn</Text>
          <Pressable onPress={() => router.push("/(home)/adddetails")}>
            <AntDesign style={{ marginTop: 30 }} name="pluscircle" size={24} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Employees;
