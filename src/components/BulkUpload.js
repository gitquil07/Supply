import React, { useEffect, useState } from "react";
import { uploadFile } from "api";
import { NotificationManager } from "react-notifications";
import { Title } from "components/Title";
import { DragFile } from "components/Inputs/DragFile";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { gql, useLazyQuery } from "@apollo/client";
import { getValueOfProperty } from "utils/functions";
import { Button as CutomButton } from "components/Buttons"
import MenuItem from "@material-ui/core/MenuItem";
import { CustomSelector } from "components/Inputs/CustomSelector";
import { CustomizableInputs } from "components/ComponentsForForm/CustomizableInputs"
import { getList } from "utils/functions";
import { useCustomMutation, useFormData } from "hooks";


const GET_FACTORIES_LIST = gql`
query getFactories {
    factory {
      factories {
        edges {
          node {
            pk
            name
          }
        }
      }
    }
  }
`;

const initialState = {
    factory: "",
    file: ""
}

export const BulkUpload = ({ mutation, message, query, keyName, withoutSelection }) => {

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState({
        fetched: [],
        uploaded: []
    });

    const [getTemplate, templateRes] = useLazyQuery(query),
          [getFactories, factoriesRes] = useLazyQuery(GET_FACTORIES_LIST);

    const factories = getList(factoriesRes?.data) || [],
          downloadTemplateLink = getValueOfProperty(templateRes?.data, keyName); 


    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);


    const {
        submitData
    } = useCustomMutation({
        graphQlQuery: {
            queryCreate: mutation,
            queryUpdate: mutation
        }
    },
    message,
    () => {}
    )


    useEffect(() => {
        console.log("state", state);
    }, [state]);

    useEffect(() => {
        getFactories();
        getTemplate();
    }, []);

    // const handleFileUpload = () => {
    //     if(files.length > 0){
    //         setLoading(true);
    //         uploadFile("/api-file/documents/", files)
    //         .then(res => {
    //             setLoading(false);
    //             if(res.status === 200){
    //                 res.data.forEach(d => {
    //                     NotificationManager.success(d.file_name + " загружен");
    //                 });

    //                 if(withoutSelection){
    //                     submitData({
    //                         file: res.data[0].id
    //                     })
    //                 }else{
    //                     setState({
    //                         ...state,
    //                         file: res.data[0].id
    //                     });
    //                 }
    //             }
    //         })
    //         .catch(err => NotificationManager.error("Ошибка"));
    //     }else{
    //         NotificationManager.error("Выберите файлы");
    //     }
    // }


    const handleCreate = () => {

        console.log("files", files);

        // console.log("sad", {
        //     ...state,
        //     file: files.uploaded[0].file_id
        // });

        if(state.factory !== ""){
            submitData({
                ...state,
                file: files.uploaded[0].file_id
            });
        }else{
            // console.log("here");
            submitData({
                file: files.uploaded[0].file_id
            });
        }


    }

    
    const sendFileToServer = (file) => {
        setLoading(true);

        
        uploadFile('/api-file/documents/', file).then(res => {
            console.log("sadasd");
            setLoading(false);
            setFiles({ ...files, uploaded: [...files.uploaded, { file_id: res.data[0].id, file_name: file.name }] })
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        console.log("loading", loading);
    }, [loading]);

    useEffect(() => {
        console.log("state", state);
    }, [state]);

    return (
        <Wrapper>
                {
                    !withoutSelection && <form>
                                            <CustomizableInput t="2fr 1fr">
                                                    <CustomSelector name="factory" value={state.factory} label="Выберите завод" stateChange={e => handleChange({fElem: e})} required>
                                                        {
                                                            factories.map(({node}) => 
                                                                <MenuItem key={node.pk} value={node.pk}>{node.name}</MenuItem>
                                                            )
                                                        }   
                                                    </CustomSelector>
                                                    {/* <CutomButton name="сохранить" color="" clickHandler={handleCreate} /> */}
                                            </CustomizableInput>
                                        </form> 
                }
            <StyledLink href={downloadTemplateLink} download >скачать шаблон</StyledLink>
            <Title>Загузите файлы</Title>
            <DragFile 
                loading={loading}
                receivedFile={(file) => sendFileToServer(file)} 
                uploadedFiles={files.uploaded} 
                removeClicked={(id) => setFiles({ ...files, uploaded: files.uploaded.filter((e) => e.file_id !== id) })}
             />
            <p>
                <Button onClick={handleCreate}>{"сохранить"}</Button>
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

const CustomizableInput = styled(CustomizableInputs)`
    width:500px;
    margin:20px 0;
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