import Carousel from 'react-material-ui-carousel'
import ProductCarouselPaper from "./ProductCarouselPaper.tsx";
import {Box, useMediaQuery} from "@mui/material";

// type Props = {
    // productDtoList: ProductDto[]
// }

const imgList = [
    "https://cms.cdn.91app.com/images/compress/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1712651347-v5ty6oms0o_m_1920x800.webp",
    "https://cms.cdn.91app.com/images/compress/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1708332985-z6eyx8zrih_m_1920x800.webp",
    "https://cms.cdn.91app.com/images/compress/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1704676079-nyo4ia1epx_m_1920x775.webp",
    "https://cms.cdn.91app.com/images/compress/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1706167093-69cdnz354r_m_1920x800.webp",
    "https://cms.cdn.91app.com/images/compress/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1706167081-y233yxjwi6_m_1920x800.webp",
]
export default function ProductCarousel(){
    const isExtraWideScreen = useMediaQuery('(min-width:1025px)');
    const isSmallerExtraWideScreen = useMediaQuery('(min-width:700px)');
    const isWideScreen = useMediaQuery('(min-width:500px)');

    const carouselHeight: () => number = () =>{
        return isExtraWideScreen
            ? 800
            : isSmallerExtraWideScreen
                ? 400
                : isWideScreen
                    ? 300
                    : 180
    }


    return (
        <Box sx={{boxShadow: "none !important", borderRadius: 1, pb: 2, mb: 2}}>


                <Carousel height={carouselHeight()}>
                    {
                        imgList.map( (item) => <ProductCarouselPaper key={item} img_url={item}/>)
                    }
                </Carousel>



        </Box>
    )
}

