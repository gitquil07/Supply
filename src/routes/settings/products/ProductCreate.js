import { Helmet } from "react-helmet";
import { AddibleInputWithTrash, FlexForHeader } from "components/Flex";
import { Form } from "components/Form";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomSelector } from "components/Inputs/CustomSelector";
import { useTitle } from "hooks";
import styled from "styled-components"
import { Footer } from "components/Footer";
import { Button } from "components/Buttons";

import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";

import { RemoveIcon } from 'components/RemoveIcon';
import { CREATE_PRODUCT, GET_PRODUCT_AND_GROUP } from "./gql";
import { UPDATE_PRODUCT } from "./gql";
import { measureOptions, packagingTypes } from "utils/static";
import { recursiveFetch } from "utils/functions";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { getValueOfProperty } from "utils/functions";
import { useTemplate, useCustomMutation } from "hooks";
import { ValidationMessage } from "components/ValidationMessage";
import { Switch } from "@material-ui/core";
import { ProductSchema, fieldsMessages } from "./validation"; 


const ProductCreate = ({ match }) => {

    const { id } = match.params,
        history = useHistory();

    const templ = {
        name: "",
        code: "",
        codeTnved: "",
        measure: "",
        typeOfPackaging: "",
        isActive: ""
    };

    const [products, setProducts] = useState([
        templ
    ]);

    const {
        addTempl,
        removeTempl
    } = useTemplate(products, setProducts, templ);


    const {
        submitData,
        handleSubmit,
        validationMessages,
        mutationLoading
    } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_PRODUCT,
            queryUpdate: UPDATE_PRODUCT
        }
    },
        "Продукт",
        () => {
            history.push("/settings/products");
        },
        ProductSchema,
        fieldsMessages
    );

    const [getProduct, getProductResp] = useLazyQuery(GET_PRODUCT_AND_GROUP, {
        fetchPolicy: "no-cache"
    });


    const product = getValueOfProperty(getProductResp?.data, "product")?.product,
        productPk = getProductResp?.data?.product?.product?.pk;


    useEffect(() => {
        if (id !== undefined) {
            getProduct({
                variables: {
                    id
                }
            });
        }
    }, [id]);

    useEffect(() => {
        console.log("product", product);
        if (product !== undefined) {
            setProducts([
                {
                    name: product?.name,
                    code: product?.code,
                    codeTnved: product?.codeTnved,
                    measure: product?.measure,
                    typeOfPackaging: product?.typeOfPackaging,
                    isActive: product?.isActive
                }
            ])
        }
    }, [product])

    useEffect(() => {
        console.log("products", products);
    }, [products])

    const title = useTitle(id ? "Редактирование продукта" : "Создание нового продукта");

    const handleDataChange = (event, dataType, index) => {
        if (dataType === "product") {
            const productsCopy = products.slice(0);
            productsCopy[index] = { ...productsCopy[index], [event.target.name]: event.target.value }
            setProducts(productsCopy);
        }
    }


    const save = () => {

        if (productPk) {
            submitData(products[0], productPk);
        } else {
            const recursiveMutation = recursiveFetch(products.length, (turn) => submitData(products[turn]));
            recursiveMutation();
        }

    }

    const handleSwitchChange = (e, index) => {
        const productsCopy = products.slice(0);
        productsCopy[index] = { ...productsCopy[index], [e.target.name]: e.target.checked };
        setProducts(productsCopy);
    }

    return (
        <>
            <Helmet title={title} />
            <Form>
                <FlexForHeader>
                    <p>
                        {
                            !id? "Продукты" : "Продукт"
                        }   
                    </p>
                    {
                        !id && <Button name="Добавить продукт" color="#5762B2" clickHandler={addTempl} />
                    }
                </FlexForHeader>
                {
                    products.map((e, index) => {
                        return <AddibleInputWithTrash>
                            <InputsWrapper>
                                <CustomInput label="Название продукта" name="name" value={e.name} stateChange={e => handleDataChange(e, "product", index)} />
                                <CustomInput label="Код продукта" name="code" value={e.code} stateChange={e => handleDataChange(e, "product", index)} />
                                <CustomInput label="Код ТН ВЭД" name="codeTnved" value={e.codeTnved} stateChange={e => handleDataChange(e, "product", index)} />
                                <CustomSelector label="Ед.изм" name="measure" value={e.measure} stateChange={e => handleDataChange(e, "product", index)}>
                                    {
                                        measureOptions.map(unit =>
                                            <MenuItem key={unit.value} value={unit.value} selected={unit.value == e.measure}>{unit.label}</MenuItem>
                                        )
                                    }
                                </CustomSelector>
                                <CustomSelector label="Тип упаковки" name="typeOfPackaging" value={e.typeOfPackaging} stateChange={e => handleDataChange(e, "product", index)}>
                                    {
                                        packagingTypes.map(type => <MenuItem key={type.value} value={type.valueEnglish} selected={type.valueEnglish === e.typeOfPackaging}>{type.label}</MenuItem>)
                                    }
                                </CustomSelector>
                                <label>
                                    Активность: 
                                    <Switch name="isActive" checked={e.isActive} onChange={e => handleSwitchChange(e, index)} />
                                </label>
                            </InputsWrapper>
                            {
                                !id && <RemoveIcon clicked={() => removeTempl(index)} />
                            }
                        </AddibleInputWithTrash>
                    })
                }
            </Form>
            <Footer>
                <span>Кол-во продуктов: {products.length || 0}</span>
                <Button name="Сохранить" clickHandler={save} loading={mutationLoading} />
            </Footer>
        </>
    )
}

export default ProductCreate;

const GreyTable = styled.div`
    width: 100%;
    background-color: #F6F6FC;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    font-size: 18px;
    margin-top: 20px;
    padding: 10px; 
`;

const Head = styled.div`
    display: grid;
    grid-template-columns: .7fr 0.7fr 1.5fr .5fr .4fr 0.9fr 0.7fr 0.7fr 0.7fr;
    padding: 0 10px 10px 10px;
    gap: 10px;
`;

const Body = styled.div` 
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
`;

const List = styled.div`
    display: grid;
    grid-template-columns: .7fr 0.7fr 1.5fr .5fr .4fr 0.9fr 0.7fr 0.7fr 0.7fr;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);

    :last-child {
        border: none;
    }
`;

const InputsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    grid-gap: 10px;
`;