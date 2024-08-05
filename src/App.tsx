import * as React from "react";
import "./App.css";
import { Mode, stringIsMode } from "./types";
import { Navigator } from "./navbar/Navigator";
import { useSearchParams } from "react-router-dom";
import { Disclaimer } from "./Disclaimer";
import { CenterDialog } from "./center/CenterDialog";
import { HDate } from "@hebcal/core";
import { omit } from "lodash";

function App() {
    const [searchParams, setSearchParams] = useSearchParams();

    const mode = React.useMemo(() => {
        const embeddedMode = searchParams.get("mode");
        return stringIsMode(embeddedMode) ? embeddedMode : "chul";
    }, [searchParams]);

    const updateMode = React.useCallback(
        (mode: Mode) => {
            searchParams.delete("mode");
            searchParams.append("mode", mode);
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams],
    );

    const [gDate, hDate] = React.useMemo((): [Date, HDate] => {
        const embeddedGDate = searchParams.get("gDate");
        const embeddedHDate = searchParams.get("hDate");

        if (embeddedGDate) {
            const offset = new Date().getTimezoneOffset() / 60;
            const resolvedGDate = new Date(embeddedGDate);
            resolvedGDate.setHours(resolvedGDate.getHours() + offset);

            if (resolvedGDate.toString() != "Invalid Date") {
                return [resolvedGDate, new HDate(resolvedGDate)];
            }
        }

        if (embeddedHDate) {
            const [year, month, day] = embeddedHDate.split("-");
            if (year != null && month != null && day != null) {
                const resolvedHDate = new HDate(
                    parseInt(day, 10),
                    parseInt(month, 10),
                    parseInt(year, 10),
                );

                return [resolvedHDate.greg(), resolvedHDate];
            }
        }

        const resovledGDate = new Date();
        return [resovledGDate, new HDate(resovledGDate)];
    }, [searchParams]);

    const setHDate = React.useCallback(
        (hDate: HDate) => {
            searchParams.delete("gDate");
            searchParams.delete("hDate");
            searchParams.append(
                "hDate",
                `${hDate.getFullYear()}-${hDate.getMonth()}-${hDate.getDate()}`,
            );
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams],
    );

    const setGDate = React.useCallback(
        (gDate: Date) => {
            searchParams.delete("gDate");
            searchParams.delete("hDate");
            searchParams.append("gDate", gDate.toISOString().slice(0, 10));

            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams],
    );

    return (
        <>
            <Navigator setMode={updateMode} currentMode={mode} />
            <CenterDialog
                hDate={hDate}
                gDate={gDate}
                mode={mode}
                setGDate={setGDate}
                setHDate={setHDate}
            />
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
