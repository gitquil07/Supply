import {useParams} from "react-router-dom";

const TrackingDetail = () => {
    const {id} = useParams();

    return (
        <>
            Tracking Detail {id}
        </>
    );
}

export default TrackingDetail;