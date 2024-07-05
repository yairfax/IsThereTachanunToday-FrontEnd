import * as React from "react";
// import "./Navigator.css";
import { MODES, Mode } from "../types";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { compact } from "lodash";

interface IProps {
    currentMode: Mode;
    setMode(mode: Mode): void;
}

export const Navigator: React.FC<IProps> = ({ currentMode, setMode }) => {
    const navElements = React.useMemo(
        () =>
            compact(
                Object.entries(MODES).map(([mode, text]) =>
                    mode !== "pro" || currentMode === "pro" ? (
                        <Nav.Link
                            onClick={() => setMode(mode as Mode)}
                            className={
                                currentMode === mode ? "active" : undefined
                            }>
                            {text}
                        </Nav.Link>
                    ) : undefined,
                ),
            ),
        [currentMode, setMode],
    );

    return (
        <Navbar expand="sm" style={{ backgroundColor: "#efefef" }}>
            <Container>
                <Navbar.Brand>IsThereTachanunToday.com</Navbar.Brand>
                <Nav>{...navElements}</Nav>
            </Container>
        </Navbar>
    );
};
