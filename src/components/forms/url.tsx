import React from "react";
import { Grid, Select, TextField, Button, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { requestValues, StateProps } from "../../page/main";

const TextFieldStyled = styled(TextField)`
  .MuiOutlinedInput-root {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const SelectStyled = styled(Select)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ButtonStyled = styled(Button)`
  height: 100%;
  margin-left: 10px;
`;

interface UrlFormProps extends Partial<StateProps> {
  dispatch: React.Dispatch<any>;
  onSubmit: () => void;
}

export default function UrlForm(props: UrlFormProps) {
  const { request, url, dispatch, onSubmit } = props;

  return (
    <Grid container>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={2}>
            <SelectStyled
              value={request}
              onChange={(e) =>
                dispatch({ type: "REQUEST", payload: e.target.value })
              }
            >
              {Object.keys(requestValues).map((request, index) => (
                <MenuItem key={`request_select_${index}`} value={request}>
                  {request}
                </MenuItem>
              ))}
            </SelectStyled>
          </Grid>
          <Grid item xs={10}>
            <TextFieldStyled
              onChange={(e) =>
                dispatch({ type: "URL", payload: e.target.value })
              }
              placeholder="http://localhost:3000/api/:id"
              value={url}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <ButtonStyled onClick={onSubmit}>Save</ButtonStyled>
      </Grid>
    </Grid>
  );
}
