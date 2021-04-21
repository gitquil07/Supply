import { useParams } from "react-router-dom";

const TrackingEdit = () => {
    const {id} = useParams();

    return (
        <>
            Tracking Edit {id}
        </>
    );
}

export default TrackingEdit;