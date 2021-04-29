import styled from "styled-components";
import Doc from "../../assets/icons/file.svg";
import Remove from "../../assets/icons/deleteFile.svg";


export const DragFile = ({ receivedFile, files, removeClicked }) => {
    return (
        <Wrapper>
            <Form>
                <span>Перащите файл или выберите</span>
                <label for="upload-photo">Выбрать файл</label>
                <input type="file" name="photo" id="upload-photo" onChange={({ target }) => receivedFile(target.files[0])} />
            </Form>
            <List>
                {files?.map((e, i) => <File key={i}>
                    <img src={Doc} alt="doc" />
                    {e.name}
                    <img src={Remove} alt="remove" id="remove" onClick={() => removeClicked(i)} />
                </File>)}
            </List>
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

const List = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

const File = styled.div`
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