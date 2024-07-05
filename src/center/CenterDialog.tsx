import * as React from "react";
import "./CenterDialog.css";
import { HDate } from "@hebcal/core";
import { Mode } from "../types";
import { noTachanun } from "../tachanun/tachanun";
import { CenterCard } from "./CenterCard";

interface IProps {
    hDate: HDate;
    setHDate: (hDate: HDate) => void;
    gDate: Date;
    setGDate: (gDate: Date) => void;
    mode: Mode;
}

export const CenterDialog: React.FC<IProps> = ({
    hDate,
    gDate,
    mode,
    setGDate,
    setHDate,
}) => {
    const result = React.useMemo(() => noTachanun(hDate, mode), [hDate, mode]);

    return (
        <div style={{ paddingTop: "2%" }} className="container">
            <h1 className="center">
                {result && !result.mincha
                    ? "No Tachanun today!"
                    : "There is Tachanun today."}
            </h1>
            {result?.subtitle && <h3 className="center">{result.subtitle}</h3>}
            <CenterCard
                gDate={gDate}
                hDate={hDate}
                noTachanunResult={result}
                setGDate={setGDate}
                setHDate={setHDate}
            />
        </div>
    );
};
