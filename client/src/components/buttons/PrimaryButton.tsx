import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import COLORS from '../../assets/colors.ts';

/**
 * The {@link Button} used for most action items.
 */
const PrimaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '5px',
  padding: '0.7rem 2rem',
  border: 'none',
  color: 'white',
  textDecoration: 'none',
  transition: 'box-shadow 0.2s ease 0s',
  textAlign: 'center',
  fontWeight: 'bold',
  background: COLORS.primaryBlue,
}));

export default PrimaryButton;
