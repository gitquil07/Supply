import React, {useState, useEffect} from 'react';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {Button, Select, FormControl, MenuItem, TextField} from '@material-ui/core';
import {connect} from "react-redux";
import {append, filter, includes} from "ramda";
import {Row, Col} from 'reactstrap'
import styled from 'styled-components'
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useParams} from "react-router-dom";
import {modes} from "Routes/customs/constants";
import {baseApi} from "Api/index";
import {NotificationManager} from "react-notifications";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import {editCustomsDetail} from "Actions";

const StyledRow = styled(Row)`
    margin-bottom: 15px;
`

const NoDocumentCustomsCreate = ({match, history, editCustomsDetail}) => {
    const {id} = useParams()

    const [data, setData] = useState({
        declarant_note: '',
        contractor_note: ''
    })
    const [status, setStatus] = useState([])

    useEffect(() => {
        baseApi.get(`api-customs/customs/${id}/`)
            .then((res) => {
                setData(res.data);
            })
            .catch(error => {
                NotificationManager.warning(error.response.request.response)
            });
    }, [id])


    const updateField = e => {
        if(e.target.name === 'status'){
            setStatus(includes(e.target.value, status) ? filter(n => n !== e.target.value, status) :  append(e.target.value, status))
        }else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    };


    const handleSubmit = e => {
        e.preventDefault();
        const list = {
            ...data,
            application: data?.application?.id,
            status
        }
        editCustomsDetail(id, list, history, "/app/customs/no-document-customs")
    };

    return (
        <div className="map-wrapper">
            <PageTitleBar title="Изменение заявки" match={match} />
            <RctCollapsibleCard>
                <List className="project-list list-unstyled p-0 ">
                    <Row>
                        <Col sm="6">
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        Поставщик :
                     </span>
                                <span className="w-50 text-truncate">
                            {data?.application?.order?.vendor_factory?.vendor?.name}
                     </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        Завод :
                     </span>
                                <span className="w-50 text-truncate">
                            {data?.application?.order?.vendor_factory?.factory?.name}
                     </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        Инвойс :
                     </span>
                                <span className="w-50 text-truncate">
                            {data?.application?.invoices[0]}
                     </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        Тип транспорта :
                     </span>
                                <span className="w-50 text-truncate">
                        {data?.application?.transport_type?.name}
                     </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        Заметка для контрактора :
                     </span>
                                <span className="w-50 text-truncate">
                            {data?.contractor_note}
                     </span>
                            </ListItem>
                        </Col>
                        <Col sm="6">
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        Заметка для декларанта :
                     </span>
                                <span className="w-50 text-truncate">
                            {data?.declarant_note}
                         </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        Количество регистрации :
                     </span>
                                <span className="w-50 text-truncate">
                            {data?.registration_amount}
                         </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold fw-bold">
                        ССТ :
                     </span>
                                <span className="w-50 text-truncate">
                            {data?.sst}
                         </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                                 <span className="w-50 d-flex fw-semi-bold fw-bold">
                                    Режим :
                                 </span>
                                <span className="w-50 text-truncate">
                                    {data?.mode}
                                 </span>
                            </ListItem>
                            <ListItem className="p-0 d-flex justify-content-start align-content-center">
                             <span className="w-50 d-flex fw-semi-bold fw-bold">
                                Статус :
                             </span>
                                <span className="w-50 text-truncate"></span>
                            </ListItem>
                            {data?.status?.map((st) => (
                                <ListItem className="p-0 d-flex justify-content-start align-content-center" key={st}>
                                    <span className="w-50 d-flex fw-semi-bold "></span>
                                    <span className="w-50 text-truncate">
                                     - {st}
                                </span>
                                </ListItem>
                            ))}
                        </Col>
                    </Row>
                </List>
                <br />
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
                    </StyledRow>
                    <StyledRow>
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
                        <Col sm="1">
                            <Button type="submit" variant="contained" color={'primary'} size={'large'}>Сохранить</Button>
                        </Col>
                    </StyledRow>
                </form>
            </RctCollapsibleCard>
        </div>
    )
}
export default connect(null, {
    editCustomsDetail
})(NoDocumentCustomsCreate);
