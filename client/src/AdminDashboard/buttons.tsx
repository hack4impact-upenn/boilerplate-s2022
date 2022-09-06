import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { deleteUser, upgradePrivilege } from './api';
import LoadingButton from '../components/buttons/LoadingButton';
import ConfirmationModal from '../components/confirmationModel';

interface DeleteUserButtonProps {
  admin: boolean;
  email: string;
  // handleDelete: (setLoading: React.Dispatch<boolean>, email: string) => void;
  removeRow: (email: string) => void;
}

interface PromoteUserButtonProps {
  admin: boolean;
  email: string;
  updateAdmin: (email: string) => void;
}

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
      //   <Button variant="outlined" onClick={async () => handleDelete()}>
      //     Remove User
      //   </Button>
    );
  }
  return (
    <Button variant="outlined" disabled>
      User is Admin
    </Button>
  );
}

function PromoteUserButton({
  admin,
  email,
  updateAdmin,
}: PromoteUserButtonProps) {
  const [isLoading, setLoading] = useState(false);
  // const [isAdmin, setAdmin] = useState(admin);

  async function handlePromote() {
    setLoading(true);
    if (await upgradePrivilege(email)) {
      updateAdmin(email);
      // se
    }
    setLoading(false);
  }
  if (isLoading) {
    return <LoadingButton />;
  }
  if (!admin) {
    return (
      //   <Button variant="outlined" onClick={async () => handlePromote()}>
      //     Promote User
      //   </Button>
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
