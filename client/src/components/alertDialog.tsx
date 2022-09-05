import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';

/**
 * The prop to pass into an {@link AlertDialog}
 * @param showAlert Whether the alert should be shown or not
 * @param title The title of the alert
 * @param message The message on the alert
 * @param onClose A function to handle behavior on the closing of the popup
 */
interface AlertDialogProps {
  showAlert: boolean;
  title: string;
  message: string;
  onClose: () => void;
}
/**
 * A pop up {@link Dialog} for showing alerts (can be errors or just urgert info)
 * @param alertDialogProps The {@link AlertDialogProps} to provide information
 * about the alert and how to handle it being closed.
 * @returns The {@link Dialog} component to be used
 */
function AlertDialog({ showAlert, title, message, onClose }: AlertDialogProps) {
  return (
    <Dialog
      open={showAlert}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '400px',
          },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
