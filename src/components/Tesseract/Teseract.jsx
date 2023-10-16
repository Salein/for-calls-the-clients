import React, { useState } from 'react';
import Tesseract from 'tesseract.js';


const Teseract = () => {

    const [selectedImage, setSelectedImage] = useState(null)

    const handleChangeImage = e => {
        setSelectedImage(e.target.files[0])
    }

    return (
        <div>
            <select id='langs'>
                <option value='rus'>Русский</option>
                <option value='eng'>English</option>
            </select>

            <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />

            <button type="button" id='start'>Начать обработку</button>

            <div id='log'>
                {selectedImage && (
                    <div>
                        <img src={URL.createObjectURL(selectedImage)} alt='thumb' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Teseract;