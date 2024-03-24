import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { upgradePrivilege } from './api.tsx';
import LoadingButton from '../components/buttons/LoadingButton.tsx';
import ConfirmationModal from '../components/ConfirmationModal.tsx';

interface PromoteUserButtonProps {
  admin: boolean;
  email: string;
  updateAdmin: (email: string) => void;
}

/**
 * The button component which, when clicked, will promote a user to admin.
 * If the user is already admin, the button will be unclickable.
 * @param admin - whether the user is an admin
 * @param email - the email of the user to promote
 * @param updatesAdmin - a function which updates whether the user is an admin
 * on the frontend representation of the set of users. This function is called
 * upon successfully deletion of user from the database.
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

export default PromoteUserButton;
