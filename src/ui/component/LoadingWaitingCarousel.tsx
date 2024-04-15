import yuRuWaitGif from "../../assets/yuRuWait.gif";
import "./loadingStyle.css"
import {Container, } from "@mui/material";
import {LoadingWaitingProductCard} from "./LoadingWaitingProductCard.tsx";

export const LoadingWaitingCarousel = () => {
    return (
        <>
        <Container sx={{boxShadow: 0, borderRadius: 1, py: 2, mb: 4, height: 500, backgroundColor: "transparrent", }}>
            <div className={"img-container"}>
                <div style={{display: "flex"}}>
                    <h2 className={"L-fade"}>L</h2>
                    <h2 className={"O-fade"}>o</h2>
                    <h2 className={"A-fade"}>a</h2>
                    <h2 className={"D-fade"}>d</h2>
                    <h2 className={"I-fade"}>i</h2>
                    <h2 className={"N-fade"}>n</h2>
                    <h2 className={"G-fade"}>g</h2>
                    <h2 className={"G1-fade"}>.</h2>
                    <h2 className={"G2-fade"}>.</h2>
                    <h2 className={"G3-fade"}>.</h2>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginBottom: "4px"}}>
                <img src={yuRuWaitGif} alt={"Loading Data"} className={"img-fade fade"} height={400} />
                </div>
            </div>
        </Container>
            <LoadingWaitingProductCard/>
        </>
    )
}