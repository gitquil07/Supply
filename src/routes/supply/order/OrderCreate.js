import { useState, useEffect, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { uploadFile } from "../../../api";
import { useTitle } from '../../../hooks';
import MenuItem from '@material-ui/core/MenuItem';

import { Button } from '../../../components/Buttons';
import CustomPicker from '../../../components/Inputs/DatePicker';
import { DragFile } from '../../../components/Inputs/DragFile';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { CustomInput } from '../../../components/Inputs/CustomInput';
import { CustomSelector } from '../../../components/Inputs/CustomSelector';
import { AddibleInput, AddibleInputWithTrash } from "../../../components/Flex";
import { Footer } from '../../../components/Footer';
import { ORDER_CREATE, ORDER_UPDATE } from "./gql";
import { GET_FACTORIES_LIST, GET_VENDOR_FACTORIES, GET_VENDOR_FACTORY_PRODUCTS } from "./gql";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";
import { Form } from "../../../components/Form";
import { statuses } from "../../../utils/static";
import { useHistory } from "react-router-dom";
import { GET_ORDER } from "./gql";
import { exceptKey } from "../../../utils/functions";
import { useCustomMutation } from "../../../hooks";
import { getList, getValueOfProperty } from "../../../utils/functions";
import { useTemplate } from "../../../hooks";
import { Day } from "@material-ui/pickers";



const OrderCreate = ({ match }) => {

    const { id } = match.params,
        title = useTitle("Создать Заказ"),
        history = useHistory();

    const { submitData } = useCustomMutation({
        graphQlQuery: {
            queryCreate: ORDER_CREATE,
            queryUpdate: ORDER_UPDATE
        }
    },
        "Заказ",
        () => {
            history.push('/supply/order');
        }
    );

    const [getFactories, factoriesRes] = useLazyQuery(GET_FACTORIES_LIST),
        [getOrder, orderRes] = useLazyQuery(GET_ORDER, {
            fetchPolicy: "no-cache"
        }),
        [getVendorFactories, vendorFactoriesResp] = useLazyQuery(GET_VENDOR_FACTORIES),
        [getVendorFactoryProducts, vendorFactoryProductsResp] = useLazyQuery(GET_VENDOR_FACTORY_PRODUCTS);

    const [factory, setFactory] = useState("");

    // console.log("factoriesQuerySet?.data", useMemo(() => getList(undefined?.undefined), [undefined]));
    const factories = useMemo(() => getList(factoriesRes?.data), [factoriesRes?.data]) || [],
        vendorFactories = useMemo(() => getList(vendorFactoriesResp?.data), [vendorFactoriesResp?.data]) || [],
        vendorProducts = useMemo(() => getList(vendorFactoryProductsResp?.data), [vendorFactoryProductsResp?.data]) || [],
        pk = useMemo(() => getValueOfProperty(orderRes?.data, "pk"), [orderRes?.data]);


    const [files, setFiles] = useState({
        fetched: [],
        uploaded: []
    });
    const [loading, setLoading] = useState(false);


    const templ = {
        vendorProduct: "",
        dateOfDelivery: Date.now(),
        count: "",
        currency: "",
        price: ""
    };

    const [materials, setMaterials] = useState([
        templ
    ]);

    const {
        addTempl,
        removeTempl
    } = useTemplate(materials, setMaterials, templ);

    const [orderData, setOrderData] = useState({
        vendorFactory: "",
        status: "",
        invoiceDate: Date.now(),
        invoiceProforma: ""
    });

    const [productionDayCounts, setProductionDayCounts] = useState({});

    useEffect(() => {
        getFactories();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            getOrder({
                variables: {
                    id
                }
            });
        }
    }, [id]);

    useEffect(() => {
        if (orderRes?.data !== undefined) {
            const order = orderRes?.data.order.order;
            setFactory(order.vendorFactory.factory.pk);
            setOrderData({
                vendorFactory: order.vendorFactory.pk,
                status: order.status,
                invoiceDate: order.invoiceDate,
                invoiceProforma: order.invoiceProforma
            });
            if(orderRes?.data?.order?.order?.files?.edges.length > 0) {
            setFiles({
                ...files,
                fetched: [
                    ...files.fetched,
                    ...orderRes?.data?.order?.order?.files?.edges.map(({ node }) => {
                        return {
                            file: node.file,
                            fileUrl: node.fileUrl
                        }
                    })
                ]
            })
            }
            const orderItems = order.orderItems.edges.map(({ node }) => {
                return {
                    ...exceptKey(node, "__typename"),
                    vendorProduct: node.vendorProduct.pk
                }
            });
            setMaterials(orderItems);
        }

    }, [orderRes?.data]);

    useEffect(() => {
        console.log("order", orderData);
    }, [orderData]);

    useEffect(() => {
        console.log("factory", factory);
    }, [factory]);


    useEffect(() => {
        console.log("files", files);
    }, [files]);

    useEffect(() => {

        getVendorFactories({
            variables: {
                factory
            }
        });

    }, [factory]);

    const { vendorFactory } = orderData;
    useEffect(() => {
        console.log("vendorFactory", vendorFactory);
        getVendorFactoryProducts({
            variables: {
                vendorFactory
            }
        });

    }, [vendorFactory]);

    const handleDataChange = (event, dataType, index) => {
        if (dataType === "order") {
            setOrderData({ ...orderData, [event.target.name]: event.target.value });
        }

        if (dataType === "material") {
            const materialsCopy = materials.slice(0);
            setProductionDayCounts({ ...productionDayCounts, [index]: event.target.value });
            materialsCopy[index] = { ...materialsCopy[index], [event.target.name]: event.target.value }
            setMaterials(materialsCopy);
        }
    }

    const handleDateChange = (dateFieldName, date, index) => {
        const materialsCopy = materials.slice(0);
        materialsCopy[index] = { ...materialsCopy[index], [dateFieldName]: date };
        setMaterials(materialsCopy);
    }

    const handleSubmit = () => {
        const orderRequestBody = { ...orderData };
        let orderMaterials = materials.slice(0);

        const formedOrderMaterials = orderMaterials.map(orderMaterial => {
            return {
                ...orderMaterial,
                dateOfDelivery: moment(orderMaterial.dateOfDelivery).format("YYYY-MM-DD"),
            }
        });

        orderRequestBody.invoiceDate = moment(orderRequestBody.invoiceDate).format("YYYY-MM-DD");

        orderRequestBody.orderItems = formedOrderMaterials;
        orderRequestBody.files = files.uploaded.map(file => file.file_id);
        if (pk) {
            orderRequestBody.status = statuses.find(status => status.value == orderRequestBody.status).label;
        }

        pk ? submitData(orderRequestBody, pk) : submitData(exceptKey(orderRequestBody, ["status"]));
    }

    const getAproximateDeliveryDate = (date, productionDayCounts) => {

        console.log("date", date);
        console.log("productionDayCounts", productionDayCounts);

        if (productionDayCounts) {
            const dateInMilliseconds = (typeof date == "number") ? date : new Date(date).getTime(),
                daysInMilliseconds = 1000 * 60 * 60 * 24 * productionDayCounts,
                aproximateDeliveryDate = moment(new Date(dateInMilliseconds + daysInMilliseconds).toISOString()).format("DD.MM.YYYY");
            return aproximateDeliveryDate;
        }

        return moment(new Date(date).toISOString()).format("DD.MM.YYYY");
        // return  new Day(dateInMilliseconds + twoDays);
    }

    const remove = (index) => {
        const tmp = { ...productionDayCounts };
        delete tmp[index];
        setProductionDayCounts(tmp);
        removeTempl(index)
    }


    const sendFileToServer = (file) => {
        setLoading(true);

        uploadFile('/api-file/documents/', file).then(res => {
            setFiles({ ...files, uploaded: [...files.uploaded, { file_id: res.data[0].id, file_name: file.name }] })
            setLoading(false);
        }).catch(err => console.log(err));
    }


    return (
        <>
            <Helmet title={title} />
            <Wrapper>
                <Form>
                    <Title>Данные заказа</Title>

                    <AddibleInput>
                        <CustomSelector label="Выберите завод" name="factory" value={factory} stateChange={(e) => setFactory(e.target.value)}>
                            {
                                factories?.map(({ node }) => {
                                    return <MenuItem key={node.pk} value={node.pk} selected={factory === node.pk}>{node.name}</MenuItem>
                                })
                            }
                        </CustomSelector>
                        <CustomSelector label="Выберите поставщика" name="vendorFactory" value={orderData.vendorFactory} stateChange={(e) => handleDataChange(e, "order")}>
                            {
                                vendorFactories?.map(({ node }) => {
                                    return <MenuItem key={node.pk} value={node.pk} selected={orderData.vendorFactory === node.pk}>{node?.vendor?.name}</MenuItem>
                                })
                            }
                        </CustomSelector>

                        {
                            pk && <CustomSelector label="Статус" name="status" value={orderData.status} stateChange={e => handleDataChange(e, "order")}>
                                {
                                    statuses.map(status => {
                                        return <MenuItem key={status.value} value={status.value} selected={orderData.status === status.value}>{status.label}</MenuItem>
                                    }
                                    )
                                }
                            </CustomSelector>
                        }
                        <CustomPicker label="Дата создание" name="invoiceDate" date={orderData.invoiceDate} stateChange={(date) => setOrderData({ ...orderData, invoiceDate: date })} />
                        <CustomInput label="Инвойс заказа" name="invoiceProforma" value={orderData.invoiceProforma} stateChange={(e) => handleDataChange(e, "order")} />
                    </AddibleInput>

                    <DragFile
                        fetchedFiles={files.fetched}
                        uploadedFiles={files.uploaded}
                        receivedFile={(file) => sendFileToServer(file)}
                        removeClicked={(id) => setFiles({ ...files, uploaded: files.uploaded.filter((e) => e.file_id !== id) })}
                        loading={loading}
                    />

                    <Header>
                        <Title>Материал</Title>
                        <Button name="Добавить материал" color="#5762B2" clickHandler={addTempl} />
                    </Header>

                    {
                        materials.map((e, index) => {
                            return <AddibleInputWithTrash>
                                <InputsWrapper>
                                    <CustomSelector name="vendorProduct" label="Выберите материал" value={e.vendorProduct} stateChange={(e) => handleDataChange(e, "material", index)}>
                                        {
                                            vendorProducts?.map(({ node }) => {
                                                return <MenuItem key={node.pk} value={node.pk} selected={materials[index].vendorProduct === node.pk}>{node.product.name}</MenuItem>
                                            })
                                        }
                                    </CustomSelector>
                                    <CustomPicker name="dateOfDelivery" label="Дата отгрузки" date={e.dateOfDelivery} stateChange={(date) => handleDateChange("dateOfDelivery", date, index)} />
                                    <CustomInput label="Примерная дата прибытия" value={getAproximateDeliveryDate(e.dateOfDelivery, productionDayCounts[index])} disabled />
                                    <CustomInput name="count" label="Кол-во" value={e.count} stateChange={(e) => handleDataChange(e, "material", index)} />
                                    <CustomInput name="price" label="Цена" value={e.price} stateChange={(e) => handleDataChange(e, "material", index)} />
                                </InputsWrapper>
                                <RemoveIcon clicked={() => remove(index)} />
                            </AddibleInputWithTrash>
                        })
                    }

                </Form>

                <Footer>
                    <span>Кол-во материалов: {materials.length}</span>
                    <Button name={pk ? "Изменить заказ" : "Создать заказ"} clickHandler={handleSubmit} />
                </Footer>
            </Wrapper>
        </>
    )
}

export default OrderCreate;

const Wrapper = styled.div`
    width: 100%;
`;

const Title = styled.div`
    font-size: 18px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

const InputsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    grid-gap: 10px;
`;