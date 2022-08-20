import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationErrors() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('Should not see this'))
            .catch(errors => setValidationErrors(errors));
    }

    return (
        <Container>
            <Typography gutterBottom variant='h2'>Errors for testing</Typography>
            <ButtonGroup fullWidth>
                <Button
                    variant='contained'
                    onClick={() => agent.TestErrors.get400Error().catch(e => console.log(e))}>
                    Test 400 Error
                </Button>
                <Button
                    variant='contained'
                    onClick={() => agent.TestErrors.get401Error().catch(e => console.log(e))}>
                    Test 401 Error
                </Button>
                <Button
                    variant='contained'
                    onClick={() => agent.TestErrors.get404Error().catch(e => console.log(e))}>
                    Test 404 Error
                </Button>
                <Button
                    variant='contained'
                    onClick={() => agent.TestErrors.get500Error().catch(e => console.log(e))}>
                    Test 500 Error
                </Button>
                <Button
                    variant='contained'
                    onClick={getValidationErrors}>
                    Test Validation Error
                </Button>
            </ButtonGroup>
            { validationErrors.length > 0 &&
                <Alert severity='error'>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>

    )
}