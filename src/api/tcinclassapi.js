import axiosClient from "./axios";

const END_POINT = {
    TEACHERINCLASS : "TeacherInClass"
};

export const getTeacherClassAPI = (id) => {
    return axiosClient.get(`${END_POINT.TEACHERINCLASS}/${id}`);
}

export const addTeacherClassAPI = (teacher) => {
    return axiosClient.post(`${END_POINT.TEACHERINCLASS}`, teacher);
}

export const editTeacherClassAPI = (teacher) => {
    return axiosClient.put(`${END_POINT.TEACHERINCLASS}`, teacher);
}

export const delTeacherClassAPI = (id) => {
    return axiosClient.delete(`${END_POINT.TEACHERINCLASS}/${id}`);
}