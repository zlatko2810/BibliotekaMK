import React, { useState } from 'react'

import PopupModal from '../common/PopupModal'
import BuyBookFirstStep from './BuyBookFirstStep'
import BuyBookSecondStep from './BuyBookSecondStep'

const BuyBookModal = ({ openBuyModal, setOpenBuyModal, bookImage, bookAuthor, bookCategory, bookDescription, bookTitle, bookPrice }) => {

    const [value, setValue] = useState(0);
    const [activeStep, setActiveStep] = useState(1);
    const [selectButton, setSelectButton] = useState(false)
    
    const handleChange = (event) => {
        setValue((event.target).value);
        if (selectButton) {
            setSelectButton(false)
        }
    };

    return (
        <PopupModal openModal={openBuyModal} modalTitle='Buy Book' handleClose={() => setOpenBuyModal(false)} >
            {activeStep === 1 ?
                <BuyBookFirstStep
                    bookImage={bookImage}
                    bookTitle={bookTitle}
                    bookDescription={bookDescription}
                    bookAuthor={bookAuthor}
                    bookCategory={bookCategory}
                    bookPrice={bookPrice}
                    value={value}
                    handleChange={handleChange}
                    setActiveStep={setActiveStep}
                    selectButton={selectButton}
                    setSelectButton={setSelectButton}
                /> :
                <BuyBookSecondStep setActiveStep={setActiveStep} />
            }
        </PopupModal>
    )
}

export default BuyBookModal