import Lottie from 'lottie-react';
import NoDataFound from '../noDataFound.json';

const DataNotFound = () => {
    return (
        <Lottie className="w-[25%] mx-auto" animationData={NoDataFound}/>
    );
};

export default DataNotFound;