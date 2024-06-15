import { useState, useEffect, forwardRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//Alert was used for the styling of the success alert
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = ({error}) => {
  //changing vertical and horizontal attributes affects where snackbar shows up
  // (vertical: top, center, bottom; horizontal: left, right)
  const [state, setState] = useState({
    open: true,
    vertical: "top",
    horizontal: "left",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const {name, message} = error
  console.log(name);
  console.log(message);
  return (
    <>
      <Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {`${name} error! ${message}`}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
