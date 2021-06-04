import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://10.35.84.119:10000/",
    headers: {
        'Content-Type': 'application/json'
    }
});

export const uploadFile = (path, file) => {
    const formData = new FormData();

    formData.append("files", file, file.name);


    return axiosInstance.post(path, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default axiosInstance;