import Carousel from 'react-material-ui-carousel'
import ProductCarouselPaper from "./ProductCarouselPaper.tsx";
import {Container} from "@mui/material";
import {ProductDto} from "../../data/Shop.Type.ts";

type Props = {
    productDtoList: ProductDto[]
}

export default function ProductCarousel(productDtoList: Props){

    return (
        <Container sx={{boxShadow: "none !important", borderRadius: 1, py: 2, mb: 4}}>
            <Carousel height={500}>
                {
                    productDtoList.productDtoList.map( (item) => <ProductCarouselPaper key={item.pid + item.name} pid={item.pid} img_url={item.image_url} name={item.name}/>).filter((item, index)=>{
                        return item
                            ?  index < 5
                            :  false
                    })
                }
            </Carousel>
        </Container>
    )
}

