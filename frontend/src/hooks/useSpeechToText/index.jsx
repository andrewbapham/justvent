import React, { useState, useRef, useEffect } from "react";

const useSpeechToText = (options) => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recogRef = useRef();

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Web speech API is not supported");
      return;
    }

    recogRef.current = new window.webkitSpeechRecognition();
    const recognition = recogRef.current;
    recognition.interimResults = options.interimResults || true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;

    if ("webkitSpeechGrammarList" in window) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punc> = . | ! | ? | ; | : ;";
      const speechRecogList = new window.webkitSpeechGrammarList();
      speechRecogList.addFromString(grammar, 1);
      recognition.grammars = speechRecogList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setTranscript("");
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startRecording = () => {
    if (recogRef.current && !isRecording) {
      recogRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recogRef.current && isRecording) {
      recogRef.current.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
  };
};

export default useSpeechToText;
