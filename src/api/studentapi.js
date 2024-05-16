import axiosClient from "./axios";

const END_POINT = {
    STUDENT : "Student"
}

export const getStudentAPI = () => {
    return axiosClient.get(`${END_POINT.STUDENT}`);
}

export const addStudentAPI = (student) => {
    return axiosClient.post(`${END_POINT.STUDENT}`, student);
}

export const editStudentAPI = (student) => {
    return axiosClient.put(`${END_POINT.STUDENT}`,student);
}

export const delStudentAPT = (id) => {
    return axiosClient.delete(`${END_POINT.STUDENT}/${id}`);
}