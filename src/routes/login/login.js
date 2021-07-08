import styled from "styled-components";
import { CustomInput } from "components/Inputs/CustomInput";
import { useFormData } from "hooks";
import { useMutation } from "@apollo/client";
import { TOKEN_AUTH } from "./gql";
import { onResponseComplete } from "utils/functions";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import LoginPageBg from "assets/loginPage-bg.jpg";
import { getValueOfProperty } from "utils/functions";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import { id } from "date-fns/locale";


const Login = () => {

    const {
        state,
        handleChange
    } = useFormData({
        username: "",
        password: ""
    });

    const history = useHistory(); 
    const {setRole} = useContext(UserContext);

    const [ auth ] = useMutation(TOKEN_AUTH, {
        onCompleted: data => {
            if(data.account.tokenAuth.ok){
                const role = data.account.tokenAuth.query.account.users.edges[0].node.role.name;
                localStorage.setItem("supply_role", role);
                onResponseComplete(data, "auth", "", () => {
                    const token = getValueOfProperty(data, "token");
                    localStorage.setItem("supply_token", token);
                    history.push("/");
                })
                setRole(role);

            }
        },
        onError: error => {
            NotificationManager.error(error.message)
        }
    });

    const logIn = e => {
        e.preventDefault();
        auth({
            variables: {
                username: state.username,
                input: state
            }
        })
    }

    return (
        <>
            <Wrapper>
                <FormWrap>
                    <h1>Вход</h1>
                    <form onSubmit={logIn}>
                        <CustomInput label="Username" name="username" value={state.username} stateChange={e => handleChange({fElem: e})} required />
                        <CustomInput type="password" label="Пароль" name="password" value={state.password} stateChange={e => handleChange({fElem: e})} required />
                        <SubmitButton onClick={logIn} type="submit">войти</SubmitButton>
                    </form>
                </FormWrap>
            </Wrapper>
        </>
    );

}

const Wrapper = styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;

    background-color:#2D2B55;
    background-image:url(${LoginPageBg});
    background-size:cover;
    background-blend-mode:lighten;

    @media(max-width:461px){
        background:none;
    }
`;

const FormWrap = styled.div`
    padding:40px 20px;
    width:100%;
    min-width:300px;
    max-width:500px;
    border:1px solid rgba(0, 0, 0, .1);
    border-radius:5px;
    background-color:#fff;

    h1{
        margin-top:0;
    }

    form{
        display:flex;
        flex-direction:column;
        gap:20px;
    }

    @media(max-width:461px){
        border:none;
        min-width:250px;

        input{
            width:100%;
        }
    }
`;

const SubmitButton = styled.button`
    width:100%;
    height:56px;
    border:none;
    outline:none;
    background-color:#5762b2;
    color:#fff;
    border-radius:3px;
    font-size:20px;
    cursor:pointer;

    &:focus{
        outline:none
    }
`;

export default Login;