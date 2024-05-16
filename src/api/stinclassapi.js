import axiosClient from "./axios";

const END_POINT = {
    STUDENTINCLASS : "StudentInClass"
};

export const getStudentClassAPI = (id) => {
    return axiosClient.get(`${END_POINT.STUDENTINCLASS}/${id}`);
}

export const addStudentClassAPI = (student) => {
    return axiosClient.post(`${END_POINT.STUDENTINCLASS}`, student);
}

export const editStudentClassAPI = (student) => {
    return axiosClient.put(`${END_POINT.STUDENTINCLASS}`, student);
}

export const delStudentClassAPI = (id) => {
    return axiosClient.delete(`${END_POINT.STUDENTINCLASS}/${id}`);
}