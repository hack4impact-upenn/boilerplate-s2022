import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useAlert from '../../util/hooks/useAlert.tsx';
import AlertType from '../../util/types/alert.ts';
import { postData } from '../../util/api.tsx';

function InviteUserButton() {
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setAlert } = useAlert();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = async () => {
    setLoading(true);
    postData('admin/invite', { emails }).then((res) => {
      if (res.error) {
        setError(res.error.message);
      } else {
        setAlert(`${emails} successfully invited!`, AlertType.SUCCESS);
        setOpen(false);
      }
      setLoading(false);
    });
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setEmails(event.target.value);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <Button variant="contained" onClick={handleClickOpen}>
        Invite User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Please enter one or more email addresses separated by commas. (ex.
            a@gmail.com, b@outlook.com)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Addresses"
            type="email"
            fullWidth
            variant="standard"
            onChange={updateEmail}
          />
          <DialogContentText sx={{ color: 'red' }}>{error}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleInvite}>
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InviteUserButton;
