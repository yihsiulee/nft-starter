import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import MDEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { FormContext } from "../Form";

const StepBox = styled(Box)``;
const FieldCard = styled(Card)`
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const mdParser = new MarkdownIt();

export default function (): JSX.Element {
  const [form, setForm] = useContext(FormContext);

  const [bannerImageName, setBannerImageName] = useState<string>("");

  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        STEP 4
      </Typography>
      <Typography variant="h4" gutterBottom>
        Sale Website Settings
      </Typography>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sale Website
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The URL of your sale.
          </Typography>
          <TextField
            label="URL of your sale *"
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">.nftstarter.one</InputAdornment>
              ),
            }}
            value={form.saleWebsite}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                saleWebsite: evt.target.value || "",
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Banner
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The image is used as banner.
          </Typography>
          <TextField
            label="Enter Collection Image *"
            variant="standard"
            fullWidth
            disabled
            value={bannerImageName}
            InputProps={{
              endAdornment: (
                <label htmlFor="banner-img">
                  <input
                    id="banner-img"
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(evt) => {
                      if (evt.target.files?.[0])
                        setBannerImageName(evt.target.files?.[0].name);
                    }}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              ),
            }}
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sale Introduction
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            This shows in the sale page, you can use Markdown syntax.
          </Typography>
          <MDEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            value={form.introduction}
            onChange={({ text }) =>
              setForm((prev) => ({
                ...prev,
                introduction: text,
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Preview Website
          </Typography>
          <Button variant="contained">Preview Sale Website</Button>
        </CardContent>
      </FieldCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              step: form.saleMode === "whitelist" ? 5 : 6,
            }))
          }
        >
          Deploy
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setForm((prev) => ({ ...prev, step: 3 }))}
        >
          Back
        </Button>
      </Box>
    </StepBox>
  );
}
