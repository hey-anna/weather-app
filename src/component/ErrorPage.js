import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ErrorPage({ message }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oops, there was a problem!</Alert.Heading>
        <p>
          {message}
          {/* Failed to fetch weather information. Please try again later. Check
          your internet connection or try selecting a different city. If the
          problem persists, please contact support. */}
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Re Tty!</Button>;
}

export default ErrorPage;
