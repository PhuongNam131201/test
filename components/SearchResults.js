import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router"; // Dùng router để điều hướng
import React from "react";

const SearchResults = ({ data, input, handleDelete }) => {
  const router = useRouter(); // Sử dụng router để điều hướng đến trang chi tiết

  // Hàm hiển thị hộp thoại xác nhận trước khi xóa
  const confirmDelete = (employeeId) => {
    Alert.alert(
      "Xác nhận xóa", // Tiêu đề
      "Bạn có chắc muốn xóa nhân viên này không?", // Nội dung thông báo
      [
        {
          text: "Hủy", // Nút Hủy
          onPress: () => console.log("Hủy xóa"), // Hành động khi nhấn Hủy
          style: "cancel", // Kiểu nút
        },
        {
          text: "Xóa", // Nút Xóa
          onPress: () => handleDelete(employeeId), // Hành động khi nhấn Xóa
          style: "destructive", // Kiểu nút có tác động mạnh (thường dùng cho xóa)
        },
      ],
      { cancelable: true } // Cho phép hủy bằng cách nhấn ra ngoài hộp thoại
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#4b6cb7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {item?.employeeName?.charAt(0)}
                  </Text>
                </View>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => router.push(`/employeeDetails?id=${item.employeeId}`)}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item?.employeeName}
                  </Text>
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </Pressable>
                <Pressable onPress={() => confirmDelete(item.employeeId)}>
                  <Text style={{ color: "red", marginTop: 5 }}>Xóa</Text>
                </Pressable>
                

              </View>
            );
          }
          return null;
        }}
        keyExtractor={(item) => item.employeeId}
      />
    </View>
  );
};

export default SearchResults;
