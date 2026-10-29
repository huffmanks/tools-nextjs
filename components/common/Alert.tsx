import { forwardRef } from "react";

import MuiAlert, { type AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default Alert;
