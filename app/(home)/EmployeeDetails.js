import { View, TextInput, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';

const EmployeeDetails = ({ route }) => {
  const { employeeId } = route.params;
  const [employeeData, setEmployeeData] = useState({
    employeeName: '',
    designation: '',
    phoneNumber: '',
    dateOfBirth: '',
    joiningDate: '',
    salary: '',
    address: ''
  });

  useEffect(() => {
    const EmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.186.238:3001/employees/${employeeId}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu nhân viên:", error);
      }
    };
    EmployeeDetails();
  }, [employeeId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://192.168.186.238:3001/employees/${employeeId}`, employeeData);
      Alert.alert("Thành công", "Cập nhật thông tin nhân viên thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin nhân viên:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin nhân viên.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Tên nhân viên"
        value={employeeData.employeeName}
        onChangeText={(text) => setEmployeeData({ ...employeeData, employeeName: text })}
      />
      <TextInput
        placeholder="Chức vụ"
        value={employeeData.designation}
        onChangeText={(text) => setEmployeeData({ ...employeeData, designation: text })}
      />
      <TextInput
        placeholder="Số điện thoại"
        value={employeeData.phoneNumber}
        onChangeText={(text) => setEmployeeData({ ...employeeData, phoneNumber: text })}
      />
      <TextInput
        placeholder="Ngày sinh"
        value={employeeData.dateOfBirth}
        onChangeText={(text) => setEmployeeData({ ...employeeData, dateOfBirth: text })}
      />
      <TextInput
        placeholder="Ngày vào làm"
        value={employeeData.joiningDate}
        onChangeText={(text) => setEmployeeData({ ...employeeData, joiningDate: text })}
      />
      <TextInput
        placeholder="Lương"
        value={employeeData.salary}
        onChangeText={(text) => setEmployeeData({ ...employeeData, salary: text })}
      />
      <TextInput
        placeholder="Địa chỉ"
        value={employeeData.address}
        onChangeText={(text) => setEmployeeData({ ...employeeData, address: text })}
      />
      <Button title="Cập nhật" onPress={handleUpdate} />
    </View>
  );
};

export default EmployeeDetails;
