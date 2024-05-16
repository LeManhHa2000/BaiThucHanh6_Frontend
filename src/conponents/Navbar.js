import { Routes, Route } from "react-router-dom";
import "../Css/index1.css";
import Student from "./Student";
import Teacher from "./Teacher";
import Classes from "./Classes";
import DetailClass from "./DetailClass";

const Navbar = () => {

    return (
        <div>
            <ul>
                <li><a href="/" className="nav-link">Quản lý lớp học</a></li>
                <li><a href="/student" className="nav-link">Quản lý học viên</a></li>
                <li><a href="/teacher" className="nav-link">Quản lý giảng viên</a></li>
                <li><a href="#about">About</a></li>
            </ul>
            <Routes>
                <Route path="/" element={<Classes />}></Route>
                <Route path=":classid" element={<DetailClass />}></Route>
                <Route path="/student" element={<Student />}></Route>
                <Route path="/teacher" element={<Teacher />}></Route>
            </Routes>
        </div>
       

        
    )
}

export default Navbar;