import React from "react";
import styled, { css } from "styled-components";
import { Row } from "components/Row";

class ErrorBoundary extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            hasError: false,
            error: null,
            errorInfo: null
        }

    }

    toggle(){
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen
            }
        })
    }


    componentDidCatch(error, errorInfo){
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }

    refresh(){
        window.location.reload();
    }

    render(){
        
        
        const { hasError, error, errorInfo, isOpen } = this.state,
              { children: renderedComponent } = this.props;
        
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        const isChunkFailedMessage = chunkFailedMessage.test(error?.message);

        const stackTrace = errorInfo?.componentStack.toString().split(" at ");

        if(hasError){
            return (
                <div>
                    {
                        isChunkFailedMessage?
                        <Notification>
                            Плохое соедиение с интернетом
                            <p>
                                <RefershBtn onClick={this.refresh.bind(this)}>попробовать обновить страницу</RefershBtn> 
                            </p> 
                        </Notification>
                        :
                        <>
                            <h1>Something went wrong</h1>
                            {error.toString()}
                            <More 
                                { ...{ isOpen } }
                            onClick={() => this.toggle()}>Подробнее</More>
                            {
                                isOpen && <>
                                    <p>
                                        <b>{error.toString()}</b>
                                    </p>
                                    <b>Stack trace: </b><br />
                                    {
                                        stackTrace && stackTrace.map(msg => {
                                            return (
                                                <Row>
                                                    <b>{msg.slice(0, msg.indexOf(" "))}</b>
                                                    {msg.slice(msg.indexOf(" "))}
                                                </Row>
                                            )
                                        })
                                    }
                                </>
                            }
        
                        </>
                    }
                    
                </div>
            ) 
        }else{
            return renderedComponent;
        }

    }

}

export const AttachBoundary = (Component) => {
    return function(props){
        return <ErrorBoundary>
                    <Component {...props} />
                </ErrorBoundary>
    }
}


export default ErrorBoundary;

const More = styled.b`
    padding-left:15px;
    position:relative;
    cursor:pointer;

    &::before{
        content:"";
        width:0;
        height:0;
        position:absolute;
        top:50%;
        left:0;
        transform: translateY(-50%);
        ${({isOpen}) => 
            isOpen?
                css`
                    border-left:5px solid transparent;
                    border-right:5px solid transparent;
                    border-bottom:10px solid black;
                `
                :
                css`
                    border-left:5px solid transparent;
                    border-right:5px solid transparent;
                    border-top:10px solid black;
                `

        } 
    }
`;

const RefershBtn = styled.button`
    cursor: pointer;
    font-size:20px;
`;

const Notification = styled.p`
    font-size:30px;
    text-align:center;
`;

