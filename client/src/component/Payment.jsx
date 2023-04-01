import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const navigate = useNavigate();
  const [formPayment, setFormPayment] = useState({});

  const handleChange = (e) => {
    setFormPayment({
      ...formPayment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = new FormData();
      formData.set("status", formPayment.status);

      const response = await API.post("/transaction", config);
      console.log("success : ", response.data.data.token);
      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          console.log(result);
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed: ", error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col className="mt-5 pt-5" style={{ textAlign: "center" }}>
            <h1 className="mt-5 mb-4 text-white fw-bold">Premium</h1>
            <p className="text-white fs-5">
              Bayar Sekarang dan Nikmati streaming film-film yang kekinian dari{" "}
              <span className="fw-bold" style={{ color: "#E50914" }}>
                DUMBFLIX
              </span>
            </p>
            <p>
              <span className="fw-bold fs-5" style={{ color: "#E50914" }}>
                DUMBFLIX :{" "}
              </span>
              <span className="fw-bold text-white fs-5">0981119181</span>
            </p>
          </Col>
          <Row className="d-flex flex-column justify-content-center">
            <Col className="d-flex flex-column justify-content-center align-items-center mt-3">
              <Form.Control
                className="fs-6"
                name="status"
                onChange={handleChange}
                type="text"
                placeholder="Input Your Account Number"
                style={{
                  width: "400px",
                  backgroundColor: "#1F1F1F",
                  border: "2px solid #D2D2D2",
                  color: "#D2D2D2",
                }}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center mt-3">
              <Button
                onClick={() => handleSubmit.mutate()}
                className="btn btn-danger mt-3 fs-5"
                style={{ width: "400px", backgroundColor: "#E50914" }}
              >
                Pay
              </Button>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}
