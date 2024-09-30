const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

const Employee = require("./models/employee");
const Attendance = require("./models/attendance");

// Endpoint để đăng ký một nhân viên
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    // Tạo một nhân viên mới
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Nhân viên được lưu thành công!!", employee: newEmployee });
  } catch (error) {
    console.log("Lỗi tạo nhân viên!!", error);
    res.status(500).json({ message: "Không thể thêm nhân viên" });
  }
});

// Endpoint để lấy tất cả nhân viên
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Không lấy được nhân viên" });
  }
});

// Endpoint để gửi điểm danh
app.post("/attendance", async (req, res) => {
  try {
    const { employeeId, employeeName, date, status } = req.body;

    const existingAttendance = await Attendance.findOne({ employeeId, date });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = new Attendance({
        employeeId,
        employeeName,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi gửi điểm danh" });
  }
});

// Endpoint để lấy dữ liệu điểm danh
app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;

    // Tìm kiếm bản ghi điểm danh cho ngày đã chỉ định
    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tìm nạp dữ liệu tham dự" });
  }
});

// Endpoint để tạo báo cáo điểm danh cho tất cả nhân viên
app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;

    console.log("Tham số truy vấn:", month, year);
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD").startOf("month").toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Tập hợp dữ liệu điểm danh cho tất cả nhân viên và khoảng thời gian
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: { $dateFromString: { dateString: "$date" } } }, parseInt(month)] },
              { $eq: [{ $year: { $dateFromString: { dateString: "$date" } } }, parseInt(year)] }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$employeeId",
          present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] } },
          halfday: { $sum: { $cond: [{ $eq: ["$status", "halfday"] }, 1, 0] } },
          holiday: { $sum: { $cond: [{ $eq: ["$status", "holiday"] }, 1, 0] } }
        }
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails"
        }
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          holiday: 1,
          name: "$employeeDetails.employeeName",
          designation: "$employeeDetails.designation",
          salary: "$employeeDetails.salary",
          employeeId: "$employeeDetails.employeeId"
        }
      }
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error("Báo cáo chấm công tạo lỗi:", error);
    res.status(500).json({ message: "Lỗi khi tạo báo cáo" });
  }
});

// Endpoint để xóa nhân viên
app.delete("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const result = await Employee.findOneAndDelete({ employeeId: employeeId });

    if (!result) {
      return res.status(404).json({ message: "Nhân viên không tìm thấy" });
    }

    res.status(200).json({ message: "Nhân viên đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa nhân viên:", error);
    res.status(500).json({ message: "Lỗi khi xóa nhân viên" });
  }
});
// endpoint để lấy thông tin nhân viên
// Endpoint để cập nhật thông tin nhân viên
app.put("/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Nhân viên không tìm thấy" });
    }
    res.status(200).json({ message: "Cập nhật thành công", employee: updatedEmployee });
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin nhân viên:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật thông tin nhân viên" });
  }
});
