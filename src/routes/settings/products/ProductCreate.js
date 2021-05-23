import { Helmet } from "react-helmet";
import { AddibleInput, AddibleInputWithTrash, FlexForHeader } from "../../../components/Flex";
import { Form } from "../../../components/Form";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { useTitle } from "../../../hooks";
import styled from "styled-components"
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Buttons";

import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState, useMemo } from "react";

import { RemoveIcon } from '../../../components/RemoveIcon';
import { CREATE_PRODUCT, CREATE_PRODUCT_GROUP, GET_PRODUCT_AND_GROUP  } from "./gql";
import { UPDATE_PRODUCT, UPDATE_PRODUCT_GROUP } from "./gql";
import { measureOptions, packagingTypes } from "../../../utils/static";
import { recursiveFetch, addProp } from "../../../utils/functions"; 
import { useLazyQuery, useMutation } from "@apollo/client";
import { showNotification } from "../../../utils/functions";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { getValueOfProperty } from "../../../utils/functions";
import { useTemplate } from "../../../hooks";


const ProductCreate = ({match}) => {
    
    const { id } = match.params,
          history = useHistory();

    const templ = {
            name: "",
            code: "",
            codeTnved: "",
            measure: "",
            typeOfPackaging: "",
            group: ""
        };
    
    const [products, setProducts] = useState([
        templ
    ]);

    const {
        addTempl,
        removeTempl
    } = useTemplate(products, setProducts, templ);
    
    const [groupCreate, setGroupCreate] = useState({
        name: "",
        code: ""
    });

    const [getProduct, getProductResp] = useLazyQuery(GET_PRODUCT_AND_GROUP);

    const [ createProduct ] = useMutation(CREATE_PRODUCT, {
        onCompleted: data => {
            showNotification(data, "product", "productCreate", "Продукт создан")
    
        },
        onError: error => console.log(error)
    });
    const [ createGroup ] = useMutation(CREATE_PRODUCT_GROUP, {
        onCompleted: data => {
            showNotification(data, "product", "productGroupCreate", "Группа создана");
            if(data.product.productGroupCreate.ok){
                launchProductsCreate(data);
                history.push("/settings/products");
            }
        },
        onError: error => NotificationManager.error(error.message)
    });

    const [ updateProduct ] = useMutation(UPDATE_PRODUCT, {
        onCompleted: data => {
            showNotification(data, "product", "productUpdate", "Продукт изменен");
        },
        onError: error => console.log(error)
    })

    const [ updateGroupProduct ] = useMutation(UPDATE_PRODUCT_GROUP, {
        onCompleted: data => {
            showNotification(data, "product", "productGroupUpdate", "Группа изменена");
            if(data.product.productGroupUpdate.ok){
                launchProductUpdate();
                history.push("/settings/products")
            }
        },
        onError: error => NotificationManager.error(error.message)
    })

    
    const product = getValueOfProperty(getProductResp?.data, "product"),
          group = getValueOfProperty(getProductResp?.data, "group"),
          productPk = getProductResp?.data?.product?.product?.pk,
          groupPk =  getProductResp?.data?.product?.product?.group?.pk;    
    

    useEffect(() => {
        if(id !== undefined){
            getProduct({
                variables: {
                    id: id
                }
            });
        }
    }, [id]);

    useEffect(() => {

        console.log("product group useEffect");
        if(product !== undefined && group !== undefined){
            setGroupCreate({
                name: group.name,
                code: group.code
            });
            setProducts([{
                name: product?.name,
                code: product?.code,
                codeTnved: product?.codeTnved,
                measure: product?.measure,
                typeOfPackaging: product?.typeOfPackaging,
                group: product?.group?.pk
            }])
        }
    }, [product, group])

    useEffect(() => {
        console.log("groupCreate", groupCreate);
        console.log("products", products);
    }, [groupCreate, products])

    const title = useTitle(id? "Редактирование продукта" : "Создание нового продукта");

    // Will launch after (save) button clicked
    function launchProductsCreate(data){
        const res = addProp(products, "group", data.product.productGroupCreate.productGroup.pk),
              recursiveMutation = recursiveFetch(res, createProduct);
        recursiveMutation();
    }

    function launchProductUpdate(){
        console.log("launch products");
        // const res = addProp(products, "group", data.product.productGroupCreate.productGroup.pk);
              updateProduct({
                  variables: {
                      input: {
                          pk: productPk,
                          data: products[0]
                      }
                  }
              });
    }

    const handleDataChange = (event, dataType, index) => {
        if(dataType === "group"){
            setGroupCreate({...groupCreate, [event.target.name] : event.target.value});
        }

        if(dataType === "product"){
            const productsCopy = products.slice(0);
            productsCopy[index] = {...productsCopy[index], [event.target.name] : event.target.value}
            setProducts(productsCopy);
        }
    }


    const save = () => {
        
        if(id !== undefined){
            updateGroupProduct({
                variables: {
                    input: {
                        pk: groupPk,
                        data: groupCreate
                    }
                }
            })
        }else{
            createGroup({
                variables: {
                    input: {
                        data: groupCreate
                    }
                }
            });
        }

    }
    
    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о группе продуктов</p>
                <AddibleInput>
                    <CustomInput name="name" label="Название группы" value={groupCreate.name} stateChange={e => handleDataChange(e, "group")} />
                    <CustomInput name="code" label="Код группы" value={groupCreate.code} stateChange={e => handleDataChange(e, "group")} />
                </AddibleInput>
                <FlexForHeader>
                    <p>Продукты</p>
                    <Button name="Добавить продукты" color="#5762B2" clickHandler={addTempl}/>
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
                                        measureOptions.map(unit => <MenuItem value={unit.value} selected={unit === e.measure}>{unit.label}</MenuItem>)
                                    }
                                </CustomSelector>
                                <CustomSelector label="Тип упаковки" name="typeOfPackaging" value={e.typeOfPackaging} stateChange={e => handleDataChange(e, "product", index)}>
                                    {   
                                        packagingTypes.map(type => <MenuItem value={type.value} selected={type === e.typeOfPackaging}>{type.label}</MenuItem>)
                                    }
                                </CustomSelector>
                            </InputsWrapper>
                            <RemoveIcon clicked={() => removeTempl(index)} />
                        </AddibleInputWithTrash>
                    })
                }  
            </Form>
            <Footer>
                <span>Кол-во продуктов: {products.length || 0}</span>
                <Button name="Сохранить" clickHandler={save} />
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