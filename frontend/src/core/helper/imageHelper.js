import React from "react";

const ImageHelper = ({product}) => {
    const imgURL = product ? product.image
        : `https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png`

    return (
        <div className="rounded border border-success  p-2">
            <img src={imgURL}
                 style={{maxHeight: "100%", maxWidth: "100%"}}
                 className="mb-3 rounded"
                 alt=""
            />
        </div>
    )
}

export default ImageHelper