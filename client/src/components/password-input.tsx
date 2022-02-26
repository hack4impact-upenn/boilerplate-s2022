import React from 'react';
import theme from '../assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
/**import Visibility from '@mui/icons-material';
import VisibilityOff from '@mui/icons-material';**/


interface State {
    password: string;
    showPassword: boolean;
}
  
export default function PasswordInput() {
    const [values, setValues] = React.useState<State>({
      password: '',
      showPassword: false,
    });
  
    const handleChange =
      (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
      };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
        <div>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    </IconButton>
                </InputAdornment>
                }
            />
        </div>
    )
}
                    /**{values.showPassword ? <VisibilityOff /> : <Visibility />} */