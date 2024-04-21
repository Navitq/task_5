import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import MainPage from "./components/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
    <Container>
        <MainPage></MainPage>
    </Container>
    );
}

export default  function WrappedApp(){
    return (
        <Suspense fallback="...loading">
            <App></App>
        </Suspense>
    )
}


