"use client";

import { TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function WordCounter() {
  const initialValue = "WebToolsEasy is awesome. Explore free web tools.";
  const [text, setText] = useState(initialValue);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="primary">
        Text (Paste Your Text Here)
      </Typography>
      <TextField multiline rows={5} onChange={onTextChange} value={text} />
      <div className="flex flex-col md:flex-row gap-2 w-full justify-center">
        <div className="flex flex-row gap-2">
          <Typography variant="body1" color="textSecondary">
            Total Words:
          </Typography>
          <Typography variant="body1" color="secondary" fontWeight="bold">
            {text.split(/\s+/).filter((word) => word !== "").length}
          </Typography>
        </div>
        <div className="flex flex-row gap-2">
          <Typography variant="body1" color="textSecondary">
            Total Characters:
          </Typography>
          <Typography variant="body1" color="secondary" fontWeight="bold">
            {text.length}
          </Typography>
        </div>
        <div className="flex flex-row gap-2">
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
