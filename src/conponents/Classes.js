import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addClassAPI, delClassAPI,editClassAPI, getClassesAPI} from "../api/classesapi";
import "../Css/index1.css";

const Classes = () => {

var modal = document.getElementById("myModal");

const OpenModal = () => {
  // When the user clicks the button, open the modal 
  modal.style.display = "block";

  const inputName = document.getElementById("name");
  const inputDescription = document.getElementById("description");
  const inputId = document.getElementById("id");

  inputName.value = "";
  inputDescription.value = "";
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

  
  const [classes, setclass] = useState([]);
  const [titletext, settext] = useState("Thêm mới lớp học");
  const ClassesRef = useRef([]);

  useEffect(() => {
    fetchData();
  },[]);

  
  const fetchData = async () => {
    setclass(await getClassesAPI());
  }

  const delClasses = async (id) => {
    if(window.confirm("Bạn có chắc là xóa không ?")){
      await delClassAPI(id);
      window.location.reload();
    }
  }

  const editClasses = (id) => {
    modal.style.display = "block";
    settext("Chỉnh sửa lớp học");

    const inputName = document.getElementById("name");
    const inputDescription = document.getElementById("description");
    const inputId = document.getElementById("id");

    inputId.value = id;
    inputName.value = ClassesRef.current[id].getAttribute("data-name");
    inputDescription.value = ClassesRef.current[id].getAttribute("data-des");

    
  }

  const AddOrEditClasses = async (event) => {
    event.preventDefault();

    const val = event.target[1].value;
    const val1 = event.target[2].value;
    const id = event.target[0].value;

    if(id){
      //Update
      await editClassAPI({
        id: id,
        name: val,
        description: val1
      });
      modal.style.display = "none";
      fetchData();
    }
    else {
      //New
      await addClassAPI({
        name: val,
        description: val1
      });
      modal.style.display = "none";
      fetchData();
      
    }
    console.log({id, val,val1})
  }

 
    return (
      <div className="container mt-5">
        <h1 className="title">Quản lý lớp học</h1>
        <div>
          <button className="button button3" onClick={() => OpenModal()}>Thêm mới</button>
        </div>
        <table className="customers">
          <thead>
          <tr>
            <th>STT</th>
            <th>Tên lớp</th>
            <th>Mô tả</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {classes.length > 0 ?(
              
              classes?.map((item, key) => (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className="text-center">
                    <button 
                    className="button button2" onClick={() => editClasses(item.id)}
                    ref={el => ClassesRef.current[item.id] = el} data-name={item.name} data-des={item.description}>
                      Sửa
                    </button>
                    <button className="button button1" onClick={() => delClasses(item.id)}>Xóa</button>
                    <Link className="button button4" to={`/${item.id}`}>
                    Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Không có dữ liệu</td>
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
              <form onSubmit={AddOrEditClasses} name="FormClasse">
                <label htmlFor="name">Tên lớp</label>
                <input type="text" id="id" name="id" hidden />

                <input type="text" id="name" name="name" className="form-control" placeholder="Tên lớp.." />

                <label htmlFor="description">Mô tả</label>
                <input type="text" id="description" name="description" className="form-control" placeholder="Mô tả.." />

                <div className="modal-group-btn">
                  <button type="submit" className="button-sm btn-submit">Xác nhận</button>
                  <button className="button-sm btn-cancel" onClick={(e) => CloseModal(e)}>Đóng</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
  
  export default Classes;