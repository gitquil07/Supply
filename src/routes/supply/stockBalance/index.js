import { Helmet } from "react-helmet";
import { useTitle } from "hooks";
import { BulkUpload } from "components/BulkUpload";
import { GET_STOCK_BALANCE_TEMPLATE, CREATE_STOCK_BALANCE_FILE } from "./gql";


const StockBalance = () => {

    const title = useTitle("Остатки на складе");

    return (
        <>
            <Helmet title={title}/>
            <BulkUpload 
                keyName="stockBalanceTemplate"
                message="Данные"
                query={GET_STOCK_BALANCE_TEMPLATE} 
                mutation={CREATE_STOCK_BALANCE_FILE} />
        </>
    );

}

export default StockBalance;

