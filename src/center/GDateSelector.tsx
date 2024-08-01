import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface IProps {
    date: Date;
    setDate: (date: Date) => void;
}

export const GDateSelector: React.FC<IProps> = ({ date, setDate }) => {
    const [enteredDate, updateEnteredDate] = React.useState(date);

    const handleUpdate = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateEnteredDate(new Date(e.currentTarget.value));
        },
        [],
    );

    const handleSubmit = React.useCallback(() => {
        setDate(enteredDate);
    }, [enteredDate, setDate]);

    React.useEffect(() => updateEnteredDate(date), [date]);

    return (
        <Container>
            <Form>
                <Row style={{ width: "100%" }}>
                    <Form.Group as={Col}>
                        <Form.Control
                            type="date"
                            value={enteredDate.toISOString().slice(0, 10)}
                            required
                            onChange={handleUpdate}
                        />
                    </Form.Group>
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
