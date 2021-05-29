import { Helmet } from "react-helmet";
import { useTitle } from "hooks";
import { BulkUpload } from "components/BulkUpload";
import { GET_STOCK_BALANCE_TEMPLATE } from "./gql";


const StockBalance = () => {

    const title = useTitle("Остатки на складе");

    return (
        <>
            <Helmet title={title}/>
            <BulkUpload query={GET_STOCK_BALANCE_TEMPLATE} key="stockBalanceTemplate" />
        </>
    );

}

export default StockBalance;

