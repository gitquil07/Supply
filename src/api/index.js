import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://supply-api.artelgroup.org/",
    headers: {
        'Content-Type': 'application/json'
    }
});

export const uploadFile = (path, files) => {
    console.log("files", files);
    const formData = new FormData();

    let i = 1;
    for(let file of files){
        formData.append(`file_${i}`, file);
        i++;
    }

    return axiosInstance.post(path, formData, {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    });
}

export default axiosInstance;