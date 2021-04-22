import { useParams } from "react-router-dom";

const TrackingCreate = () => {
    const {id} = useParams();

    return (
        <>
            Tracking Create {id}
        </>
    );
}

export default TrackingCreate;