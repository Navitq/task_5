import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Table } from "react-bootstrap";

export function UserTable(props) {
    const { t, i18n } = useTranslation();

    return (
        <Container  style={{ overflow: "auto" }}>
            <Table
                striped
                bordered
                hover
                size="sm"
               
            >
                <thead>
                    <tr>
                        <th>{props.t("main.index")}</th>
                        <th>{props.t("main.id")}</th>
                        <th>{props.t("main.fullName")}</th>
                        <th>{props.t("main.address")}</th>
                        <th>{props.t("main.telephone")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}
