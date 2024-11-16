"use client";

import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { isMobileDevice } from "@/lib/client-response";

export default function WordCounter() {
  const initialValue = "WebToolsEasy is awesome. Explore free web tools.";
  const [text, setText] = useState(initialValue);

  const isMobileView = isMobileDevice();

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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
        <div className="row-display inner-flex-gap">
          <Typography variant="body1" color="textSecondary">
            Total Words:
          </Typography>
          <Typography variant="body1" color="secondary" fontWeight="bold">
            {text.split(/\s+/).filter((word) => word !== "").length}
          </Typography>
        </div>
        <div className="row-display inner-flex-gap">
          <Typography variant="body1" color="textSecondary">
            Total Characters:
          </Typography>
          <Typography variant="body1" color="secondary" fontWeight="bold">
            {text.length}
          </Typography>
        </div>
        <div className="row-display inner-flex-gap">
          <Typography variant="body1" color="textSecondary">
            Total Sentences:
          </Typography>
          <Typography variant="body1" color="secondary" fontWeight="bold">
            {
              text.split(".").filter((sentence) => sentence.trim() !== "")
                .length
            }
          </Typography>
        </div>
      </div>
    </div>
  );
}
