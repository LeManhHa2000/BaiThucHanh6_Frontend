import { useEffect, useRef, useState } from "react";
import {getStudentAPI, addStudentAPI, editStudentAPI, delStudentAPT} from "../api/studentapi";
import "../Css/index1.css"; 

const Student = () => {

    const [student, setstudent] = useState([]);
    const [titletext, settext] = useState("Thêm mới học viên");
    const StudentRef = useRef([]);

    var modal = document.getElementById("myModal");

    const OpenModal = () => {
      // When the user clicks the button, open the modal 
      modal.style.display = "block";
    
      const inputName = document.getElementById("name");
      const inputEmail = document.getElementById("email");
      const inputId = document.getElementById("id");
    
      inputName.value = "";
      inputEmail.value = "";
      inputId.value = "";
    }
    
    const CloseModal = (e) => {
      e.preventDefault();
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }

    useEffect(() => {
        fetchData();
    },[]);
    
      
    const fetchData = async () => {
        setstudent(await getStudentAPI());
    }

    const delStudent = async (id) => {
        if(window.confirm("Bạn có chắc là xóa không ?")){
          await delStudentAPT(id);
          window.location.reload();
        }
      }
    
      const editStudent = (id) => {
        modal.style.display = "block";
        settext("Chỉnh sửa thông tin học viên");
    
        const inputName = document.getElementById("name");
        const inputEmail = document.getElementById("email");
        const inputId = document.getElementById("id");
    
        inputId.value = id;
        inputName.value = StudentRef.current[id].getAttribute("data-name");
        inputEmail.value = StudentRef.current[id].getAttribute("data-email");
    
        
      }
    
      const AddOrEditStudent = async (event) => {
        event.preventDefault();
    
        const val = event.target[1].value;
        const val1 = event.target[2].value;
        const id = event.target[0].value;
    
        if(id){
          //Update
          await editStudentAPI({
                id: id,
                name: val,
                email: val1
            });
          modal.style.display = "none";
          fetchData();
        }
        else {
          //New
          await addStudentAPI({
            name: val,
            email: val1
          });
          modal.style.display = "none";
          fetchData();
          
        }
        console.log({id, val,val1})
      }

    return(
        <div className="container mt-5">
        <h1 className="title">Quản lý học viên</h1>
        <div>
          <button className="button button3" onClick={() => OpenModal()}>Thêm mới</button>
        </div>
        <table className="customers">
          <thead>
          <tr>
            <th>STT</th>
            <th>Tên học viên</th>
            <th>Email</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {student.length > 0 ? (
              
              student?.map((item, key) => (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button 
                    className="button button2" onClick={() => editStudent(item.id)}
                    ref={el => StudentRef.current[item.id] = el} data-name={item.name} data-email={item.email}>
                      Sửa
                    </button>
                    <button className="button button1" onClick={() => delStudent(item.id)}>Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan="4">Không có dữ liệu</td>
              </tr>
            )
            }
          {/* <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>
              <button className="button button2">Sửa</button>
              <button className="button button1">Xóa</button>
            </td>
          </tr>
          <tr>
            <td>Berglunds snabbköp</td>
            <td>Christina Berglund</td>
            <td>Sweden</td>
            <td></td>
          </tr> */}
          </tbody>
        </table>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={(e) => CloseModal(e)}>&times;</span>
              <h2>{titletext}</h2>
            </div>
            <div className="modal-body mt-5 mb-5">
              <form onSubmit={AddOrEditStudent} name="FormClasse">
                <label htmlFor="name">Tên học viên</label>
                <input type="text" id="id" name="id" hidden />

                <input type="text" id="name" name="name" className="form-control" placeholder="Tên học viên.." />

                <label htmlFor="description">Email</label>
                <input type="text" id="email" name="email" className="form-control" placeholder="Email.." />

                <div className="modal-group-btn">
                  <button type="submit" className="button-sm btn-submit">Xác nhận</button>
                  <button className="button-sm btn-cancel" onClick={(e) => CloseModal(e)}>Đóng</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    )
}

export default Student;