import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useToggleDialog } from "../../../hooks";

import styled, { css } from "styled-components";

import { useTitle } from "hooks";
import { Form } from "components/Form";
import { Button } from "components/Buttons";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber";
import { CustomSelector } from "components/Inputs/CustomSelector";
import SmallDialog from "components/SmallDialog";

import { FlexForHeader } from "components/Flex";
import { TableIII } from "components/Table";
import { Footer } from "components/Footer";
import { Arrows } from "components/Arrows";
import { RemoveIcon } from "components/RemoveIcon";
import { DisabledInput } from "components/DisabledInput";
import CustomPicker from "components/Inputs/DatePicker";
import { GrayishBackground, MiniForm } from "components/ComponentsForForm/MiniForm";
import { InputsWrapper } from "components/ComponentsForForm/InputsWrapper";
import { Title } from "components/Title";
import { CustomizableInputs } from "components/ComponentsForForm/CustomizableInputs";
import { GET_TRACKING, GET_APPLICATION_ITEMS_GROUPED_BY_ORDERS, GET_VENDORS, GET_INVOICES, INVOICE_UPDATE } from "./gql";
import { useLazyQuery } from "@apollo/client";
import { recursiveFetch, exceptKey } from "utils/functions";
import { currencyOptions, trackingStatuses, Валю } from "utils/static";
import { useFormData, useCustomMutation } from "hooks";
import { useHistory } from "react-router-dom";
import { UPDATE_TRACKING } from "./gql"
import { invoiceStatuses, destinationOptions } from "utils/static";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { NotificationManager } from "react-notifications";


const initialState = {
    vendor: "",
    transportNumber: "",
    currency: "",
    netto: "",
    brutto: "",
    amount: ""
};

const TrackingTransportCreate = ({ match }) => {
    console.log("tracking transport rendered");

    const { id } = match.params;
    const title = useTitle("Изменение Слежения");
    const [additionalData, setAdditionalData] = useState({
        status:"",
        trDate:new Date(),
        locations:""
    });
    const [applications, setApplications] = useState([
        {
            expand: true
        },
        {
            expand: true
        },
        
    ]);

    const history = useHistory();

    const { 
        state,
        setState,
        handleChange
    } = useFormData(initialState);
    // const [state, setState] = useState();

    const {
        submitData
    } = useCustomMutation({
            graphQlQuery: {
                queryCreate: UPDATE_TRACKING,
                queryUpdate: UPDATE_TRACKING
            }
        },
        "Слежение",
        () => {
            history.push("/tracking/transport");
        }
    );

    const {
        submitData: submitAdditionalData
    } = useCustomMutation({
            graphQlQuery: {
                queryCreate: UPDATE_TRACKING,
                queryUpdate: UPDATE_TRACKING
            }
        },
        "Данные",
        () => {}
    );

    const {
        submitData: submitInvoiceUpdate
    } = useCustomMutation({
            graphQlQuery: {
                queryCreate: INVOICE_UPDATE,
                queryUpdate: INVOICE_UPDATE
            }
        },
        "Инвойс",
        () => {}
    )


    
    const [getTrackingInfo, trackingInfoRes] = useLazyQuery(GET_TRACKING, {
        fetchPolicy: "network-only"
    }),
          [getVendors, vendorsRes] = useLazyQuery(GET_VENDORS),
          [getApplicationItemsGroupedByOrder, applicationItemsGroupedByOrderRes] = useLazyQuery(GET_APPLICATION_ITEMS_GROUPED_BY_ORDERS),
          [getInvoices, invoicesRes] = useLazyQuery(GET_INVOICES),


          vendors = vendorsRes?.data?.vendor?.vendors.edges || [],
          trackingInfo = trackingInfoRes?.data? exceptKey(trackingInfoRes?.data?.tracking.tracking, ["application", "__typename", "locations"]) : null,
          locations = trackingInfoRes?.data?.tracking.tracking.locations.edges.map(({node}) => {
            const obj = exceptKey(node, ["__typename"]);
            obj.status = trackingStatuses.find(trackStatus => trackingInfoRes?.data?.tracking.tracking.status == trackStatus.value).label;
            return obj;
          }) || [],
          applicationInfo = trackingInfoRes?.data?.tracking?.tracking?.application,
          pk = trackingInfoRes?.data?.tracking?.tracking?.pk,
          applicationItems = applicationItemsGroupedByOrderRes?.data?.application?.application?.orders?.edges?.map(({node}) => {
              return {
                  orderPublicId: node?.publicId,
                  applicationItems: node?.orderItems?.edges?.map(({node}) => {
                      return node?.applicationItems?.edges?.map(({node}) => {
                          return node;
                      })
                  })
              }
          });

    
    const [updateTracking] = useMutation(UPDATE_TRACKING, {
        onCompleted: () => {
            getTrackingInfo({
                variables: {
                    id
                }
            });
            NotificationManager.success("Статуc слежения изменен")
        },
        onError: (error) => NotificationManager.error(error.message) 
    });

    useEffect(() => {
        getVendors();
    }, []);

    useEffect(() => {
        if(id !== undefined){
            getTrackingInfo({
                variables: {
                    id
                }
            });
        }
    }, [id]);

    useEffect(() => {
        const id = trackingInfoRes?.data?.tracking?.tracking?.application.id;
        if(id !== undefined){
            getApplicationItemsGroupedByOrder({
                variables:{
                    id
                }
            });
            getInvoices({
                variables: {
                    id
                }
            });
            setState({
                ...trackingInfo,
                vendor: trackingInfo?.vendor?.pk
            });
            setAdditionalData({
                ...additionalData,
                status: trackingInfo.status,
                trDate: trackingInfo.trDate,
            })
        }
    }, [trackingInfoRes?.data]);

    useEffect(() => {
        console.log("state", state);
    }, [state]);

    useEffect(() => {
        console.log("additionalData", additionalData); 
    }, [additionalData]);

    const handleAdditionalDataSubmit = (additional) => {

        if(additional){
            const requestBody = {
                        ...exceptKey(state, ["pk", "publicId"]),
                        status: trackingStatuses.find(status => status.value === additionalData.status).label, 
                        trDate: moment(additionalData.trDate).format("YYYY-MM-DD"),
                        locations: [{
                            name: additionalData.locations
                        }]
                    };
                    // submitAdditionalData(requestBody, pk);
                    // console.log("sad", requestBody);
                    // console.log("pk", pk);
                    updateTracking({
                        variables: {
                            input: {
                                data: requestBody,
                                pk
                            }
                        }
                    });

        }else{
            console.log("requestBody", state);


            const invoicesToUpdate = invoiceList.map(invoice => {
                return {
                    ...exceptKey(invoice, ["pk"]),
                    status: invoiceStatuses.find(invoiceStatus => invoiceStatus.value == invoice.status).label
                }
            });

            
            const invoicesPk = invoiceList.map(invoice => invoice.pk);
            
            const recursiveMutation = recursiveFetch(invoicesToUpdate.length, (turn) => {
                submitInvoiceUpdate(invoicesToUpdate[turn], invoicesPk[turn])   
            });

            recursiveMutation();
            
            console.log("state", exceptKey(state, ["pk", "publicId"]));

            submitData({
                ...exceptKey(state, ["pk", "publicId", "status"])
            }, pk);
            // getTrackingInfo({
            //     variables: {
            //         id
            //     }
            // });
        }
    }


    const [invoiceList, setInvoiceList] = useState([]);

    useEffect(() => {
        const list = invoicesRes?.data?.application?.application?.invoices.edges || [];
        console.log("list", list);
        if(list.length > 0){
            const obj = list.map(({node}) => {
                return {
                    ...exceptKey(node, ["__typename"]),
                }
            }) 

            setInvoiceList(obj);
        }
    }, [invoicesRes?.data?.application?.application?.invoices?.edges.length]);

    useEffect(() => {
        console.log("invoice list", invoiceList);
    }, [invoiceList]);

    const handleInvoiceFieldsChange = (e, idx) => {
        const tmp = invoiceList.slice(0);
        tmp[idx][e.target.name] = e.target.value;
        setInvoiceList(tmp);
    }

    const expand = (index) => {
        const oldState = [...applications];

        oldState[index].expand = !oldState[index].expand;

        setApplications([...oldState]);
    };

    const [requestDialogState, closeRequestDialog, openRequestDialog] = useToggleDialog();
    const [materialsDialogState, closeMaterialDialog, openMaterialDialog] = useToggleDialog();


    return (
        <>
            <Helmet title={title} />

            <Form>
                <MiniForm>
                    <Title>Данные транспорта</Title>
                    <CustomizableInputs t="2fr 2fr 2fr 2fr 1fr 1fr 1fr">
                        <CustomSelector label="Транспортировщики" value={state?.vendor} name="vendor" stateChange={e => handleChange({fElem: e})}>
                            {
                                vendors.map(({node}) => 
                                    <MenuItem key={node.pk} value={node.pk} selected={node.pk === state.vendor}>{node.name}</MenuItem>    
                                )
                            }
                        </CustomSelector>
                        <CustomNumber name="transportNumber" label="Номер транспорта" value={state?.transportNumber}  stateChange={e => handleChange({fElem: e})} />
                        <CustomNumber name="amount" label="Сумма" value={state?.amount}  stateChange={e => handleChange({fElem: e})} />
                        <CustomSelector name="currency" label="Валюта" value={state?.currency}  stateChange={e => handleChange({fElem: e})}>
                            {
                                currencyOptions.map(currency => 
                                    <MenuItem key={currency.value} value={currency.value} selected={state.currency == currency.value}>{currency.label}</MenuItem>
                                )
                            }
                        </CustomSelector>
                        <CustomNumber name="netto" label="Нетто" value={state?.netto}  stateChange={e => handleChange({fElem: e})} />
                        <CustomNumber name="brutto" label="Бруто" value={state?.brutto}  stateChange={e => handleChange({fElem: e})} />
                    </CustomizableInputs>
                </MiniForm>

                <MiniForm>
                    {
                        invoiceList.length? <>
                            <Title size="18">Инвойсы</Title>
                            {
                                invoiceList.map((invoice, idx) => 
                                    <CustomizableInputs t="1fr 1fr 1fr">
                                        <CustomInput label="Инвойс" value={invoice.number} stateChange={e => handleInvoiceFieldsChange(e, idx)} />
                                        <CustomSelector name="status" label="Статус" stateChange={e => handleInvoiceFieldsChange(e, idx)} value={invoice.status}>
                                            {
                                                invoiceStatuses.map(invoiceStatus => 
                                                    <MenuItem key={invoiceStatus.value} value={invoiceStatus.value} selected={invoice.status == invoiceStatus.value}>{invoiceStatus.label}</MenuItem>    
                                                )
                                            }
                                        </CustomSelector>
                                        <CustomSelector name="destination" label="место оплаты" stateChaneg={e => handleInvoiceFieldsChange(e, idx)} value={invoice.destination}>
                                            {
                                                destinationOptions.map(destination => 
                                                    <MenuItem key={destination.value} value={destination.value} selected={destination.value == invoice.destination} >{destination.label}</MenuItem>
                                                )
                                            }
                                        </CustomSelector>
                                        {/* <CustomInput name="destination" label="место назначения" stateChange={e => handleInvoiceFieldsChange(e, idx)} value={invoice.destination} /> */}
                                    </CustomizableInputs>
        
                                )
                            }
                        </> : null
                    }

                    {/* <CustomizableInputs t="1fr 1fr 2fr">
                        <CustomInput label="01290949889612389" />
                        <CustomInput label="Вид оплаты" />
                    </CustomizableInputs>

                    <CustomizableInputs t="1fr 1fr 2fr">
                        <CustomInput label="01290949889612389" />
                        <CustomInput label="Вид оплаты" />
                    </CustomizableInputs> */}

                    <Title size="18">Статус слежения: <span>{trackingInfo?.publicId}</span></Title>

                    <CustomizableInputs t="1fr 1fr 1fr 1fr">
                        <CustomSelector name="status" value={additionalData.status} stateChange={e => setAdditionalData({...additionalData, status: e.target.value})}  label="Статус">
                            {
                                trackingStatuses.map(status => 
                                    <MenuItem key={status.value} value={status.value} selected={status.value == additionalData.status}>{status.label}</MenuItem>    
                                )
                            }
                        </CustomSelector>
                        <CustomPicker date={additionalData.trDate} name="trDate" stateChange={date => setAdditionalData({...additionalData, trDate: date})} label="Дата" />
                        <CustomInput value={additionalData.location} name="location" stateChange={e => setAdditionalData({...additionalData, locations: e.target.value})} label="Местонахождение" />
                        <Button value={additionalData.status} name="Добавить местонахождение" color="#5762B2" clickHandler={() => handleAdditionalDataSubmit(true)} />
                    </CustomizableInputs>

                    {
                        locations.length? <Container>
                            {
                                locations.map(location => 
                                    <ContainerRow>
                                        <ContainerColumn>
                                            <b>Статус:</b>
                                            <span>{location.status}</span>
                                        </ContainerColumn>
                                        <ContainerColumn>
                                            <b>Дата:</b>
                                            <span>{moment(location.createdAt).format("YYYY-MM-DD")}</span>
                                        </ContainerColumn>
                                        <ContainerColumn>
                                            <b>Местонахождение:</b>
                                            <span>{location.name}</span>
                                        </ContainerColumn>
                                    </ContainerRow>
                                )
                            }

                        </Container> : null
                    }

                </MiniForm>
                <MiniForm>
                    {/* <Title size="18">Данные транспорта</Title>

                    <List>
                        <Item>
                            <h4>Транспортировщик</h4>
                            <span>
                                {
                                    trackingInfo?.vendor?.name || vendors.find(({node}) => node.pk == state.vendor)?.node?.name
                                }
                            </span>
                        </Item>
                        <Item>
                            <h4>Номер транспорта</h4>
                            <span>
                                {
                                    trackingInfo?.transportNumber || state.transportNumber
                                }
                            </span>
                        </Item>
                        <Item>
                            <h4>Сумма</h4>
                            <span>
                                {
                                    trackingInfo?.amount || state.amount
                                }
                            </span>
                        </Item>
                        <Item>
                            <h4>Нетто вес</h4>
                            <span>
                                {
                                    trackingInfo?.netto || state.netto
                                }
                            </span>
                        </Item>
                        <Item>
                            <h4>Брутто вес</h4>
                            <span>
                                {
                                    trackingInfo?.brutto || state.brutto
                                }
                            </span>
                        </Item>
                        <Item>
                            <h4>Примечание</h4>
                            <span>
                                {
                                    trackingInfo?.note || state.note
                                }
                            </span>
                        </Item>
                    </List> */}
                    
                    <Title size="18">Информация заявки</Title>

                    <List>
                        <Item>
                            <h4>Тип транспорта</h4>
                            <span>{ applicationInfo?.transportType?.name }</span>
                        </Item>
                        <Item>
                            <h4>Тип заявки</h4>
                            <span>{ applicationInfo?.transportMix ? "Сборная" : "Обычная" }</span>
                        </Item>
                        <Item>
                            <h4>
                                Вид упаковки
                            </h4>
                            <span>
                                { applicationInfo?.typeOfPackaging }
                            </span>
                        </Item>
                        <Item>
                            <h4>
                                Степень опасности
                            </h4>
                            <span>
                                { applicationInfo?.degreeOfDanger }
                            </span>
                        </Item>
                        <Item>
                            <h4>
                                Количество упаковки
                            </h4>
                            <span>
                                { applicationInfo?.count }
                            </span>
                        </Item>
                    </List>

                <Title size="18">Материалы</Title>
                

                {
                    applicationItems?.map(item => {
                    return <List direction="column">
                        Номер заказа {item?.orderPublicId}
                        {
                            item.applicationItems.map(applicationItem => { 
                                if(applicationItem.length > 0){
                                    return <List>
                                        <Item>
                                            <h4>
                                                Название материала
                                            </h4>
                                            <span>
                                                {applicationItem[0]?.orderItem?.vendorProduct?.product?.name}
                                            </span>
                                        </Item>
                                        <Item>
                                            <h4>
                                                OOO “trade solution”
                                            </h4>
                                            <span>
                                                {applicationItem[0]?.firm?.name}
                                            </span>
                                        </Item>
                                        <Item>
                                            <h4>
                                                Брутто вес
                                            </h4>
                                            <span>
                                                {applicationItem[0]?.weight}
                                            </span>
                                        </Item>
                                        <Item>
                                            <h4>
                                                Обем
                                            </h4>
                                            <span>
                                                {applicationItem[0]?.size}
                                            </span>
                                        </Item>
                                        <Item>
                                            <h4>
                                                Отгружаемое кол-во
                                            </h4>
                                            <span>
                                                {applicationItem[0]?.count}
                                            </span>
                                        </Item>
                                    </List>  
                                }
                            })
                        }
                    </List>
                    })
                }
                </MiniForm>

                {/* 
                {
                    applications.map((e, i) =>
                        <Applications expand={e.expand}>
                            <FlexForHeader p="0 0 30px 0">
                                <Title>Статус слежения: <span>873264923</span></Title>
                                <Expand onClick={() => expand(i)}><Arrows open={e.expand} /> Свернуть</Expand>
                            </FlexForHeader>

                            <Inputs>
                                <CustomSelector label="Статус" />
                                <CustomPicker label="Дата" />
                                <CustomInput label="Местонахождение" />
                                <Button name="Добавить статус" color="#5762B2" />
                            </Inputs>

                            // <TableIII />,

                            <Material>
                                <FlexForHeader m="20px 0">
                                    <Title>Материалы</Title>
                                    <Button name="Добавить материал" color="#5762B2" />
                                </FlexForHeader>

                                <InputRow>
                                    <DisabledInput name="Название материала" value="01290949889612389" />
                                    <DisabledInput name="OOO “trade solution”" value="100 000 000" />
                                    <DisabledInput name="Брутто вес" value="320 000 кг" />
                                    <DisabledInput name="Обем" value="21 м3" />
                                    <CustomInput label="Отгружаемое кол-во" />

                                    <RemoveIcon />
                                </InputRow>
                            </Material>

                            <Footer>
                                <span>Кол-во материалов: 6</span>
                                <Button name="Создать Слежение" />
                            </Footer>
                        </Applications>
                    )
                } */}


            </Form>

            <Footer justify="flex-end">
                <Button name="сохранить" clickHandler={() => handleAdditionalDataSubmit()} />
            </Footer>

            <SmallDialog title="Добавить заявку" close={closeRequestDialog} isOpen={requestDialogState}>
                <CustomSelector fullWidth label="Название материала" />
            </SmallDialog>

            <SmallDialog title="Добавить материал" close={closeMaterialDialog} isOpen={materialsDialogState}>
                <CustomSelector fullWidth label="Номер заявки" />
                <CustomInput label="Отгружаемое кол-во" fullWidth />
                <CustomInput label="Брутто вес" fullWidth />
                <CustomInput label="Обем" fullWidth />
            </SmallDialog>
        </>
    );
}

export default TrackingTransportCreate;

const Container= styled.div`
    padding:10px;
    background-color:#fff;
    border-radius:5px;
    border:1px solid rgba(0, 0, 0, 0.1);
    display:flex;
    flex-direction:column;

    &>div:first-child{
        padding-top:0;
    }

    &>div:last-child{
        border-bottom:0;
        padding-bottom:0;
    }
`;

const ContainerRow = styled.div`
    padding:10px 0;
    border-bottom:1px solid rgba(0, 0, 0, 0.1);
    display:grid;
    grid-template-columns:0.9fr 0.9fr 2fr;
`;

const ContainerColumn = styled.div`
    font-size:18px;
    
    b{
        margin-right:10px;
        font-weight:normal;
    }

    span{
        color:rgba(0, 0, 0, 0.5);
    }
`;

// const CardContainer = styled.div`   
//     display:flex;
//     column-gap:10px;
// `;

// const CardElem = styled.div`
//     display:flex;
//     flex-direction:column;
//     background-color:#fff;
//     border:1px solid rgba(0, 0, 0, 0.1);
//     padding:10px;
//     box-sizing:border-box;
//     border-radius:5px;
//     width:100%;

//     &>div:first-child{
//         padding-top:0;
//     }

//     &>div:last-child{
//         padding-bottom:0;
//         border:none;
//     }

// `;

// const CardRow = styled.div`
//     display:flex;
//     justify-content:space-between;
//     padding:10px 0;
//     border-bottom:1px solid rgba(0, 0, 0, 0.1);
//     font-size:18px;

//     h4{
//         font-weight:normal;
//         margin:0;
//     }

//     span{
//         color:rgba(0, 0, 0, 0.5);
//     }
// `;

const List = styled.div`
    width:100%;
    padding:10px;
    box-sizing:border-box;
    background-color:#fff;
    border-radius:10px;
    border:1px solid rgba(0, 0, 0, 0.15);
    display:flex;
    justify-content:space-between;

    ${({direction}) => 
        direction? css`
            flex-direction:column;
            row-gap:10px;
        ` : ""
    }
    
`;

const Item = styled.div`
    h4{
        margin:0 0 5px 0;
        font-size:18px;
        font-weight:normal;
    }
    span{
        font-size:14px;
        color: rgba(0, 0, 0, 0.5);
    }
`;

const Inputs = styled.div`
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 3fr 1fr;
    margin-bottom: 10px;
`;

const Applications = styled.div`
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    max-height: ${({ expand }) => expand ? "1000px" : "72px"};
    transition:  max-height 0.3s ease-in;
`;


const Expand = styled.div`
    color: #5762B2;
    cursor: pointer;
`;


const Tables = styled.div`
    display: flex;
    gap: 10px;
`;

const Material = styled.div``;

const InputRow = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    /* height: 56px; */
    background: white;
    padding: 10px;
    box-sizing: border - box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
`;