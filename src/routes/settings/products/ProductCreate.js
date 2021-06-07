import { Helmet } from "react-helmet";
import { AddibleInput, AddibleInputWithTrash, FlexForHeader } from "components/Flex";
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
import { CREATE_PRODUCT, CREATE_PRODUCT_GROUP, GET_PRODUCT_AND_GROUP  } from "./gql";
import { UPDATE_PRODUCT, UPDATE_PRODUCT_GROUP } from "./gql";
import { measureOptions, packagingTypes } from "utils/static";
import { recursiveFetch, addProp } from "utils/functions"; 
import { useLazyQuery, useMutation } from "@apollo/client";
import { showNotification } from "utils/functions";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { getValueOfProperty } from "utils/functions";
import { useTemplate, useCustomMutation } from "hooks";
import { ValidationMessage } from "components/ValidationMessage";
import { object, string } from "yup";

// object() - (function-constructor)
// In it (prototype) method it contains 
// method which will be available inside hidden property [[prototype]]
// of created object.


const obj = new object();
console.dir(object);
console.log(obj);
// console.log(typeof  obj);
// display -> 
// that typeof object is object
console.dir(string);
const str = string().oneOf(["value1", "value2"]);

console.log("str", str);
// Test 1
str.isValid("value1")
    .then(res => console.log("result", res))
    .catch(error => console.log("fail", error));

// Test 2
str.isValid("value2")
    .then(res => console.log("result 2", res))
    .catch(error => console.log("error", error));

// Test 3
// Pass value which is not exist in list
str.isValid("sajkd")
    .then(res => console.log("result 3", res))
    .catch(error => console.log("error 3", error));

// Test 4
// Don't pass anyhting to check whether (.required) method is working
str.isValid()
    .then(res => console.log("result 5", res))
    .catch(error => console.log("error 5", error));
// -> There is not any messages displayed but validation failed because 
// isValid method returned false

// isValid - function returns executed Promise, so
// to see result we have to use (.then) method 
// when Promise object instance of Prodmise resolved
// to get resolved value ([[PromiseState]] => "resolved", [[PromiseResult]] => "value")
// .catch - method promise object executed with rejection ([[PromiseState]] => "rejected", [[PromiseResult]] => "value")
// Executed promise object returned by (.isValid) method resolves with boolean. (true) when validations passes successfully
// and (false) when validation fails!


const measureEnums = measureOptions.map(measure => measure.value);

const productSchema = object({
    name: string().typeError("Поле `Название` должно быть строкой").required("Поле `Название` должно быть заполнено"),
    code: string().typeError("Поле `Код` должно быть строкой").required("Поле `Код` должно быть заполнено"),
    codeTnved: string().typeError("Поле `Код ТН ВЭД` должно быть строкой").required("Поле `Код ТН ВЭД` должно быть заполнено"),
    measure: string().oneOf(measureEnums, "Недопустимое значение поля 'Ед. измерения' "),
    typeOfPackaging: string().typeError("Поле `Тип упаковки` должно быть строкой").required("Поле `Тип упаковки` должно быть заполнено")
}); 

const fieldsMessages = {
    name: "",
    code: "",
    codeTnved: "",
    measure: "",
    typeOfPackaging: ""
}

const ProductCreate = ({match}) => {
    
    const { id } = match.params,
          history = useHistory();

    const templ = {
            name: "",
            code: "",
            codeTnved: "",
            measure: "",
            typeOfPackaging: "",
            // group: ""
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
        validationMessages
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
        productSchema,
        fieldsMessages
    );
    
    // const [groupCreate, setGroupCreate] = useState({
    //     name: "",
    //     code: ""
    // });

    const [getProduct, getProductResp] = useLazyQuery(GET_PRODUCT_AND_GROUP, {
        fetchPolicy: "no-cache"
    });

    // const [ createProduct ] = useMutation(CREATE_PRODUCT, {
    //     onCompleted: data => {
    //         showNotification(data, "product", "productCreate", "Продукт создан");
    //         history.push("/settings/products");
    
    //     },
    //     onError: error => console.log(error)
    // });
    // const [ createGroup ] = useMutation(CREATE_PRODUCT_GROUP, {
    //     onCompleted: data => {
    //         showNotification(data, "product", "productGroupCreate", "Группа создана");
    //         if(data.product.productGroupCreate.ok){
    //             launchProductsCreate(data);
    //             history.push("/settings/products");
    //         }
    //     },
    //     onError: error => NotificationManager.error(error.message)
    // });

    // const [ updateProduct ] = useMutation(UPDATE_PRODUCT, {
    //     onCompleted: data => {
    //         showNotification(data, "product", "productUpdate", "Продукт изменен");
    //     },
    //     onError: error => console.log(error)
    // })

    // const [ updateGroupProduct ] = useMutation(UPDATE_PRODUCT_GROUP, {
    //     onCompleted: data => {
    //         showNotification(data, "product", "productGroupUpdate", "Группа изменена");
    //         if(data.product.productGroupUpdate.ok){
    //             launchProductUpdate();
    //             history.push("/settings/products")
    //         }
    //     },
    //     onError: error => NotificationManager.error(error.message)
    // })

    
    const product = getValueOfProperty(getProductResp?.data, "product")?.product,
          productPk = getProductResp?.data?.product?.product?.pk;
    //   group = getValueOfProperty(getProductResp?.data, "group"),
        //   groupPk =  getProductResp?.data?.product?.product?.group?.pk;    
    

    useEffect(() => {
        if(id !== undefined){
            getProduct({
                variables: {
                    id
                }
            });
        }
    }, [id]);

    useEffect(() => {
        console.log("product", product);
        if(product !== undefined){
            setProducts([
                {
                    name: product?.name,
                    code: product?.code,
                    codeTnved: product?.codeTnved,
                    measure: product?.measure,
                    typeOfPackaging: product?.typeOfPackaging,
                    // group: product?.group?.pk
                }
            ])
        }
    }, [product])

    // useEffect(() => {

    //     console.log("product group useEffect");
    //     if(product !== undefined && group !== undefined){
    //         setGroupCreate({
    //             name: group.name,
    //             code: group.code
    //         });
    //         setProducts([{
    //             name: product?.name,
    //             code: product?.code,
    //             codeTnved: product?.codeTnved,
    //             measure: product?.measure,
    //             typeOfPackaging: product?.typeOfPackaging,
    //             group: product?.group?.pk
    //         }])
    //     }
    // }, [product, group])

    // useEffect(() => {
    //     console.log("groupCreate", groupCreate);
    //     console.log("products", products);
    // }, [groupCreate, products])

    useEffect(() => {
        console.log("products", products);
    }, [products])

    const title = useTitle(id? "Редактирование продукта" : "Создание нового продукта");

    // Will launch after (save) button clicked
    // function launchProductsCreate(data){
    //     let res = addProp(products, "group", data.product.productGroupCreate.productGroup.pk);
    //     // res = res.map((product, idx) => {
    //     //     return {
    //     //         ...product,
    //     //         typeOfPackaging: packagingTypes.find(type => type.value === res[idx].typeOfPackaging).label
    //     //     }
    //     // })
    //     const recursiveMutation = recursiveFetch(res.length, (turn) => createProduct({
    //             variables: {
    //                 input: {
    //                     data: res[turn]
    //                 }
    //             }
    //         })
    //     );
    //     recursiveMutation();
    // }

    // function launchProductUpdate(){
    //     console.log("launch products");
    //     // const res = addProp(products, "group", data.product.productGroupCreate.productGroup.pk);
    //           updateProduct({
    //               variables: {
    //                   input: {
    //                       pk: productPk,
    //                       data: products[0]
    //                   }
    //               }
    //           });
    // }

    const handleDataChange = (event, dataType, index) => {
        // if(dataType === "group"){
        //     setGroupCreate({...groupCreate, [event.target.name] : event.target.value});
        // }

        if(dataType === "product"){
            const productsCopy = products.slice(0);
            productsCopy[index] = {...productsCopy[index], [event.target.name] : event.target.value}
            setProducts(productsCopy);
        }
    }


    const save = () => {
        
        if(productPk){
            // handleSubmit(products[0], productPk);
            submitData(products[0], productPk);
        }else{
            const recursiveMutation = recursiveFetch(products.length, (turn) => submitData(products[turn]));
            // const recursiveMutation = recursiveFetch(products.length, (turn) => handleSubmit(products[turn]));
            recursiveMutation();
        }   

        // if(id !== undefined){
        //     updateGroupProduct({
        //         variables: {
        //             input: {
        //                 pk: groupPk,
        //                 data: groupCreate
        //             }
        //         }
        //     })
        // }else{
        //     createGroup({
        //         variables: {
        //             input: {
        //                 data: groupCreate
        //             }
        //         }
        //     });
        // }

    }
    
    return (
        <>
            <Helmet title={title} />
            <Form>
                {/* <p>Информация о группе продуктов</p>
                <AddibleInput>
                    <CustomInput name="name" label="Название группы" value={groupCreate.name} stateChange={e => handleDataChange(e, "group")} />
                    <CustomInput name="code" label="Код группы" value={groupCreate.code} stateChange={e => handleDataChange(e, "group")} />
                </AddibleInput> */}
                <FlexForHeader>
                    <p>Продукты</p>
                    <Button name="Добавить продукт" color="#5762B2" clickHandler={addTempl}/>
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