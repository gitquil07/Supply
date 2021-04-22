import React, {useState, useEffect} from 'react';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import {connect} from "react-redux";
import {append, filter, includes} from "ramda";
import {Row, Col} from 'reactstrap'
import styled from 'styled-components'
import {useParams} from "react-router-dom";
import {baseApi} from "Api/index";
import {NotificationManager} from "react-notifications";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import {editCustomsDetail} from "Actions";
import moment from "moment";

const StyledRow = styled(Row)`
    margin-bottom: 15px;
`

const ClosedCustomsDetail = ({match}) => {
    const {id} = useParams()

    const [data, setData] = useState({})

    useEffect(() => {
        baseApi.get(`api-customs/customs/${id}/`)
            .then((res) => {
                setData(res.data);
            })
            .catch(error => {
                NotificationManager.warning(error.response.request.response)
            });
    }, [id])



    return (
        <div className="map-wrapper">
            <PageTitleBar title="Данные о закрытой заявке" match={match} />
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
            </RctCollapsibleCard>
        </div>
    )
}
export default connect(null, {
    editCustomsDetail
})(ClosedCustomsDetail);
