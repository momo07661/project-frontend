import React, { useState } from 'react';
import {Box, Card, CardActionArea, CardMedia, useMediaQuery} from '@mui/material';
import { styled } from '@mui/system';

// Define styles for the magnifier container
const ProductDetailMagnifier = styled(Box)({
    position: 'relative',
    display: 'flex', // Ensure flex layout for positioning
    '&:hover $magnifier': {
        display: 'flex',
    },
});


const ProductDetailMag = ({ imageSrc }: { imageSrc: string }) => {
    const [showMagnifier, setShowMagnifier] = useState(false);

    const isWideScreen = useMediaQuery('(min-width:900px)');

    const magnifierPositionQuery: () => { left: number, top: number, width: number, height: number } = () => {
        return isWideScreen
            ? { left: 400, top: 0, width: 380, height: 380 }
            : { left: 0, top: 300, width: 300, height: 300 };
    };

    // Define styles for the magnifier
    const Magnifier = styled(Box)({
        position: 'absolute',
        border: '1px solid #ccc',
        backgroundSize: '300% 300%',
        backgroundRepeat: 'no-repeat',
        zIndex: 9999,
        ...magnifierPositionQuery(),
    });

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
                <Card sx={{ maxWidth: '100%'}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={imageSrc}
                            alt="Product Image"
                            onMouseMove={handleMouseMove}
                        />
                    </CardActionArea>

                </Card>
                <Magnifier className={"magnifier"} id="magnifier" style={{ display: showMagnifier ? 'block' : 'none', backgroundImage: `url(${imageSrc})`}} />
        </ProductDetailMagnifier>
    );
};

export default ProductDetailMag;
