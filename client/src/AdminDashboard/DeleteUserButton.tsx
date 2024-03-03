import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { deleteUser } from './api.tsx';
import LoadingButton from '../components/buttons/LoadingButton.tsx';
import ConfirmationModal from '../components/ConfirmationModal.tsx';
import AlertType from '../util/types/alert.ts';
import useAlert from '../util/hooks/useAlert.tsx';

interface DeleteUserButtonProps {
  admin: boolean;
  email: string;
  removeRow: (user: string) => void;
}

/**
 * The button component which, when clicked, will delete the user from the database.
 * If the user is an admin, the button will be unclickable.
 * @param admin - whether the user is an admin
 * @param email - the email of the user to delete
 * @param removeRow - a function which removes a row from the user table. This
 * function is called upon successfully deletion of user from the database.
 */
function DeleteUserButton({ admin, email, removeRow }: DeleteUserButtonProps) {
  const { setAlert } = useAlert();
  const [isLoading, setLoading] = useState(false);
  async function handleDelete() {
    setLoading(true);
    if (await deleteUser(email)) {
      removeRow(email);
      setAlert(`User ${email} has been deleted.`, AlertType.SUCCESS);
    } else {
      setLoading(false);
    }
  }
  if (isLoading) {
    return <LoadingButton />;
  }
  if (!admin) {
    return (
      <ConfirmationModal
        buttonText="Remove User"
        title="Are you sure you want to remove this user?"
        body="This action is permanent. User information will not be able to be recovered."
        onConfirm={() => handleDelete()}
      />
    );
  }
  return (
    <Button variant="outlined" disabled>
      User is Admin
    </Button>
  );
}

export default DeleteUserButton;
