import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import axios from "axios";
  
  const adddetails = () => {
    const [name, setName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [dob, setDob] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [salary, setSalary] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const handleRegister = () => {
      const employeeData = {
        employeeName: name,
        employeeId: employeeId,
        designation: designation,
        phoneNumber: mobileNo,
        dateOfBirth: dob,
        joiningDate: joiningDate,
        activeEmployee: true,
        salary: salary,
        address: address,
      };
  
      axios
        .post("http://192.168.186.238:3001/addEmployee", employeeData)
        .then((response) => {
          Alert.alert(
            "Xác nhận thành công",
            "Bạn đã thêm thành công nhân viên mới"
          );
          setName("");
          setEmployeeId("");
          setDob("");
          setMobileNo("");
          setSalary("");
          setAddress("");
          setJoiningDate("");
          setDesignation("");
        })
        .catch((error) => {
          Alert.alert(
            "Không thành công",
            "Đã xả ra lỗi trong quá trình thực hiện"
          );
          console.log("register failed", error);
        });
    };
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Thêm nhân viên 
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
             Họ và tên
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="nhập họ và tên"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Mã nhân viên</Text>
            <TextInput
              value={employeeId}
              onChangeText={(text) => setEmployeeId(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Nhập mã nhân viên:(chữ hoặc số)"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Chức vụ</Text>
            <TextInput
              value={designation}
              onChangeText={(text) => setDesignation(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Nhập vị trí làm việc tại công ty"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Số điện thoại
            </Text>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Nhập số điện thoại"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Ngày tháng năm sinh:
            </Text>
            <TextInput
              value={dob}
              onChangeText={(text) => setDob(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Ngày gia nhập</Text>
            <TextInput
              value={joiningDate}
              onChangeText={(text) => setJoiningDate(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Ngày gia nhập"
              placeholderTextColor={"black"}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Mức lương</Text>
            <TextInput
              value={salary}
              onChangeText={(text) => setSalary(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Lương cơ bản"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Địa chỉ hiện tại</Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Nhập địa chỉ tại đây"
              placeholderTextColor={"black"}
            />
          </View>
  
          <Pressable
            onPress={handleRegister}
            style={{
              backgroundColor: "#ABCABA",
              padding: 10,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Thêm nhân viên
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  
  export default adddetails;
  
  const styles = StyleSheet.create({});