import * as React from "react";
import Card from "react-bootstrap/Card";
import "./CenterCard.css";
import { HDate } from "@hebcal/core";
import { INoTachanun } from "../tachanun/tachanun";
import { GDateSelector } from "./GDateSelector";
import { HDateSelector } from "./HDateSelector";

interface IProps {
    gDate: Date;
    setGDate: (gDate: Date) => void;
    hDate: HDate;
    setHDate: (hDate: HDate) => void;
    noTachanunResult: INoTachanun | undefined;
}

export const CenterCard: React.FC<IProps> = ({
    gDate,
    setGDate,
    hDate,
    setHDate,
    noTachanunResult,
}) => {
    return (
        <div className="centerCard">
            <Card>
                <Card.Body>
                    <p>
                        Today's Gregorian Date:{" "}
                        {gDate.toISOString().slice(0, 10)}{" "}
                        {noTachanunResult && (
                            <span style={{ float: "right" }}>
                                <a
                                    href={`http://www.sefaria.org/${noTachanunResult.source}`}
                                    target="_blank">
                                    מהיכא תיתי
                                </a>
                            </span>
                        )}
                    </p>
                    <p>
                        Today's Hebrew Date: {hDate.render()} /{" "}
                        {hDate.renderGematriya(true)}
                    </p>
                    {noTachanunResult && (
                        <p>
                            No tachnun{" "}
                            {noTachanunResult.mincha
                                ? "at mincha because tomorrow"
                                : "today"}{" "}
                            because {hDate.render()} is{" "}
                            {noTachanunResult.description}.
                        </p>
                    )}
                    <p>Pick another date:</p>
                    <GDateSelector date={gDate} setDate={setGDate} />
                    <HDateSelector date={hDate} setDate={setHDate} />
                </Card.Body>
            </Card>
        </div>
    );
};
