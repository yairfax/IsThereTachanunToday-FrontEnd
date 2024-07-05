import * as React from "react";
import "./App.css";
import { Mode, stringIsMode } from "./types";
import { Navigator } from "./navbar/Navigator";
import { useSearchParams } from "react-router-dom";
import { Disclaimer } from "./Disclaimer";

function App() {
    const [searchParams, setSearchParams] = useSearchParams();

    const embeddedMode = searchParams.get("mode");

    const [mode, setMode] = React.useState<Mode>(
        stringIsMode(embeddedMode) ? embeddedMode : "chul",
    );

    const updateMode = React.useCallback(
        (mode: Mode) => {
            setMode(mode);
            const newParams = {
                ...searchParams,
                mode,
            };
            setSearchParams(newParams);
        },
        [searchParams, setSearchParams],
    );

    return (
        <>
            <Navigator setMode={updateMode} currentMode={mode} />
            <p className="appFooter appFooterLeft">
                Created by{" "}
                <a href="https://www.github.com/yairfax" target="_blank">
                    Yair Fax
                </a>
            </p>
            <Disclaimer />
        </>
    );
}

export default App;
