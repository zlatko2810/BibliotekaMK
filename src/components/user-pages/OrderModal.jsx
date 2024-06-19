import React, { useState } from 'react'

import PopupModal from '../common/PopupModal'
import BuyBookFirstStep from './BuyBookFirstStep';
import BuyBookSecondStep from './BuyBookSecondStep';


const OrderModal = ({ openOrderModal, setOpenOrderModal, currentProducts, userEmail }) => {
    
    const initialQuantities = currentProducts.reduce((acc, book) => {
        acc[book.id] = 1;
        return acc;
    }, {});

    const [activeStep, setActiveStep] = useState(1);
    const [quantities, setQuantities] = useState(initialQuantities);
    console.log(quantities);
    return (
        <PopupModal openModal={openOrderModal} modalTitle='Order Book(s)' handleClose={() => setOpenOrderModal(false)} >
            {activeStep === 1 ?
                <BuyBookFirstStep currentProducts={currentProducts} setActiveStep={setActiveStep} quantities={quantities} setQuantities={setQuantities} />
                : <BuyBookSecondStep setActiveStep={setActiveStep} quantities={quantities} userEmail={userEmail} />
            }
        </PopupModal>
    )
}

export default OrderModal