import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardMedia} from '@mui/material';
import { styled } from '@mui/system';

// Define styles for the magnifier container
const ProductDetailMagnifier = styled(Box)({
    position: 'relative',
    '&:hover $magnifier': {
        display: 'block',
    },
});

// Define styles for the magnifier
const Magnifier = styled(Box)({
    position: 'absolute',
    width: 400,
    height: 400,
    border: '1px solid #ccc',
    backgroundSize: '700% 700%',
    backgroundRepeat: 'no-repeat',
});

const ProductDetailMag = ({ imageSrc }: { imageSrc: string }) => {
    const [showMagnifier, setShowMagnifier] = useState(false);

    const handleMouseEnter = () => {
        setShowMagnifier(true);
    };

    const handleMouseLeave = () => {
        setShowMagnifier(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const containerRect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        const bgPosX = (mouseX / containerRect.width) * 100;
        const bgPosY = (mouseY / containerRect.height) * 100;

        // Update magnifier background position
        const magnifier = document.getElementById('magnifier');
        if (magnifier) {
            magnifier.style.backgroundPosition = `${bgPosX}0% ${bgPosY}0%`;
        }
    };

    return (
        <ProductDetailMagnifier onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Card sx={{ maxWidth: '100%', display:"flex"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={imageSrc}
                            alt="Product Image"
                            onMouseMove={handleMouseMove}
                        />
                    </CardActionArea>

                </Card>
                <Magnifier className="magnifier" id="magnifier" style={{ display: showMagnifier ? 'block' : 'none', backgroundImage: `url(${imageSrc})` }} />
        </ProductDetailMagnifier>
    );
};

export default ProductDetailMag;
