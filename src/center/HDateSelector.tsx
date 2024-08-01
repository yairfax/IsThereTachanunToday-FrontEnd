import { HDate } from "@hebcal/core";
import * as React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import { range } from "lodash";
import { getMonthName, monthsInYear } from "@hebcal/hdate";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

interface IProps {
    date: HDate;
    setDate: (hDate: HDate) => void;
}

export const HDateSelector: React.FC<IProps> = ({ date, setDate }) => {
    const [enteredDate, setEnteredDate] = React.useState(date.getDate());
    const [enteredMonth, setEnteredMonth] = React.useState(date.getMonthName());
    const [enteredYear, setEnteredYear] = React.useState(date.getFullYear());

    React.useEffect(() => {
        setEnteredDate(date.getDate());
        setEnteredMonth(date.getMonthName());
        setEnteredYear(date.getFullYear());
    }, [date]);

    const enteredHDate = React.useMemo(
        (): HDate => new HDate(enteredDate, enteredMonth, enteredYear),
        [enteredDate, enteredMonth, enteredYear],
    );

    const handleEnteredDate = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const date = parseInt(e.currentTarget.value, 10);
            date > 0 &&
                date <= enteredHDate.daysInMonth() &&
                setEnteredDate(date);
        },
        [enteredHDate],
    );

    const handleEnteredMonth = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>
            setEnteredMonth(e.currentTarget.value),
        [],
    );

    const handleEnteredYear = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const year = parseInt(e.currentTarget.value, 10);
            year > 0 && setEnteredYear(year);
        },
        [],
    );

    const handleSubmit = React.useCallback(
        () => setDate(enteredHDate),
        [enteredHDate, setDate],
    );

    const possibleMonths = React.useMemo((): string[] => {
        return range(1, monthsInYear(enteredYear) + 1).map(i =>
            getMonthName(i, enteredYear),
        );
    }, [enteredYear]);

    const popover = React.useMemo(() => {
        return (
            <Popover id="popover-hdate">
                <Popover.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Form.Group as={Col}>
                                    <FormControl
                                        type="number"
                                        required
                                        value={enteredDate}
                                        onChange={
                                            handleEnteredDate
                                        }></FormControl>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Select
                                        required
                                        value={enteredMonth}
                                        onChange={handleEnteredMonth}>
                                        {possibleMonths.map((m, i) => (
                                            <option value={m} key={i}>
                                                {m}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <FormControl
                                        type="number"
                                        required
                                        value={enteredYear}
                                        onChange={
                                            handleEnteredYear
                                        }></FormControl>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Container>
                </Popover.Body>
            </Popover>
        );
    }, [
        enteredDate,
        enteredMonth,
        enteredYear,
        handleEnteredDate,
        handleEnteredMonth,
        handleEnteredYear,
        possibleMonths,
    ]);

    return (
        <Container style={{ paddingTop: "10px" }}>
            <Form>
                <Row style={{ width: "100%" }}>
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={popover}>
                        <Form.Group xs as={Col}>
                            <FormControl
                                type="text"
                                required
                                value={date.render()}
                                onChange={handleEnteredYear}></FormControl>
                        </Form.Group>
                    </OverlayTrigger>

                    <Form.Group xs={2} as={Col}>
                        <Button className="btn-primary" onClick={handleSubmit}>
                            Go!
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    );
};
