import React, { useEffect, useState } from "react";
import { uploadFile } from "api";
import { NotificationManager } from "react-notifications";
import { Title } from "components/Title";
import { DragFile } from "components/Inputs/DragFile";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/client";
import { getValueOfProperty } from "utils/functions";

export const BulkUpload = ({ key, query }) => {

    const [loading, setLoading] = useState(false),
          [files, setFiles] = useState([]);

    const [getTemplate, templateRes] = useLazyQuery(query),
          downloadTemplateLink = getValueOfProperty(templateRes?.data, key); 

    useEffect(() => getTemplate(), []);

    const handleFileUpload = () => {
        if(files.length > 0){
            setLoading(true);
            uploadFile("/api-file/documents/", files)
            .then(res => {
                setLoading(false);
                if(res.status === 200){
                    res.data.forEach(d => {
                        NotificationManager.success(d.file_name + " загружен");
                    });
                }
            })
            .catch(err => NotificationManager.error("Ошибка"));
        }else{
            NotificationManager.error("Выберите файлы");
        }
    }

    return (
        <Wrapper>
            <StyledLink href={downloadTemplateLink} onClick={() => false}>скачать шаблон</StyledLink>
            <Title>Загузите файлы</Title>
            <DragFile receivedFile={(file) => setFiles([...files, file])} files={files} removeClicked={(index) => setFiles(files.filter((e, i) => i !== index))} />
            <p>
                <Button onClick={handleFileUpload} disabled={loading}>{loading? <WhiteCircularProgress /> : "загрузить"}</Button>
            </p>
        </Wrapper>
    );

}

export default React.memo(BulkUpload);

const WhiteCircularProgress = styled(CircularProgress)`
   
    &{
        color:#5762B2 !important;
    }

`;

const StyledLink = styled.a`
    padding:20px;
    display:inline-block;
    background-color:#5762B2;
    color:#fff;
    text-decoration:none;
    border-radius:5px;
    cursor:pointer;
`

const Button = styled.button`
    width:100%;
    height:60px;
    border:none;
    outline:none;
    background-color:#08BB19;
    color:#fff;
    font-size:16px;
    border-radius:5px;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;

    &:focus{
        outline:none;
    }

    &:disabled{
        cursor:auto;
        background-color:#F6F6FC;
    }
`;

const Wrapper = styled.div`
    padding:10px;
    background-color:#fff;
    box-sizing:border-box;
    border-radius:5px;
    box-shadow:0 0 5px rgba(0, 0, 0, .2);
`;