import React, { useState } from "react";

import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

export function Region(props) {
    let [regionValue, setRegionValue] = useState("none");

    function changeRegion(event) {
        setRegionValue(event.target.value);
        window.location.reload()
        if (event.target.value != "none") {
            props.changeLanguage(event.target.value);
        }
    }

    return (
        <Container className="d-flex justify-content-center flex-column mb-4">
            <h2 className="h2 text-center my-3 mt-0">{props.t("main.regionHeader")}</h2>
            <Form.Select
                value={regionValue}
                onChange={changeRegion}
                aria-label="Default select example"
            >
                <option value="none">{props.t("main.regionOption")}</option>
                <option value="ru">{props.t("main.ru")}</option>
                <option value="pl">{props.t("main.pl")}</option>
                <option value="uk">{props.t("main.uk")}</option>
            </Form.Select>
        </Container>
    );
}
