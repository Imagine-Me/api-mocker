import React, { useReducer } from "react";
import { Grid, Select, TextField, Button, MenuItem } from "@mui/material";
import { styled } from "@mui/material";

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

const requestValues = {
  GET: null,
  POST: null,
  PUT: null,
  PATCH: null,
  DELETE: null,
};

interface StateProps {
  request: keyof typeof requestValues;
}

const initialValue = {
  request: "GET",
  url: "",
} as StateProps;

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case "URL": {
      return {
        ...state,
        url: action.payload,
      };
    }
    case "REQUEST": {
      return {
        ...state,
        request: action.payload,
      };
    }
  }
  return state;
};

export default function UrlForm() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const onSave = () => {};
  return (
    <Grid container>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={2}>
            <SelectStyled
              value={state.request}
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
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <ButtonStyled onClick={onSave}>Save</ButtonStyled>
      </Grid>
    </Grid>
  );
}
