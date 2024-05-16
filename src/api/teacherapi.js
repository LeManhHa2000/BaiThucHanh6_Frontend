import axiosClient from "./axios";

const END_POINT = {
    TEACHER : "Teacher"
};

export const getTeacherAPI = () => {
    return axiosClient.get(`${END_POINT.TEACHER}`);
}

export const addTeacherAPI = (teacher) => {
    return axiosClient.post(`${END_POINT.TEACHER}`, teacher);
}

export const editTeacherAPI = (teacher) => {
    return axiosClient.put(`${END_POINT.TEACHER}`, teacher);
}

export const delTeacherAPI = (id) => {
    return axiosClient.delete(`${END_POINT.TEACHER}/${id}`);
}