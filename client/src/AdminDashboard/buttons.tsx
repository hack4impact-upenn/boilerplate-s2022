import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { deleteUser, upgradePrivilege } from './api';
import LoadingButton from '../components/buttons/LoadingButton';
import ConfirmationModal from '../components/ConfirmationModal';

interface DeleteUserButtonProps {
  admin: boolean;
  email: string;
  removeRow: (email: string) => void;
}

interface PromoteUserButtonProps {
  admin: boolean;
  email: string;
  updateAdmin: (email: string) => void;
}

/**
 * The button component which, when clicked, will delete the user from the database. If the user is an admin, the button will be unclickable.
 * @param admin - whether the user is an admin
 * @param email - the email of the user to delete
 * @param removeRow - a function which removes a row from the user table. This function is called upon successfully deletion of user from the database.
 */
function DeleteUserButton({ admin, email, removeRow }: DeleteUserButtonProps) {
  const [isLoading, setLoading] = useState(false);
  async function handleDelete() {
    setLoading(true);
    if (await deleteUser(email)) {
      removeRow(email);
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

/**
 * The button component which, when clicked, will promote a user to admin. If the user is already admin, the button will be unclickable.
 * @param admin - whether the user is an admin
 * @param email - the email of the user to promote
 * @param updatesAdmin - a function which updates whether the user is an admin on the frontend representation of the set of users. This function is called upon successfully deletion of user from the database.
 */
function PromoteUserButton({
  admin,
  email,
  updateAdmin,
}: PromoteUserButtonProps) {
  const [isLoading, setLoading] = useState(false);

  async function handlePromote() {
    setLoading(true);
    if (await upgradePrivilege(email)) {
      updateAdmin(email);
    }
    setLoading(false);
  }
  if (isLoading) {
    return <LoadingButton />;
  }
  if (!admin) {
    return (
      <ConfirmationModal
        buttonText="Promote User"
        title="Are you sure you want to promote this user to admin?"
        body="This action will give this user admin privileges"
        onConfirm={() => handlePromote()}
      />
    );
  }
  return (
    <Button variant="outlined" disabled>
      Already Admin
    </Button>
  );
}

export { DeleteUserButton, PromoteUserButton };
