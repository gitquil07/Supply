import { useState } from "react";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";

const FactoryCreate = ({ isOpen, close }) => {
    return (
        <SmallDialog title="Создать Заводы" isOpen={isOpen} close={close}>
            <CustomInput label="Название завода" />
            <CustomSelector label="Страна" />
            <CustomSelector label="Город" />
        </SmallDialog>
    );
};

export default FactoryCreate;