import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  FormControl,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ReactComponent as RecordIcon } from "../../assets/record.svg";

import "./home.css";
const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [note, setNote] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const fullNote = `Introducing ASSIS: Your Voice-to-Note Companion

    In today's fast-paced world, keeping up with meetings, lectures, and other important events can be challenging. That's where ASSIS steps in to simplify your life. ASSIS is a state-of-the-art, cross-platform application designed specifically to transform your spoken words into organized, easy-to-understand text notes.
    
    What Makes ASSIS Stand Out?
    
    Real-time Transcription: Whether you're in a boardroom or a lecture hall, ASSIS captures every word, turning lengthy speeches or discussions into concise and comprehensible notes.
    
    Cross-platform Capability: No matter your device or operating system, ASSIS ensures you can take your notes with you everywhere. Be it your smartphone, tablet, or desktop, our software seamlessly integrates into your lifestyle.
    
    Tailored for Education and Business: Whether you're a student keen on capturing every detail of a lecture or a business professional needing accurate minutes of meetings, ASSIS is tailored to fit your requirements.
    
    Enhanced Organization: Beyond mere transcription, ASSIS structures your notes, ensuring they're not just blocks of text but organized pieces of information. With intuitive headers, bullet points, and categorization, finding specific details has never been easier.
    
    Edit and Share: Once transcribed, you have the flexibility to edit your notes, making additions or trimming redundancies. Furthermore, with just a few clicks, share them with your peers, colleagues, or friends.
    
    In essence, ASSIS isn't just another transcription tool—it's a revolution in the way we perceive and capture spoken information. By bridging the gap between the spoken and written word, ASSIS ensures you never miss a beat, making your informational intake more efficient and effective.
    
    Join us on this journey of seamless transcription and discover a new way to keep track of your academic and professional endeavors. With ASSIS, you're always a step ahead.`;

  let interval: ReturnType<typeof setInterval>;
  const currentWordIndex = useRef(0);
  useEffect(() => {
    let textInterval: ReturnType<typeof setInterval> | null = null;

    const updateNote = () => {
      if (currentWordIndex.current < fullNote.split(" ").length) {
        setNote(
          (prevNote) =>
            `${prevNote} ${fullNote.split(" ")[currentWordIndex.current]}`
        );
        currentWordIndex.current += 1;
        textInterval = setTimeout(updateNote, Math.random() * 2000);
      }
    };

    if (isRecording) {
      // 更新录音时间
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);

      // 开始更新转录文本
      updateNote();
    }

    return () => {
      clearInterval(interval);
      if (textInterval)
        clearTimeout(textInterval as ReturnType<typeof setTimeout>);
    };
  }, [isRecording]);

  const handleRecord = () => {
    setIsRecording(true);
    setShowActions(false);
    currentWordIndex.current = 0; // Reset the index when starting a new recording
    setNote(""); // Clear the note
  };

  const handlePauseContinue = () => {
    setIsRecording(!isRecording);
  };

  const handleStop = () => {
    setIsRecording(false);
    setRecordingTime(0);
    setShowActions(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {!loggedIn ? (
            <>
              <Card className="mb-4 shadow">
                <Card.Header className="bg-primary text-white">
                  Login
                </Card.Header>
                <Card.Body>
                  <Card.Title>Welcome to Assis!</Card.Title>
                  <Card.Text>Please log in to continue.</Card.Text>
                </Card.Body>
              </Card>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    className="mb-3"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="mb-4"
                  />
                  <NavLink to="/forgot-password" className="text-muted">
                    Forgot password?
                  </NavLink>
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => setLoggedIn(true)}
                  className="mt-3 w-100"
                >
                  Submit
                </Button>
              </Form>
              <div className="mt-4 text-center">
                New to Assis? <NavLink to="/register">Register Now</NavLink>
              </div>
            </>
          ) : (
            <div className="text-center mt-5">
              <div className="text-center">
                <RecordIcon className="record-button" onClick={handleRecord} />
                {/* ... other components ... */}
              </div>
              <div className="mt-3">{formatTime(recordingTime)}</div>
              <Button
                variant="warning"
                className="mt-4 m-3"
                onClick={handlePauseContinue}
              >
                {isRecording ? "Pause" : "Continue"}
              </Button>
              <Button
                variant="dark"
                className="mt-4 m-3 ml-2"
                onClick={handleStop}
              >
                Stop
              </Button>
              <FormControl
                as="textarea"
                value={note}
                readOnly
                className="mb-3 large-textbox"
              />
              {showActions && (
                <div className="d-flex justify-content-between">
                  <Button variant="success">Save</Button>
                  <Button variant="danger">Discard</Button>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
