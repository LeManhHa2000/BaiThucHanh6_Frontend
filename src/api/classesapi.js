import axiosClient from "./axios";

const END_POINT = {
    CLASSES: "Classes",

}

export const getClassesAPI = () => {
    return axiosClient.get(`${END_POINT.CLASSES}`);
}

export const getClassByIdAPI = (id) => {
    return axiosClient.get(`${END_POINT.CLASSES}/${id}`);
}

export const delClassAPI = (id) => {
    return axiosClient.delete(`${END_POINT.CLASSES}/${id}`);
}

export const addClassAPI = (classes) => {
    return axiosClient.post(`${END_POINT.CLASSES}`, classes);
}

export const editClassAPI = (classes) => {
    return axiosClient.put(`${END_POINT.CLASSES}`, classes);
}