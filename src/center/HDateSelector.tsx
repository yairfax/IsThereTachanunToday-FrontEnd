import { HDate } from "@hebcal/core";
import * as React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { range } from "lodash";
import { getMonthName, monthsInYear } from "@hebcal/hdate";

interface IProps {
    date: HDate;
    setDate: (hDate: HDate) => void;
}

export const HDateSelector: React.FC<IProps> = ({ date, setDate }) => {
    const [enteredDate, setEnteredDate] = React.useState(date.getDate());
    const handleEnteredDate = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredDate(parseInt(e.currentTarget.value, 10)),
        [],
    );

    const [enteredMonth, setEnteredMonth] = React.useState(date.getMonthName());
    const handleEnteredMonth = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>
            setEnteredMonth(e.currentTarget.value),
        [],
    );

    const [enteredYear, setEnteredYear] = React.useState(date.getFullYear());
    const handleEnteredYear = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredYear(parseInt(e.currentTarget.value, 10)),
        [],
    );

    React.useEffect(() => {
        setEnteredDate(date.getDate());
        setEnteredMonth(date.getMonthName());
        setEnteredYear(date.getFullYear());
    }, [date]);

    const enteredHDate = React.useMemo(
        (): HDate => new HDate(enteredDate, enteredMonth, enteredYear),
        [enteredDate, enteredMonth, enteredYear],
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

    return (
        <Container style={{ padding: "10px" }}>
            <Form>
                <Row class="align-items-center">
                    <Form.Group className="col-md-2">
                        <FormControl
                            type="number"
                            required
                            value={enteredDate}
                            onChange={handleEnteredDate}></FormControl>
                    </Form.Group>
                    <Form.Group className="col-md-3">
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
                    <Form.Group className="col-auto">
                        <FormControl
                            type="number"
                            required
                            value={enteredYear}
                            onChange={handleEnteredYear}></FormControl>
                    </Form.Group>
                    <Form.Group className="col-auto">
                        <Button className="btn-primary" onClick={handleSubmit}>
                            Go!
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    );
};
