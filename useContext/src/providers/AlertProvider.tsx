import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  SyntheticEvent,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

interface AlertContextType {
  showAlert: (message: string, severity?: AlertColor) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

interface AlertState {
  message: string;
  severity: AlertColor;
  open: boolean;
}

type ShowAlert = (message: string, severity?: AlertColor) => void;

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState>({
    message: "",
    severity: "info",
    open: false,
  });

  const showAlert = useCallback(
    (message: string, severity: AlertColor = "info") => {
      setAlert({ message, severity, open: true });
    },
    []
  );

  const handleClose = (_event: Event | SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = (): ShowAlert => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context.showAlert;
};
