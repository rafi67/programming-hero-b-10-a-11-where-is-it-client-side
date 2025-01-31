import Lottie from 'lottie-react';
import pageNotFound from '../pageNotFound.json';

const PageNotFound = () => {

    return (
        <div className='mx-auto'>
            <Lottie className='w-screen h-screen' animationData={pageNotFound}/>
        </div>
    );
};

export default PageNotFound;