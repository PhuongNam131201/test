import { StyleSheet, Text, View, ScrollView, Pressable,Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const index = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#fff", "#fff"]} style={styles.gradient}>
        <View style={styles.headerContainer}>
        <View style={styles.img}>
          <Image source={require('../../assets/avatar.png')}  style={{width:40,height:40, borderRadius:10000}}/>
          
        </View>
          <Text style={styles.headerText}>Hệ thống quản lý nhân viên</Text>
          <MaterialIcons name="manage-accounts" size={24} color="black" />
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => router.push("/(home)/employees")}
            style={styles.button}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Danh sách nhân viên</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(home)/markattendance")}
            style={styles.button}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Điểm danh</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(home)/summary")}
            style={styles.button}
          >
            <View style={styles.iconContainer}>
              <Octicons name="repo-pull" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Thống kê điểm danh</Text>
            
          </Pressable>
        </View>

        <View style={styles.reportContainer}>
          {/* <Pressable style={styles.reportButton}>
            <View style={styles.reportIconContainer}>
              <Ionicons name="newspaper-outline" size={24} color="black" />
            </View>
            <Text style={styles.reportText}>Báo cáo điểm danh(chưa làm)</Text>
            <View style={styles.chevronContainer}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable> */}

          <Pressable
            onPress={() => router.push("/(home)/summary")}
            style={styles.reportButton}
          >
            <View style={styles.reportIconContainer}>
              <Octicons name="repo-pull" size={24} color="black" />
            </View>
            <Text style={styles.reportText}>Thống kê điểm danh</Text>
            <View style={styles.chevronContainer}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>

          <Pressable style={styles.reportButton}>
            <View style={styles.reportIconContainer}>
              <Octicons name="report" size={24} color="black" />
            </View>
            <Text style={styles.reportText}>Tất cả nội dung báo cáo(chưa làm)</Text>
            <View style={styles.chevronContainer}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>

          <Pressable style={styles.reportButton}>
            <View style={styles.reportIconContainer}>
              <Ionicons name="people" size={24} color="black" />
            </View>
            <Text style={styles.reportText}>Nhân viên làm thêm giờ(chưa làm)</Text>
            <View style={styles.chevronContainer}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
          <Pressable style={styles.reportButton}>
            <View style={styles.reportIconContainer}>
            <Entypo name="documents" size={24} color="black" />
            </View>
            <Text style={styles.reportText}>Nội dung</Text>
            <View style={styles.chevronContainer}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
          <Pressable style={styles.reportButton}>
            <View style={styles.reportIconContainer}>
            <Entypo name="documents" size={24} color="black" /> 
            </View>
            <Text style={styles.reportText}>Nội dung</Text>
            <View style={styles.chevronContainer}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
          <Pressable style={styles.reportButton}>
            <View style={styles.reportIconContainer}>
            <Entypo name="documents" size={24} color="black" />
            </View>
            <Text style={styles.reportText}>Nội dung</Text>
            <View style={styles.chevronContainer}>
              <Entypo name="documents" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        {/* <View style={styles.extraButtonRow}>
          <View style={styles.extraButton}>
            <View style={styles.extraIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.extraButtonText}>Đánh giá tham dự(chưa làm)</Text>
          </View>
          <View style={styles.extraButton}>
            <View style={styles.extraIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.extraButtonText}>Đánh giá tham dự(chưa làm)</Text>
          </View>
          <View style={styles.extraButton}>
            <View style={styles.extraIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.extraButtonText}>Đánh giá tham dự(chưa làm)</Text>
          </View>

          <View style={styles.extraButton}>
            <View style={styles.extraIconContainer}>
              <Feather name="bar-chart" size={24} color="black" />
            </View>
            <Text style={styles.extraButtonText}>Biểu đồ quy trình làm việc(a)</Text>
          </View>
        </View>
          
        <View style={styles.additionalRow}>
          <View style={styles.additionalButton}>
            <View style={styles.additionalIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.additionalButtonText}>Nội dung</Text>
          </View>
          <View style={styles.additionalButton}>
            <View style={styles.additionalIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.additionalButtonText}>Nội dung</Text>
          </View>
          <View style={styles.additionalButton}>
            <View style={styles.additionalIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.additionalButtonText}>Nội dung</Text>
          </View>
          <View style={styles.additionalButton}>
            <View style={styles.additionalIconContainer}>
              <Feather name="bar-chart" size={24} color="black" />
            </View>
            <Text style={styles.additionalButtonText}>Nội dung</Text>
          </View>
        </View> */}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#66ccff",
    padding: 12,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    marginTop: 7,
    fontWeight: "600",
  },
  reportContainer: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
  },
  reportButton: {
    backgroundColor: "#66ccff",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  reportIconContainer: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  reportText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  chevronContainer: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  extraButtonRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  extraButton: {
    backgroundColor: "#f79d00",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  extraButtonText: {
    marginTop: 7,
  },
  additionalRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  additionalButton: {
    backgroundColor: "#D3CCE3",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  additionalButtonText: {
    marginTop: 7,
  },
  additionalIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  extraIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default index;
