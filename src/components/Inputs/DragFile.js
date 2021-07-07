import styled from "styled-components";
import Doc from "../../assets/icons/file.svg";
import Remove from "../../assets/icons/deleteFile.svg";
import { Loading } from "../LoadingIndicator";

export const DragFile = ({ receivedFile, fetchedFiles, uploadedFiles, removeClicked, loading }) => {
    return (
        <Wrapper>
            <Form>
                <span>Перащите файл или выберите</span>
                <label for="upload-photo">Выбрать файл</label>
                <input type="file" name="photo" id="upload-photo" onChange={({ target }) => receivedFile(target.files[0])} accept="application/*" />
            </Form>
            <FilesList>
                {fetchedFiles?.map((e, i) =>
                    <FileElementA download style={{cursor: "pointer"}} key={i} href={e.fileUrl}>
                        <img src={Doc} alt="doc" />
                        {e.file && e.file.split("/")[1]}
                    </FileElementA>)}

                {uploadedFiles?.map((e, i) => <FileElement key={i}>
                    <img src={Doc} alt="doc" />
                    {e.file_name}
                    <img src={Remove} alt="remove" id="remove" onClick={() => removeClicked(e.file_id)} />
                </FileElement>
                )}

                {loading ?
                    <FileElement>
                        <Loading fs="13">
                            Загрузка
                        </Loading>
                    </FileElement>
                    :
                    ""
                }
            </FilesList>
        </Wrapper>
    )
}

const Wrapper = styled.div``;

const Form = styled.form`
    width: 100%;
    height: 150px;
    background: #F6F6FC;
    border: 1px dashed #5762B2;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F6F6FC;
    position: relative;

    span {
        font-size: 18px;
        color: rgba(0, 0, 0, 0.5);
        margin-right: 10px;
    }

    label {
        background: #5762B2;
        color: white;
        height: 50px;
        padding: 0 10px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer; 
        display: flex;
        text-decoration: none;
        justify-content: center;
        align-items: center;
    }

    input {
        opacity: 0; 
        position: absolute; 
        width: 100%;
        height: 100%;
    }
`;

export const FilesList = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

export const FileElement = styled.div`
    background: #5762B3;
    border-radius: 30px;
    padding: 5px 10px;
    color: white;
    font-size: 15px;
    display: flex;
    align-items: center;

    img {
        margin: 0 5px;
    }

    #remove {
        cursor: pointer;
    }
`;


export const FileElementA = styled.a`
    background: #5762B3;
    border-radius: 30px;
    padding: 5px 10px;
    color: white;
    font-size: 15px;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;

    img {
        margin: 0 5px;
    }

    #remove {
        cursor: pointer;
    }
`;


// const Loading = styled.div`
//     padding: 0 13px 0 10px;

//     :after {
//         content: '.';
//         animation: dots 1s steps(5, end) infinite;
//     }

//     @keyframes dots {
//         20% {
//             color: rgba(0,0,0,0);
//             text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
//         40% {
//             color: white;
//             text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
//         60% {
//             text-shadow: .25em 0 0 white, .5em 0 0 rgba(0,0,0,0);}
//         100% {
//             text-shadow: .25em 0 0 white, .5em 0 0 white;}
//         }
// `;