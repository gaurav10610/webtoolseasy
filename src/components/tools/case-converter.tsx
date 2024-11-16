"use client";

import { TextField, Typography } from "@mui/material";
import { ButtonWithHandler } from "../lib/buttons";
import { useState } from "react";
import { isMobileDevice } from "@/lib/client-response";

export default function CaseConverter() {
  const initialValue = "WebToolsEasy is Awesome. Explore Free Web Tools.";
  const [text, setText] = useState(initialValue);

  const isMobileView = isMobileDevice();

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const convertToUppercase = () => {
    setText(text.toUpperCase());
  };

  const convertToLowercase = () => {
    setText(text.toLowerCase());
  };

  const convertToSentenceCase = () => {
    setText(
      text
        .split(". ")
        .map((sentence) => {
          return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        })
        .join(". ")
    );
  };

  const convertToTitleCase = () => {
    setText(
      text
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ")
    );
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div className="column-display base-flex-gap">
      <Typography variant="body1" color="primary">
        Text (Paste Your Text Here)
      </Typography>
      <TextField multiline rows={5} onChange={onTextChange} value={text} />
      <div
        className="row-display flex-hz-center w-full inner-flex-gap"
        style={{
          flexDirection: isMobileView ? "column" : "row",
        }}
      >
        <ButtonWithHandler
          buttonText="Convert to Uppercase"
          variant="outlined"
          size="small"
          onClick={convertToUppercase}
        />
        <ButtonWithHandler
          buttonText="Convert to Lowercase"
          variant="outlined"
          size="small"
          onClick={convertToLowercase}
        />
        <ButtonWithHandler
          buttonText="Convert to Sentence Case"
          variant="outlined"
          size="small"
          onClick={convertToSentenceCase}
        />
        <ButtonWithHandler
          buttonText="Convert to Title Case"
          variant="outlined"
          size="small"
          onClick={convertToTitleCase}
        />
        <ButtonWithHandler
          buttonText="Clear Text"
          variant="contained"
          size="small"
          onClick={clearText}
          color="error"
        />
      </div>
    </div>
  );
}
