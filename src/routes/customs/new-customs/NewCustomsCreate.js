import React, {useEffect, useState} from 'react';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {Button, TextField, Select, FormControl, MenuItem} from '@material-ui/core';
import {connect} from "react-redux";
import {newCustoms, editPayment} from "Actions";
import {append, includes, filter} from "ramda";
import {Row, Col} from 'reactstrap'
import styled from 'styled-components'
import InputLabel from "@material-ui/core/InputLabel";
import { useParams } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import {modes} from '../constants'
import {baseApi} from "Api/index";
import {NotificationManager} from "react-notifications";

const StyledRow = styled(Row)`
    margin-bottom: 15px;
`

const NewCustomsCreate = ({match, history, newCustoms, editPayment }) => {
    const {id} = useParams()

    const [data, setData] = useState({
        application: id,
        mode: '',
        post: '',
        sst: '',
        registration_amount: '',
        status: [],
        declarant_note: '',
        contractor_note: '',
    })
    const [payment, setPayment] = useState([])

    useEffect(() => {
        baseApi.get('api-finance/app-payments/', {
            params: {
                application: id,
            },
        }).then((res) => {
                setPayment(res.data.results);
            })
            .catch(error => {
                NotificationManager.warning(error.response.request.response)
            });
    }, [id])

    const updateField = e => {
        if(e.target.name === 'status'){
            setData({
                ...data,
                status: includes(e.target.value, data.status) ? filter(n => n !== e.target.value, data.status) :  append(e.target.value, data.status)
            })
        }else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    };

    const updatePaymentField = (index, event) => {
        const values = [...payment];
        if (event.target.name === "custom_price") {
            values[index].custom_price = event.target.value
        } else{
            values[index].tracking_price = event.target.value
        }
        setPayment(values);
    };
    const list = payment.map(({id, custom_price}) => {
        return {id, custom_price}
    })

    const handleSubmit = e => {
        e.preventDefault();
        newCustoms(data, history);
        editPayment(list)
    };
    return (
        <div className="map-wrapper">
            <PageTitleBar title="Создать Таможню" match={match} />
            <RctCollapsibleCard>
                <form onSubmit={handleSubmit}>
                    <StyledRow>
                        <Col sm="7">
                            <FormGroup row>
                                <FormControlLabel control={
                                    <Checkbox color="primary" onChange={updateField} value="готовые для оформления" name="status"/>
                                } label="Готовые для оформления"
                                />
                                <FormControlLabel control={
                                    <Checkbox color="primary" onChange={updateField} value="нет документов" name="status"/>
                                } label="Нет документов"
                                />
                                <FormControlLabel control={
                                    <Checkbox color="primary" onChange={updateField} value="сертификат" name="status"/>
                                } label="Сертификат"
                                />
                                <FormControlLabel control={
                                    <Checkbox color="primary" onChange={updateField} value="нет денег" name="status"/>
                                } label="Нет денег"
                                />
                                <FormControlLabel control={
                                    <Checkbox color="primary"  onChange={updateField} value="ждет льготы" name="status" />
                                } label="Ждет льготы"
                                />
                            </FormGroup>
                        </Col>
                        <Col sm="2">
                            <TextField
                                value={data.post}
                                name="post"
                                type="text"
                                label="Пост"
                                variant="outlined"
                                onChange={updateField}
                            />
                        </Col>
                        <Col sm="3">
                            <FormControl variant="outlined">
                                <InputLabel id="mode">Режим</InputLabel>
                                <Select
                                    labelId="mode"
                                    value={data.mode}
                                    name="mode"
                                    onChange={updateField}
                                    label="Режим"
                                >
                                    {modes.map((mode, index) => {
                                        return (
                                            <MenuItem value={mode} key={index}>{mode}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Col>
                    </StyledRow>
                    <StyledRow>
                        <Col sm="2">
                            <TextField
                                value={data.sst}
                                label="ССТ"
                                type="text"
                                name="sst"
                                variant="outlined"
                                onChange={updateField}
                            />
                        </Col>
                        <Col sm="2">
                            <TextField
                                value={data.registration_amount}
                                type="text"
                                label="Количество регистрации"
                                name="registration_amount"
                                variant="outlined"
                                onChange={updateField}
                            />
                        </Col>
                        <Col sm="4">
                            <TextField
                                value={data.declarant_note}
                                type="text"
                                label="Заметка декларатора"
                                name="declarant_note"
                                variant="outlined"
                                onChange={updateField}
                            />
                        </Col>
                        <Col sm="4">
                            <TextField
                                value={data.contractor_note}
                                type="text"
                                label="Заметка контрактора"
                                name="contractor_note"
                                variant="outlined"
                                onChange={updateField}
                            />
                        </Col>
                    </StyledRow>
                    {payment?.map((item, index) => (
                        <StyledRow key={item?.id}>
                            <Col sm="4">
                                <TextField
                                    value={item?.firm?.name}
                                    type="text"
                                    label="Фирма"
                                    name="firm"
                                    variant="outlined"
                                    disabled
                                />
                            </Col>
                            <Col sm="4">
                                <TextField
                                    value={item?.custom_price}
                                    type="text"
                                    label="Цена растаможки"
                                    name="custom_price"
                                    variant="outlined"
                                    onChange={e => updatePaymentField(index,e)}
                                />
                            </Col>
                        </StyledRow>
                    ))}
                    <Row>
                        <Col sm={'10'} />
                        <Col sm={'2'}>
                            <Button type="submit" variant="contained" color={'primary'} size={'large'}>Создать</Button>
                        </Col>
                    </Row>
                </form>
            </RctCollapsibleCard>
        </div>
    )
}
export default connect(null, {
    newCustoms,
    editPayment
})(NewCustomsCreate);
