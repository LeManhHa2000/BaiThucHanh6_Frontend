import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getStudentClassAPI, addStudentClassAPI, delStudentClassAPI} from "../api/stinclassapi";
import {getTeacherClassAPI, addTeacherClassAPI, delTeacherClassAPI} from "../api/tcinclassapi";
import {getTeacherAPI} from "../api/teacherapi";
import {getStudentAPI} from "../api/studentapi";
import {getClassByIdAPI,getClassesAPI} from "../api/classesapi";

const DetailClass = () => {
    const [classone, setclassone] = useState({});
    const [tcinclass, settcinclass] = useState([]);
    const [stinclass, setstinclass] = useState([]);
    const [student, setstudent] = useState([]);
    const [teacher, setteacher] = useState([]);
    
    const params = useParams();

    var modalTeacher = document.getElementById("teacherModal");
    var modalStudent = document.getElementById("studentModal");

    const OpenStudentModal = () => {
        // When the user clicks the button, open the modal 
        modalStudent.style.display = "block";
      
        // const inputName = document.getElementById("name");
        // const inputDescription = document.getElementById("description");
        // const inputId = document.getElementById("id");
      
        // inputName.value = "";
        // inputDescription.value = "";
        // inputId.value = "";
    }

    const OpenTeacherModal = () => {
        // When the user clicks the button, open the modal 
        modalTeacher.style.display = "block";
      
        // const inputName = document.getElementById("name");
        // const inputDescription = document.getElementById("description");
        // const inputId = document.getElementById("id");
      
        // inputName.value = "";
        // inputDescription.value = "";
        // inputId.value = "";
    }

    const CloseStudentModal = (e) => {
        e.preventDefault();
        modalStudent.style.display = "none";
    }

    const CloseTeacherModal = (e) => {
        e.preventDefault();
        modalTeacher.style.display = "none";
      }


    useEffect(() => {
        fetchClassData();
        fetchStudentClassData();
        fetchTeacherClassData();
        fetchStudentData();
        fetchTeacherData();


    },[params.classid]);

    const fetchClassData = async () => {
        setclassone(await getClassByIdAPI(params.classid));
    }

    const fetchStudentClassData = async () => {
        setstinclass(await getStudentClassAPI(params.classid));
    }

    const fetchTeacherClassData = async () => {
        settcinclass(await getTeacherClassAPI(params.classid));
    }

    const fetchStudentData = async () => {
        setstudent(await getStudentAPI());
    }

    const fetchTeacherData = async () => {
        setteacher(await getTeacherAPI());
    }

    const AddTeacherClass = async (event) => {
        event.preventDefault();

        const val = event.target[0].value;
        const text = event.target[0].selectedOptions[0].text;
        const idclass = params.classid;
        console.log({val,idclass,text});

        await addTeacherClassAPI({
            nameTeacher: text,
            classId: idclass,
            teacherId: val
        })

        modalTeacher.style.display = "none";
        fetchTeacherClassData();

    }

    const AddstudentClass = async (event) => {
        event.preventDefault();

        const val = event.target[0].value;
        const text = event.target[0].selectedOptions[0].text;
        const idclass = params.classid;
        console.log({val,idclass,text});

        await addStudentClassAPI({
            nameStudent: text,
            classId: idclass,
            studentId: val
        })

        modalStudent.style.display = "none";
        fetchStudentClassData();

    }

    const delTcClass = async (id) => {
        if(window.confirm("Bạn có chắc là xóa không ?")){
          await delTeacherClassAPI(id);
          window.location.reload();
        }
    }

    const delStClass = async (id) => {
        if(window.confirm("Bạn có chắc là xóa không ?")){
          await delStudentClassAPI(id);
          window.location.reload();
        }
    }
    
    return (
        <div className="container mt-5">
            <h1 className="text-center mt-5">Thông tin lớp học</h1>
            {
                <div className="class-info mb-5 mt-5">
                    <p><span className="text-bold mr-5">Tên lớp :</span><span>{classone.name}</span></p>
                    <p><span className="text-bold mr-5">Mô tả :</span><span>{classone.description}</span></p>
                </div>
            }
            <hr></hr>
            <div className="userclass mt-3 mb-5">
                <h2>Giảng viên trong lớp</h2>
                <button className="button-sm button3" onClick={() => OpenTeacherModal()}>Thêm mới</button>
                <table className="customers">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên giảng viên</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {tcinclass.length > 0 ? (
                        
                        tcinclass?.map((item, key) => (
                            <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.nameTeacher}</td>
                            <td className="text-center">
                                <button className="button button1" onClick={() => delTcClass(item.id)}>Xóa</button>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td className="text-center" colSpan="3">Không có dữ liệu</td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            <hr></hr>
            <div className="userclass mt-5">
                <h2>Học viên trong lớp</h2>
                <button className="button-sm button3" onClick={() => OpenStudentModal()}>Thêm mới</button>
                <table className="customers">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên học viên</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {stinclass.length > 0 ? (
                        
                        stinclass?.map((item, key) => (
                            <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.nameStudent}</td>
                            <td className="text-center">
                                <button className="button button1" onClick={() => delStClass(item.id)}>Xóa</button>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td className="text-center" colSpan="3">Không có dữ liệu</td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
            <div id="teacherModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                    <span className="close" onClick={(e) => CloseTeacherModal(e)}>&times;</span>
                    <h2>Thêm giảng viên</h2>
                    </div>
                    <div className="modal-body mt-5 mb-5">
                    <form onSubmit={AddTeacherClass} name="Formteacher">
                        <label htmlFor="name">Sinh viên</label>
                        <select className="form-control" id="name" name="name">
                        <option>Chọn giảng viên</option>
                            {teacher?.length > 0 ? (
                                teacher?.map((item, key) => (
                                    <option value={item.id} key={key}>{item.name}</option>
                                ))
                            ) : (
                                <></>
                            )
                            }
                        </select>
                        <div className="modal-group-btn">
                        <button type="submit" className="button-sm btn-submit">Xác nhận</button>
                        <button className="button-sm btn-cancel" onClick={(e) => CloseTeacherModal(e)}>Đóng</button>
                        </div>
                    </form>
                    </div>
                </div>

            </div>
            <div id="studentModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                    <span className="close" onClick={(e) => CloseStudentModal(e)}>&times;</span>
                    <h2>Thêm học viên</h2>
                    </div>
                    <div className="modal-body mt-5 mb-5">
                    <form onSubmit={AddstudentClass} name="Formstudent">
                        <select className="form-control" id="name" name="name">
                            <option>Chọn học viên</option>
                                {student?.length > 0 ? (
                                    student?.map((item, key) => (
                                        <option value={item.id} key={key}>{item.name}</option>
                                    ))
                                ) : (
                                    <></>
                                )
                                }
                        </select>

                        <div className="modal-group-btn">
                        <button type="submit" className="button-sm btn-submit">Xác nhận</button>
                        <button className="button-sm btn-cancel" onClick={(e) => CloseStudentModal(e)}>Đóng</button>
                        </div>
                    </form>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default DetailClass;