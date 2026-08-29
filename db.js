/* =========================================================
ONLINE STUDENTS CLEARANCE MANAGEMENT SYSTEM
LOCAL STORAGE DATABASE
FILE: db.js
========================================================= */

"use strict";

/* =========================================================
DATABASE KEYS
========================================================= */

const DB_KEYS = {
    USERS: "clearance_users",
    STUDENTS: "clearance_students",
    OFFICERS: "clearance_officers",
    ADMINS: "clearance_admins",
    DEPARTMENTS: "clearance_departments",
    CLEARANCE_STAGES: "clearance_stages",
    CLEARANCE_REQUESTS: "clearance_requests",
    NOTIFICATIONS: "clearance_notifications",
    SETTINGS: "clearance_settings",
    CURRENT_USER: "clearance_current_user",
    SYSTEM_INFO: "clearance_system_info"
};

/* =========================================================
GENERAL DATABASE FUNCTIONS
========================================================= */

function dbGet(key, defaultValue = []) {

    try {

        const data =
            localStorage.getItem(key);

        if (data === null) {
            return defaultValue;
        }

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Database read error:",
            key,
            error
        );

        return defaultValue;

    }

}

function dbSave(key, data) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "Database save error:",
            key,
            error
        );

        alert(
            "Unable to save data. Your browser storage may be full."
        );

        return false;

    }

}

function dbRemove(key) {

    localStorage.removeItem(key);

}

function dbClearAll() {

    localStorage.removeItem(DB_KEYS.USERS);
    localStorage.removeItem(DB_KEYS.STUDENTS);
    localStorage.removeItem(DB_KEYS.OFFICERS);
    localStorage.removeItem(DB_KEYS.ADMINS);
    localStorage.removeItem(DB_KEYS.DEPARTMENTS);
    localStorage.removeItem(DB_KEYS.CLEARANCE_STAGES);
    localStorage.removeItem(DB_KEYS.CLEARANCE_REQUESTS);
    localStorage.removeItem(DB_KEYS.NOTIFICATIONS);
    localStorage.removeItem(DB_KEYS.SETTINGS);
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
    localStorage.removeItem(DB_KEYS.SYSTEM_INFO);

}

/* =========================================================
ID GENERATOR
========================================================= */

function generateId(prefix = "ID") {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.floor(
            Math.random() * 100000
        )
    );

}

/* =========================================================
DATE FUNCTIONS
========================================================= */

function getCurrentDate() {

    return new Date()
        .toISOString()
        .split("T")[0];

}

function getCurrentDateTime() {

    return new Date()
        .toISOString();

}

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}

/* =========================================================
DEFAULT SYSTEM INFORMATION
========================================================= */

function getDefaultSystemInfo() {

    return {

        systemName:
            "Online Students Clearance Management System",

        institutionName:
            "Federal Polytechnic Kaura Namoda",

        institutionShortName:
            "FEDPONAM",

        logo:
            "logo.png",

        version:
            "1.0.0",

        createdAt:
            getCurrentDateTime()

    };

}

/* =========================================================
DEFAULT SYSTEM SETTINGS
========================================================= */

function getDefaultSettings() {

    return {

        clearanceSession:
            "2025/2026",

        allowNewClearance:
            true,

        allowStudentProfileEdit:
            true,

        requireAllStagesApproved:
            true,

        enableNotifications:
            true,

        enableImageUpload:
            true,

        enablePrintClearance:
            true,

        theme:
            "default",

        updatedAt:
            getCurrentDateTime()

    };

}

/* =========================================================
DEFAULT DEPARTMENTS
========================================================= */

function getDefaultDepartments() {

    return [

        {
            id: "DEPT_CS",
            name: "Computer Science",
            code: "CSC",
            status: "active"
        },

        {
            id: "DEPT_STAT",
            name: "Statistics",
            code: "STA",
            status: "active"
        },

        {
            id: "DEPT_SLT",
            name: "Science Laboratory Technology",
            code: "SLT",
            status: "active"
        },

        {
            id: "DEPT_EEE",
            name: "Electrical Engineering",
            code: "EEE",
            status: "active"
        }

    ];

}

/* =========================================================
DEFAULT CLEARANCE STAGES
========================================================= */

function getDefaultClearanceStages() {

    return [

        {
            id: "STAGE_DEPARTMENT",
            name: "Departmental Clearance",
            unit: "Department",
            officerId: null,
            stageOrder: 1,
            required: true,
            status: "active"
        },

        {
            id: "STAGE_LIBRARY",
            name: "Library Clearance",
            unit: "Library",
            officerId: null,
            stageOrder: 2,
            required: true,
            status: "active"
        },

        {
            id: "STAGE_BURSARY",
            name: "Bursary Clearance",
            unit: "Bursary",
            officerId: null,
            stageOrder: 3,
            required: true,
            status: "active"
        },

        {
            id: "STAGE_STUDENTS_AFFAIRS",
            name: "Students' Affairs Clearance",
            unit: "Students' Affairs",
            officerId: null,
            stageOrder: 4,
            required: true,
            status: "active"
        },

        {
            id: "STAGE_FINAL",
            name: "Final Clearance",
            unit: "Records Unit",
            officerId: null,
            stageOrder: 5,
            required: true,
            status: "active"
        }

    ];

}

/* =========================================================
DEFAULT ADMIN USER
CHANGE PASSWORD AFTER FIRST LOGIN
========================================================= */

function getDefaultUsers() {

    return [

        {
            id: "ADMIN_001",
            username: "admin",
            password: "admin123",
            role: "admin",
            fullName: "System Administrator",
            email: "",
            phone: "",
            status: "active",
            createdAt:
                getCurrentDateTime(),
            lastLogin: null
        }

    ];

}

function getDefaultAdmins() {

    return [

        {
            id: "ADMIN_001",
            userId: "ADMIN_001",
            fullName: "System Administrator",
            email: "",
            phone: "",
            profileImage: "",
            createdAt:
                getCurrentDateTime()
        }

    ];

}

/* =========================================================
INITIALIZE DATABASE
========================================================= */

function initializeDatabase() {

    if (
        !localStorage.getItem(
            DB_KEYS.SYSTEM_INFO
        )
    ) {

        dbSave(
            DB_KEYS.SYSTEM_INFO,
            getDefaultSystemInfo()
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.SETTINGS
        )
    ) {

        dbSave(
            DB_KEYS.SETTINGS,
            getDefaultSettings()
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.DEPARTMENTS
        )
    ) {

        dbSave(
            DB_KEYS.DEPARTMENTS,
            getDefaultDepartments()
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.CLEARANCE_STAGES
        )
    ) {

        dbSave(
            DB_KEYS.CLEARANCE_STAGES,
            getDefaultClearanceStages()
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.USERS
        )
    ) {

        dbSave(
            DB_KEYS.USERS,
            getDefaultUsers()
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.ADMINS
        )
    ) {

        dbSave(
            DB_KEYS.ADMINS,
            getDefaultAdmins()
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.STUDENTS
        )
    ) {

        dbSave(
            DB_KEYS.STUDENTS,
            []
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.OFFICERS
        )
    ) {

        dbSave(
            DB_KEYS.OFFICERS,
            []
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.CLEARANCE_REQUESTS
        )
    ) {

        dbSave(
            DB_KEYS.CLEARANCE_REQUESTS,
            []
        );

    }

    if (
        !localStorage.getItem(
            DB_KEYS.NOTIFICATIONS
        )
    ) {

        dbSave(
            DB_KEYS.NOTIFICATIONS,
            []
        );

    }

    console.log(
        "Clearance database initialized successfully."
    );

}

/* =========================================================
USER FUNCTIONS
========================================================= */

function getUsers() {

    return dbGet(
        DB_KEYS.USERS,
        []
    );

}

function getUserById(userId) {

    const users =
        getUsers();

    return users.find(
        user =>
            user.id === userId
    );

}

function getUserByUsername(username) {

    if (!username) {
        return undefined;
    }

    const users =
        getUsers();

    const normalizedUsername =
        String(username)
            .trim()
            .toLowerCase();

    return users.find(
        user =>
            String(
                user.username || ""
            )
            .trim()
            .toLowerCase() ===
            normalizedUsername
    );

}

function createUser(userData) {

    const username =
        String(
            userData.username || ""
        )
        .trim();

    if (!username) {

        return {
            success: false,
            message:
                "Username is required."
        };

    }

    if (!userData.password) {

        return {
            success: false,
            message:
                "Password is required."
        };

    }

    const users =
        getUsers();

    const existingUser =
        getUserByUsername(
            username
        );

    if (existingUser) {

        return {
            success: false,
            message:
                "Username already exists."
        };

    }

    const newUser = {

        id:
            generateId("USER"),

        username:
            username,

        password:
            userData.password,

        role:
            userData.role,

        fullName:
            userData.fullName || "",

        email:
            userData.email || "",

        phone:
            userData.phone || "",

        status:
            userData.status || "active",

        createdAt:
            getCurrentDateTime(),

        lastLogin:
            null

    };

    users.push(newUser);

    dbSave(
        DB_KEYS.USERS,
        users
    );

    return {

        success: true,

        message:
            "User created successfully.",

        data:
            newUser

    };

}

function updateUser(
    userId,
    updatedData
) {

    const users =
        getUsers();

    const index =
        users.findIndex(
            user =>
                user.id === userId
        );

    if (index === -1) {

        return {
            success: false,
            message:
                "User not found."
        };

    }

    if (
        updatedData.username &&
        String(updatedData.username)
            .trim()
            .toLowerCase() !==
        String(
            users[index].username || ""
        )
        .trim()
        .toLowerCase()
    ) {

        const existingUser =
            getUserByUsername(
                updatedData.username
            );

        if (
            existingUser &&
            existingUser.id !== userId
        ) {

            return {
                success: false,
                message:
                    "Username already exists."
            };

        }

    }

    users[index] = {

        ...users[index],

        ...updatedData,

        username:
            updatedData.username !== undefined
                ? String(
                    updatedData.username
                ).trim()
                : users[index].username

    };

    dbSave(
        DB_KEYS.USERS,
        users
    );

    return {

        success: true,

        message:
            "User updated successfully.",

        data:
            users[index]

    };

}

function deleteUser(userId) {

    let users =
        getUsers();

    const userExists =
        users.some(
            user =>
                user.id === userId
        );

    if (!userExists) {

        return {
            success: false,
            message:
                "User not found."
        };

    }

    users =
        users.filter(
            user =>
                user.id !== userId
        );

    dbSave(
        DB_KEYS.USERS,
        users
    );

    return {

        success: true,

        message:
            "User deleted successfully."

    };

}

function deactivateUser(userId) {

    return updateUser(
        userId,
        {
            status: "inactive"
        }
    );

}

function activateUser(userId) {

    return updateUser(
        userId,
        {
            status: "active"
        }
    );

}

/* =========================================================
STUDENT FUNCTIONS
========================================================= */

function getStudents() {

    return dbGet(
        DB_KEYS.STUDENTS,
        []
    );

}

function getStudentById(studentId) {

    const students =
        getStudents();

    return students.find(
        student =>
            student.id === studentId
    );

}

function getStudentByUserId(userId) {

    const students =
        getStudents();

    return students.find(
        student =>
            student.userId === userId
    );

}

function getStudentByRegistrationNumber(
    registrationNumber
) {

    if (!registrationNumber) {
        return undefined;
    }

    const students =
        getStudents();

    const normalizedRegistrationNumber =
        String(registrationNumber)
            .trim()
            .toLowerCase();

    return students.find(
        student =>
            String(
                student.registrationNumber || ""
            )
            .trim()
            .toLowerCase() ===
            normalizedRegistrationNumber
    );

}

function createStudent(studentData) {

    const registrationNumber =
        String(
            studentData.registrationNumber || ""
        )
        .trim();

    if (!registrationNumber) {

        return {
            success: false,
            message:
                "Registration number is required."
        };

    }

    const students =
        getStudents();

    const existingStudent =
        getStudentByRegistrationNumber(
            registrationNumber
        );

    if (existingStudent) {

        return {
            success: false,
            message:
                "Registration number already exists."
        };

    }

    const userResult =
        createUser({

            username:
                registrationNumber,

            password:
                studentData.password,

            role:
                "student",

            fullName:
                studentData.fullName,

            email:
                studentData.email,

            phone:
                studentData.phone,

            status:
                "active"

        });

    if (!userResult.success) {
        return userResult;
    }

    const newStudent = {

        id:
            generateId("STUDENT"),

        userId:
            userResult.data.id,

        fullName:
            studentData.fullName || "",

        registrationNumber:
            registrationNumber,

        departmentId:
            studentData.departmentId || "",

        department:
            studentData.department || "",

        level:
            studentData.level || "",

        email:
            studentData.email || "",

        phone:
            studentData.phone || "",

        gender:
            studentData.gender || "",

        profileImage:
            studentData.profileImage || "",

        clearanceStatus:
            "not_started",

        createdAt:
            getCurrentDateTime(),

        updatedAt:
            getCurrentDateTime()

    };

    students.push(newStudent);

    dbSave(
        DB_KEYS.STUDENTS,
        students
    );

    return {

        success: true,

        message:
            "Student created successfully.",

        data:
            newStudent

    };

}

function updateStudent(
    studentId,
    updatedData
) {

    const students =
        getStudents();

    const index =
        students.findIndex(
            student =>
                student.id === studentId
        );

    if (index === -1) {

        return {
            success: false,
            message:
                "Student not found."
        };

    }

    students[index] = {

        ...students[index],

        ...updatedData,

        updatedAt:
            getCurrentDateTime()

    };

    dbSave(
        DB_KEYS.STUDENTS,
        students
    );

    const student =
        students[index];

    const userUpdate = {};

    if (
        updatedData.fullName !== undefined
    ) {

        userUpdate.fullName =
            updatedData.fullName;

    }

    if (
        updatedData.email !== undefined
    ) {

        userUpdate.email =
            updatedData.email;

    }

    if (
        updatedData.phone !== undefined
    ) {

        userUpdate.phone =
            updatedData.phone;

    }

    if (
        Object.keys(userUpdate).length > 0
    ) {

        updateUser(
            student.userId,
            userUpdate
        );

    }

    return {

        success: true,

        message:
            "Student updated successfully.",

        data:
            student

    };

}

function deleteStudent(studentId) {

    const student =
        getStudentById(studentId);

    if (!student) {

        return {
            success: false,
            message:
                "Student not found."
        };

    }

    let students =
        getStudents();

    students =
        students.filter(
            item =>
                item.id !== studentId
        );

    dbSave(
        DB_KEYS.STUDENTS,
        students
    );

    deleteUser(
        student.userId
    );

    return {

        success: true,

        message:
            "Student deleted successfully."

    };

}

/* =========================================================
STUDENT PROFILE IMAGE
========================================================= */

function updateStudentImage(
    studentId,
    imageData
) {

    return updateStudent(
        studentId,
        {
            profileImage:
                imageData
        }
    );

}

function removeStudentImage(studentId) {

    return updateStudent(
        studentId,
        {
            profileImage: ""
        }
    );

}

/* =========================================================
OFFICER FUNCTIONS
========================================================= */

function getOfficers() {

    return dbGet(
        DB_KEYS.OFFICERS,
        []
    );

}

function getOfficerById(officerId) {

    const officers =
        getOfficers();

    return officers.find(
        officer =>
            officer.id === officerId
    );

}

function getOfficerByUserId(userId) {

    const officers =
        getOfficers();

    return officers.find(
        officer =>
            officer.userId === userId
    );

}

function createOfficer(officerData) {

    const username =
        String(
            officerData.username || ""
        )
        .trim();

    if (!username) {

        return {
            success: false,
            message:
                "Officer username is required."
        };

    }

    if (!officerData.password) {

        return {
            success: false,
            message:
                "Officer password is required."
        };

    }

    const userResult =
        createUser({

            username:
                username,

            password:
                officerData.password,

            role:
                "officer",

            fullName:
                officerData.fullName,

            email:
                officerData.email,

            phone:
                officerData.phone,

            status:
                officerData.status || "active"

        });

    if (!userResult.success) {
        return userResult;
    }

    const officers =
        getOfficers();

    const newOfficer = {

        id:
            generateId("OFFICER"),

        userId:
            userResult.data.id,

        fullName:
            officerData.fullName || "",

        username:
            username,

        email:
            officerData.email || "",

        phone:
            officerData.phone || "",

        unit:
            officerData.unit || "",

        departmentId:
            officerData.departmentId || "",

        profileImage:
            officerData.profileImage || "",

        status:
            officerData.status || "active",

        createdAt:
            getCurrentDateTime(),

        updatedAt:
            getCurrentDateTime()

    };

    officers.push(newOfficer);

    dbSave(
        DB_KEYS.OFFICERS,
        officers
    );

    return {

        success: true,

        message:
            "Officer created successfully.",

        data:
            newOfficer

    };

}

/* =========================================================
UPDATE OFFICER
SYNCHRONIZES OFFICER PROFILE WITH USER ACCOUNT
========================================================= */

function updateOfficer(
    officerId,
    updatedData
) {

    const officers =
        getOfficers();

    const index =
        officers.findIndex(
            officer =>
                officer.id === officerId
        );

    if (index === -1) {

        return {
            success: false,
            message:
                "Officer not found."
        };

    }

    const officer =
        officers[index];

    const userUpdate = {};

    if (
        updatedData.fullName !== undefined
    ) {

        userUpdate.fullName =
            updatedData.fullName;

    }

    if (
        updatedData.email !== undefined
    ) {

        userUpdate.email =
            updatedData.email;

    }

    if (
        updatedData.phone !== undefined
    ) {

        userUpdate.phone =
            updatedData.phone;

    }

    if (
        updatedData.username !== undefined
    ) {

        userUpdate.username =
            updatedData.username;

    }

    if (
        updatedData.password !== undefined &&
        updatedData.password !== ""
    ) {

        userUpdate.password =
            updatedData.password;

    }

    if (
        updatedData.status !== undefined
    ) {

        userUpdate.status =
            updatedData.status;

    }

    if (
        Object.keys(userUpdate).length > 0
    ) {

        const userResult =
            updateUser(
                officer.userId,
                userUpdate
            );

        if (!userResult.success) {
            return userResult;
        }

    }

    officers[index] = {

        ...officers[index],

        ...updatedData,

        username:
            updatedData.username !== undefined
                ? String(
                    updatedData.username
                ).trim()
                : officers[index].username,

        updatedAt:
            getCurrentDateTime()

    };

    dbSave(
        DB_KEYS.OFFICERS,
        officers
    );

    return {

        success: true,

        message:
            "Officer updated successfully.",

        data:
            officers[index]

    };

}

/* =========================================================
DELETE OFFICER
REMOVE ASSIGNMENTS SAFELY
========================================================= */

function deleteOfficer(officerId) {

    const officer =
        getOfficerById(officerId);

    if (!officer) {

        return {
            success: false,
            message:
                "Officer not found."
        };

    }

    /* REMOVE OFFICER FROM MASTER STAGES */

    const stages =
        getClearanceStages();

    let stagesChanged =
        false;

    stages.forEach(
        stage => {

            if (
                stage.officerId ===
                officerId
            ) {

                stage.officerId =
                    null;

                stagesChanged =
                    true;

            }

        }
    );

    if (stagesChanged) {

        dbSave(
            DB_KEYS.CLEARANCE_STAGES,
            stages
        );

    }

    /* REMOVE OFFICER FROM UNREVIEWED REQUEST STAGES */

    const requests =
        getClearanceRequests();

    let requestsChanged =
        false;

    requests.forEach(
        request => {

            if (
                !Array.isArray(
                    request.stages
                )
            ) {
                return;
            }

            request.stages.forEach(
                stage => {

                    if (
                        stage.officerId ===
                        officerId &&
                        (
                            stage.status === "pending" ||
                            stage.status === "locked"
                        )
                    ) {

                        stage.officerId =
                            null;

                        requestsChanged =
                            true;

                    }

                }
            );

        }
    );

    if (requestsChanged) {

        dbSave(
            DB_KEYS.CLEARANCE_REQUESTS,
            requests
        );

    }

    let officers =
        getOfficers();

    officers =
        officers.filter(
            item =>
                item.id !== officerId
        );

    dbSave(
        DB_KEYS.OFFICERS,
        officers
    );

    deleteUser(
        officer.userId
    );

    return {

        success: true,

        message:
            "Officer deleted successfully."

    };

}

/* =========================================================
DEPARTMENT FUNCTIONS
========================================================= */

function getDepartments() {

    return dbGet(
        DB_KEYS.DEPARTMENTS,
        []
    );

}

function getDepartmentById(
    departmentId
) {

    const departments =
        getDepartments();

    return departments.find(
        department =>
            department.id === departmentId
    );

}

function createDepartment(
    departmentData
) {

    const departments =
        getDepartments();

    const newDepartment = {

        id:
            generateId("DEPT"),

        name:
            departmentData.name,

        code:
            departmentData.code || "",

        status:
            "active"

    };

    departments.push(
        newDepartment
    );

    dbSave(
        DB_KEYS.DEPARTMENTS,
        departments
    );

    return {

        success: true,

        message:
            "Department created successfully.",

        data:
            newDepartment

    };

}

function updateDepartment(
    departmentId,
    updatedData
) {

    const departments =
        getDepartments();

    const index =
        departments.findIndex(
            department =>
                department.id === departmentId
        );

    if (index === -1) {

        return {
            success: false,
            message:
                "Department not found."
        };

    }

    departments[index] = {

        ...departments[index],

        ...updatedData

    };

    dbSave(
        DB_KEYS.DEPARTMENTS,
        departments
    );

    return {

        success: true,

        message:
            "Department updated successfully.",

        data:
            departments[index]

    };

}

function deleteDepartment(
    departmentId
) {

    let departments =
        getDepartments();

    departments =
        departments.filter(
            department =>
                department.id !== departmentId
        );

    dbSave(
        DB_KEYS.DEPARTMENTS,
        departments
    );

    return {

        success: true,

        message:
            "Department deleted successfully."

    };

}

/* =========================================================
CLEARANCE STAGE FUNCTIONS
========================================================= */

function getClearanceStages() {

    return dbGet(
        DB_KEYS.CLEARANCE_STAGES,
        []
    );

}

function getClearanceStageById(
    stageId
) {

    const stages =
        getClearanceStages();

    return stages.find(
        stage =>
            stage.id === stageId
    );

}

function createClearanceStage(
    stageData
) {

    const stages =
        getClearanceStages();

    if (
        stageData.officerId
    ) {

        const officer =
            getOfficerById(
                stageData.officerId
            );

        if (!officer) {

            return {
                success: false,
                message:
                    "Assigned officer not found."
            };

        }

    }

    const newStage = {

        id:
            generateId("STAGE"),

        name:
            stageData.name,

        unit:
            stageData.unit || "",

        officerId:
            stageData.officerId || null,

        stageOrder:
            stageData.stageOrder ||
            stages.length + 1,

        required:
            stageData.required !== false,

        status:
            "active"

    };

    stages.push(newStage);

    stages.sort(
        (a, b) =>
            a.stageOrder -
            b.stageOrder
    );

    dbSave(
        DB_KEYS.CLEARANCE_STAGES,
        stages
    );

    return {

        success: true,

        message:
            "Clearance stage created successfully.",

        data:
            newStage

    };

}

/* =========================================================
UPDATE CLEARANCE STAGE
SYNCHRONIZE OFFICER ASSIGNMENT TO OPEN REQUESTS
========================================================= */

function updateClearanceStage(
    stageId,
    updatedData
) {

    const stages =
        getClearanceStages();

    const index =
        stages.findIndex(
            stage =>
                stage.id === stageId
        );

    if (index === -1) {

        return {
            success: false,
            message:
                "Clearance stage not found."
        };

    }

    if (
        updatedData.officerId !== undefined &&
        updatedData.officerId !== null &&
        updatedData.officerId !== ""
    ) {

        const officer =
            getOfficerById(
                updatedData.officerId
            );

        if (!officer) {

            return {
                success: false,
                message:
                    "Assigned officer not found."
            };

        }

    }

    stages[index] = {

        ...stages[index],

        ...updatedData,

        officerId:
            updatedData.officerId === ""
                ? null
                : (
                    updatedData.officerId !== undefined
                        ? updatedData.officerId
                        : stages[index].officerId
                )

    };

    dbSave(
        DB_KEYS.CLEARANCE_STAGES,
        stages
    );

    /*
       UPDATE EXISTING REQUEST STAGES ONLY
       WHEN THEY HAVE NOT BEEN REVIEWED
    */

    if (
        updatedData.officerId !== undefined
    ) {

        const requests =
            getClearanceRequests();

        let changed =
            false;

        requests.forEach(
            request => {

                if (
                    !Array.isArray(
                        request.stages
                    )
                ) {
                    return;
                }

                request.stages.forEach(
                    requestStage => {

                        if (
                            requestStage.masterStageId ===
                            stageId
                        ) {

                            if (
                                requestStage.status === "pending" ||
                                requestStage.status === "locked"
                            ) {

                                requestStage.officerId =
                                    stages[index].officerId;

                                changed =
                                    true;

                            }

                        }

                    }
                );

            }
        );

        if (changed) {

            dbSave(
                DB_KEYS.CLEARANCE_REQUESTS,
                requests
            );

        }

    }

    return {

        success: true,

        message:
            "Clearance stage updated successfully.",

        data:
            stages[index]

    };

}

function deleteClearanceStage(
    stageId
) {

    let stages =
        getClearanceStages();

    stages =
        stages.filter(
            stage =>
                stage.id !== stageId
        );

    dbSave(
        DB_KEYS.CLEARANCE_STAGES,
        stages
    );

    return {

        success: true,

        message:
            "Clearance stage deleted successfully."

    };

}

/* =========================================================
CLEARANCE REQUEST FUNCTIONS
========================================================= */

function getClearanceRequests() {

    return dbGet(
        DB_KEYS.CLEARANCE_REQUESTS,
        []
    );

}

function getClearanceRequestById(
    requestId
) {

    const requests =
        getClearanceRequests();

    return requests.find(
        request =>
            request.id === requestId
    );

}

function getStudentClearanceRequest(
    studentId
) {

    const requests =
        getClearanceRequests();

    return requests.find(
        request =>
            request.studentId === studentId
    );

}

function createClearanceRequest(
    studentId
) {

    const student =
        getStudentById(
            studentId
        );

    if (!student) {

        return {
            success: false,
            message:
                "Student not found."
        };

    }

    const existingRequest =
        getStudentClearanceRequest(
            studentId
        );

    if (existingRequest) {

        return {

            success: false,

            message:
                "Student already has a clearance request.",

            data:
                existingRequest

        };

    }

    const settings =
        getSettings();

    if (
        settings.allowNewClearance === false
    ) {

        return {
            success: false,
            message:
                "New clearance requests are currently disabled."
        };

    }

    const masterStages =
        getClearanceStages()
            .filter(
                stage =>
                    stage.status === "active"
            )
            .sort(
                (a, b) =>
                    a.stageOrder -
                    b.stageOrder
            );

    if (
        masterStages.length === 0
    ) {

        return {
            success: false,
            message:
                "No active clearance stages are available."
        };

    }

    const requestStages =
        masterStages.map(
            stage => {

                return {

                    id:
                        generateId(
                            "REQUEST_STAGE"
                        ),

                    masterStageId:
                        stage.id,

                    name:
                        stage.name,

                    unit:
                        stage.unit,

                    officerId:
                        stage.officerId,

                    stageOrder:
                        stage.stageOrder,

                    required:
                        stage.required,

                    status:
                        stage.stageOrder ===
                        masterStages[0].stageOrder
                            ? "pending"
                            : "locked",

                    comment:
                        "",

                    reviewedBy:
                        null,

                    reviewedAt:
                        null

                };

            }
        );

    const newRequest = {

        id:
            generateId("REQUEST"),

        studentId:
            student.id,

        registrationNumber:
            student.registrationNumber,

        studentName:
            student.fullName,

        department:
            student.department,

        requestDate:
            getCurrentDate(),

        overallStatus:
            "pending",

        percentage:
            0,

        certificateNumber:
            null,

        completedAt:
            null,

        printedAt:
            null,

        stages:
            requestStages,

        createdAt:
            getCurrentDateTime(),

        updatedAt:
            getCurrentDateTime()

    };

    const requests =
        getClearanceRequests();

    requests.push(
        newRequest
    );

    dbSave(
        DB_KEYS.CLEARANCE_REQUESTS,
        requests
    );

    updateStudent(
        studentId,
        {
            clearanceStatus:
                "pending"
        }
    );

    createNotification(
        student.userId,
        "Clearance request submitted successfully."
    );

    return {

        success: true,

        message:
            "Clearance request created successfully.",

        data:
            newRequest

    };

}

/* =========================================================
REVIEW CLEARANCE STAGE
========================================================= */

function reviewClearanceStage(
    requestId,
    stageId,
    officerId,
    decision,
    comment = ""
) {

    const requests =
        getClearanceRequests();

    const requestIndex =
        requests.findIndex(
            request =>
                request.id === requestId
        );

    if (requestIndex === -1) {

        return {
            success: false,
            message:
                "Clearance request not found."
        };

    }

    const request =
        requests[requestIndex];

    if (
        !Array.isArray(
            request.stages
        )
    ) {

        return {
            success: false,
            message:
                "Invalid clearance request stages."
        };

    }

    const stage =
        request.stages.find(
            item =>
                item.id === stageId
        );

    if (!stage) {

        return {
            success: false,
            message:
                "Clearance stage not found."
        };

    }

    /* =====================================================
       VALIDATE OFFICER
    ===================================================== */

    let officer =
        getOfficerById(
            officerId
        );

    /*
       SUPPORT USER ID AS WELL AS OFFICER PROFILE ID
    */

    if (!officer) {

        officer =
            getOfficerByUserId(
                officerId
            );

    }

    if (!officer) {

        return {
            success: false,
            message:
                "Officer account could not be found."
        };

    }

    /* =====================================================
       VALIDATE OFFICER STATUS
    ===================================================== */

    if (
        officer.status !== "active"
    ) {

        return {
            success: false,
            message:
                "This officer account is inactive."
        };

    }

    /* =====================================================
       VALIDATE STAGE ASSIGNMENT
    ===================================================== */

    const stageOfficerId =
        String(
            stage.officerId || ""
        )
        .trim();

    const officerProfileId =
        String(
            officer.id || ""
        )
        .trim();

    const officerUserId =
        String(
            officer.userId || ""
        )
        .trim();

    const stageUnit =
        String(
            stage.unit || ""
        )
        .trim()
        .toLowerCase();

    const officerUnit =
        String(
            officer.unit || ""
        )
        .trim()
        .toLowerCase();

    /*
       DIRECT ASSIGNMENT:
       Stage can contain either officer.id or officer.userId.
    */

    const directlyAssigned =
        stageOfficerId !== "" &&
        (
            stageOfficerId ===
            officerProfileId ||

            stageOfficerId ===
            officerUserId
        );

    /*
       UNIT ASSIGNMENT:
       Used only when no specific officer is assigned.
    */

    const assignedByUnit =
        stageOfficerId === "" &&
        stageUnit !== "" &&
        officerUnit !== "" &&
        stageUnit === officerUnit;

    if (
        !directlyAssigned &&
        !assignedByUnit
    ) {

        return {
            success: false,
            message:
                "You are not authorized to review this clearance stage."
        };

    }

    /* =====================================================
       PREVENT REVIEWING LOCKED STAGES
    ===================================================== */

    if (
        stage.status ===
        "locked"
    ) {

        return {
            success: false,
            message:
                "This clearance stage is still locked."
        };

    }

    /* =====================================================
       PREVENT DUPLICATE REVIEW
    ===================================================== */

    if (
        stage.status ===
        "approved" ||

        stage.status ===
        "rejected"
    ) {

        return {
            success: false,
            message:
                "This clearance stage has already been reviewed."
        };

    }

    /* =====================================================
       VALIDATE DECISION
    ===================================================== */

    const normalizedDecision =
        String(
            decision || ""
        )
        .trim()
        .toLowerCase();

    if (
        normalizedDecision !==
        "approved" &&

        normalizedDecision !==
        "rejected"
    ) {

        return {
            success: false,
            message:
                "Invalid clearance decision."
        };

    }

    const normalizedComment =
        String(
            comment || ""
        )
        .trim();

    /*
       A REJECTION MUST HAVE A REASON
    */

    if (
        normalizedDecision ===
        "rejected" &&

        !normalizedComment
    ) {

        return {
            success: false,
            message:
                "A reason is required when rejecting a clearance request."
        };

    }

    /* =====================================================
       UPDATE CURRENT STAGE
    ===================================================== */

    stage.status =
        normalizedDecision;

    stage.comment =
        normalizedComment;

    /*
       STORE THE OFFICER PROFILE ID
    */

    stage.reviewedBy =
        officer.id;

    stage.reviewedAt =
        getCurrentDateTime();

    /* =====================================================
       UNLOCK NEXT STAGE AFTER APPROVAL
    ===================================================== */

    if (
        normalizedDecision ===
        "approved"
    ) {

        const orderedStages =
            request.stages
                .slice()
                .sort(
                    (a, b) =>
                        a.stageOrder -
                        b.stageOrder
                );

        const currentIndex =
            orderedStages.findIndex(
                item =>
                    item.id ===
                    stage.id
            );

        if (
            currentIndex !== -1
        ) {

            const nextStage =
                orderedStages[
                    currentIndex + 1
                ];

            if (
                nextStage &&
                nextStage.status ===
                "locked"
            ) {

                nextStage.status =
                    "pending";

            }

        }

    }

    /* =====================================================
       UPDATE REQUEST PROGRESS
    ===================================================== */

    updateRequestProgress(
        request
    );

    request.updatedAt =
        getCurrentDateTime();

    requests[requestIndex] =
        request;

    dbSave(
        DB_KEYS.CLEARANCE_REQUESTS,
        requests
    );

    /* =====================================================
       NOTIFY STUDENT
    ===================================================== */

    const student =
        getStudentById(
            request.studentId
        );

    if (student) {

        const notificationMessage =
            normalizedComment

                ? `${stage.name} has been ${normalizedDecision} by ${officer.fullName}. ${normalizedComment}`

                : `${stage.name} has been ${normalizedDecision} by ${officer.fullName}.`;

        createNotification(
            student.userId,
            notificationMessage
        );

    }

    return {

        success: true,

        message:
            normalizedDecision ===
            "approved"

                ? "Clearance stage approved successfully."

                : "Clearance stage rejected successfully.",

        data:
            request

    };

}

/* =========================================================
UPDATE REQUEST PROGRESS
========================================================= */

function updateRequestProgress(
    request
) {

    const requiredStages =
        request.stages.filter(
            stage =>
                stage.required
        );

    const totalStages =
        requiredStages.length;

    const approvedStages =
        requiredStages.filter(
            stage =>
                stage.status ===
                "approved"
        ).length;

    request.percentage =
        totalStages > 0

            ? Math.round(
                (
                    approvedStages /
                    totalStages
                ) * 100
            )

            : 0;

    const hasRejected =
        requiredStages.some(
            stage =>
                stage.status ===
                "rejected"
        );

    const allApproved =
        requiredStages.length > 0 &&
        requiredStages.every(
            stage =>
                stage.status ===
                "approved"
        );

    if (allApproved) {

        const wasCompleted =
            request.overallStatus ===
            "completed";

        request.overallStatus =
            "completed";

        if (!wasCompleted) {

            request.completedAt =
                getCurrentDateTime();

            request.certificateNumber =
                generateCertificateNumber(
                    request
                );

        }

        const student =
            getStudentById(
                request.studentId
            );

        if (student) {

            updateStudent(
                student.id,
                {
                    clearanceStatus:
                        "completed"
                }
            );

            if (!wasCompleted) {

                createNotification(
                    student.userId,
                    "Congratulations! Your clearance has been completed. You can now print your clearance certificate."
                );

            }

        }

    } else if (hasRejected) {

        request.overallStatus =
            "rejected";

        const student =
            getStudentById(
                request.studentId
            );

        if (student) {

            updateStudent(
                student.id,
                {
                    clearanceStatus:
                        "rejected"
                }
            );

        }

    } else {

        request.overallStatus =
            "pending";

        const student =
            getStudentById(
                request.studentId
            );

        if (student) {

            updateStudent(
                student.id,
                {
                    clearanceStatus:
                        "pending"
                }
            );

        }

    }

    request.updatedAt =
        getCurrentDateTime();

}

/* =========================================================
CERTIFICATE NUMBER
========================================================= */

function generateCertificateNumber(
    request
) {

    const year =
        new Date()
            .getFullYear();

    const regNo =
        String(
            request.registrationNumber || ""
        )
        .replace(
            /[^a-zA-Z0-9]/g,
            ""
        )
        .slice(-6)
        .toUpperCase();

    return `CL-${year}-${regNo}`;

}

/* =========================================================
PRINT CLEARANCE
========================================================= */

function canStudentPrintClearance(
    studentId
) {

    const settings =
        getSettings();

    if (
        settings.enablePrintClearance ===
        false
    ) {

        return false;
    }

    const request =
        getStudentClearanceRequest(
            studentId
        );

    if (!request) {
        return false;
    }

    return (
        request.overallStatus ===
        "completed"
    );

}

function markClearanceAsPrinted(
    studentId
) {

    const requests =
        getClearanceRequests();

    const index =
        requests.findIndex(
            request =>
                request.studentId ===
                studentId
        );

    if (index === -1) {
        return false;
    }

    if (
        requests[index].overallStatus !==
        "completed"
    ) {

        return false;

    }

    requests[index].printedAt =
        getCurrentDateTime();

    dbSave(
        DB_KEYS.CLEARANCE_REQUESTS,
        requests
    );

    return true;

}

/* =========================================================
NOTIFICATION FUNCTIONS
========================================================= */

function getNotifications() {

    return dbGet(
        DB_KEYS.NOTIFICATIONS,
        []
    );

}

function getUserNotifications(
    userId
) {

    const notifications =
        getNotifications();

    return notifications
        .filter(
            notification =>
                notification.userId ===
                userId
        )
        .sort(
            (a, b) =>
                new Date(
                    b.createdAt
                ) -
                new Date(
                    a.createdAt
                )
        );

}

function createNotification(
    userId,
    message
) {

    const settings =
        getSettings();

    if (
        settings.enableNotifications ===
        false
    ) {

        return null;

    }

    const notifications =
        getNotifications();

    const notification = {

        id:
            generateId(
                "NOTIFICATION"
            ),

        userId:
            userId,

        message:
            message,

        isRead:
            false,

        createdAt:
            getCurrentDateTime()

    };

    notifications.push(
        notification
    );

    dbSave(
        DB_KEYS.NOTIFICATIONS,
        notifications
    );

    return notification;

}

function markNotificationAsRead(
    notificationId
) {

    const notifications =
        getNotifications();

    const index =
        notifications.findIndex(
            notification =>
                notification.id ===
                notificationId
        );

    if (index === -1) {
        return false;
    }

    notifications[index].isRead =
        true;

    dbSave(
        DB_KEYS.NOTIFICATIONS,
        notifications
    );

    return true;

}

function markAllNotificationsAsRead(
    userId
) {

    const notifications =
        getNotifications();

    notifications.forEach(
        notification => {

            if (
                notification.userId ===
                userId
            ) {

                notification.isRead =
                    true;

            }

        }
    );

    dbSave(
        DB_KEYS.NOTIFICATIONS,
        notifications
    );

    return true;

}

function getUnreadNotificationCount(
    userId
) {

    const notifications =
        getUserNotifications(
            userId
        );

    return notifications.filter(
        notification =>
            notification.isRead ===
            false
    ).length;

}

/* =========================================================
LOGIN SESSION FUNCTIONS
========================================================= */

function setCurrentUser(user) {

    if (!user) {
        return null;
    }

    const sessionData = {

        userId:
            user.id,

        username:
            user.username,

        role:
            user.role,

        fullName:
            user.fullName,

        loginTime:
            getCurrentDateTime()

    };

    dbSave(
        DB_KEYS.CURRENT_USER,
        sessionData
    );

    updateUser(
        user.id,
        {
            lastLogin:
                getCurrentDateTime()
        }
    );

    return sessionData;

}

function getCurrentUser() {

    return dbGet(
        DB_KEYS.CURRENT_USER,
        null
    );

}

function logoutCurrentUser() {

    dbRemove(
        DB_KEYS.CURRENT_USER
    );

}

function isLoggedIn() {

    const user =
        getCurrentUser();

    return user !== null;

}

function hasRole(role) {

    const user =
        getCurrentUser();

    if (!user) {
        return false;
    }

    return user.role === role;

}

/* =========================================================
SYSTEM SETTINGS
========================================================= */

function getSystemInfo() {

    return dbGet(
        DB_KEYS.SYSTEM_INFO,
        getDefaultSystemInfo()
    );

}

function updateSystemInfo(
    updatedData
) {

    const systemInfo =
        getSystemInfo();

    const newData = {

        ...systemInfo,

        ...updatedData

    };

    dbSave(
        DB_KEYS.SYSTEM_INFO,
        newData
    );

    return newData;

}

function getSettings() {

    return dbGet(
        DB_KEYS.SETTINGS,
        getDefaultSettings()
    );

}

function updateSettings(
    updatedData
) {

    const settings =
        getSettings();

    const newSettings = {

        ...settings,

        ...updatedData,

        updatedAt:
            getCurrentDateTime()

    };

    dbSave(
        DB_KEYS.SETTINGS,
        newSettings
    );

    return newSettings;

}

/* =========================================================
ADMIN DASHBOARD STATISTICS
========================================================= */

function getDashboardStatistics() {

    const students =
        getStudents();

    const requests =
        getClearanceRequests();

    const officers =
        getOfficers();

    return {

        totalStudents:
            students.length,

        totalOfficers:
            officers.length,

        totalRequests:
            requests.length,

        pendingRequests:
            requests.filter(
                request =>
                    request.overallStatus ===
                    "pending"
            ).length,

        rejectedRequests:
            requests.filter(
                request =>
                    request.overallStatus ===
                    "rejected"
            ).length,

        completedRequests:
            requests.filter(
                request =>
                    request.overallStatus ===
                    "completed"
            ).length

    };

}

/* =========================================================
SEARCH FUNCTIONS
========================================================= */

function searchStudents(
    searchTerm
) {

    const term =
        String(
            searchTerm || ""
        )
        .toLowerCase()
        .trim();

    return getStudents().filter(
        student =>

            String(
                student.fullName || ""
            )
            .toLowerCase()
            .includes(term)

            ||

            String(
                student.registrationNumber || ""
            )
            .toLowerCase()
            .includes(term)

            ||

            String(
                student.department || ""
            )
            .toLowerCase()
            .includes(term)

    );

}

function searchClearanceRequests(
    searchTerm
) {

    const term =
        String(
            searchTerm || ""
        )
        .toLowerCase()
        .trim();

    return getClearanceRequests().filter(
        request =>

            String(
                request.studentName || ""
            )
            .toLowerCase()
            .includes(term)

            ||

            String(
                request.registrationNumber || ""
            )
            .toLowerCase()
            .includes(term)

            ||

            String(
                request.department || ""
            )
            .toLowerCase()
            .includes(term)

            ||

            String(
                request.overallStatus || ""
            )
            .toLowerCase()
            .includes(term)

    );

}

/* =========================================================
BACKUP DATABASE
========================================================= */

function exportDatabase() {

    const backupData = {

        exportedAt:
            getCurrentDateTime(),

        systemInfo:
            getSystemInfo(),

        settings:
            getSettings(),

        users:
            getUsers(),

        students:
            getStudents(),

        officers:
            getOfficers(),

        admins:
            dbGet(
                DB_KEYS.ADMINS,
                []
            ),

        departments:
            getDepartments(),

        clearanceStages:
            getClearanceStages(),

        clearanceRequests:
            getClearanceRequests(),

        notifications:
            getNotifications()

    };

    return JSON.stringify(
        backupData,
        null,
        2
    );

}

/* =========================================================
DOWNLOAD DATABASE BACKUP
========================================================= */

function downloadDatabaseBackup() {

    const backup =
        exportDatabase();

    const blob =
        new Blob(
            [backup],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const link =
        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        `clearance-backup-${getCurrentDate()}.json`;

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    URL.revokeObjectURL(
        url
    );

}

/* =========================================================
IMPORT DATABASE BACKUP
========================================================= */

function importDatabase(
    backupData
) {

    try {

        const data =
            typeof backupData === "string"

                ? JSON.parse(
                    backupData
                )

                : backupData;

        if (!data) {

            return {
                success: false,
                message:
                    "Invalid backup file."
            };

        }

        if (data.systemInfo) {

            dbSave(
                DB_KEYS.SYSTEM_INFO,
                data.systemInfo
            );

        }

        if (data.settings) {

            dbSave(
                DB_KEYS.SETTINGS,
                data.settings
            );

        }

        if (data.users) {

            dbSave(
                DB_KEYS.USERS,
                data.users
            );

        }

        if (data.students) {

            dbSave(
                DB_KEYS.STUDENTS,
                data.students
            );

        }

        if (data.officers) {

            dbSave(
                DB_KEYS.OFFICERS,
                data.officers
            );

        }

        if (data.admins) {

            dbSave(
                DB_KEYS.ADMINS,
                data.admins
            );

        }

        if (data.departments) {

            dbSave(
                DB_KEYS.DEPARTMENTS,
                data.departments
            );

        }

        if (data.clearanceStages) {

            dbSave(
                DB_KEYS.CLEARANCE_STAGES,
                data.clearanceStages
            );

        }

        if (data.clearanceRequests) {

            dbSave(
                DB_KEYS.CLEARANCE_REQUESTS,
                data.clearanceRequests
            );

        }

        if (data.notifications) {

            dbSave(
                DB_KEYS.NOTIFICATIONS,
                data.notifications
            );

        }

        initializeDatabase();

        return {

            success: true,

            message:
                "Database imported successfully."

        };

    } catch (error) {

        console.error(
            "Import error:",
            error
        );

        return {

            success: false,

            message:
                "Invalid backup file."

        };

    }

}

/* =========================================================
RESET SYSTEM
WARNING: DELETES ALL DATA
========================================================= */

function resetSystem() {

    const confirmed =
        confirm(
            "WARNING!\n\nThis will delete all students, officers, clearance requests and notifications.\n\nDo you want to continue?"
        );

    if (!confirmed) {

        return false;

    }

    dbClearAll();

    initializeDatabase();

    return true;

}

/* =========================================================
AUTO INITIALIZE DATABASE
========================================================= */

initializeDatabase();

/* =========================================================
DATABASE READY
========================================================= */

console.log(
    "%cOnline Students Clearance Database Ready",
    "font-size:16px; font-weight:bold;"
);