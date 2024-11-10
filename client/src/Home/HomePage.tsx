import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../util/redux/hooks.ts';
import {
  logout as logoutAction,
  toggleAdmin,
  selectUser,
} from '../util/redux/userSlice.ts';
import { logout as logoutApi, selfUpgrade } from './api.tsx';
import ScreenGrid from '../components/ScreenGrid.tsx';
import PrimaryButton from '../components/buttons/PrimaryButton.tsx';

interface PromoteButtonProps {
  admin: boolean | null;
  handleSelfPromote: () => void;
  navigator: ReturnType<typeof useNavigate>;
}

/**
 * A button which, when clicked, will promote the user to admin. If the user is already admin, the button will be a link to the admin dashboard.
 * @param admin - a boolean indicating whether the user is an admin
 * @param handleSelfPromote - a function which promotes the user to admin
 * @param navigator - a function which navigates to a new page (passed in from parent function)
 */
function PromoteButton({
  admin,
  handleSelfPromote,
  navigator,
}: PromoteButtonProps) {
  if (admin === null) {
    return null;
  }
  return !admin ? (
    <PrimaryButton variant="contained" onClick={handleSelfPromote}>
      Promote self to admin
    </PrimaryButton>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      gap={2}
      sx={{ marginTop: '20px' }}
    >
      <PrimaryButton
        variant="contained"
        onClick={() => navigator('/users', { replace: true })}
        sx={{ backgroundColor: '#333333', color: 'white' }}
      >
        View all users
      </PrimaryButton>
      <PrimaryButton
        variant="contained"
        onClick={() => navigator('/organizations', { replace: true })}
        sx={{ backgroundColor: '#333333', color: 'white' }}
      >
        View all organizations&apos; data
      </PrimaryButton>
    </Box>
  );
}

/**
 * The HomePage of the user dashboard. Displays a welcome message, a logout button and a button to promote the user to admin if they are not already an admin. If the user is an admin, the button will navigate them to the admin dashboard. This utilizes redux to access the current user's information.
 */
function HomePage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [admin, setAdmin] = useState(user.admin);

  const handleLogout = async () => {
    if (await logoutApi()) {
      dispatch(logoutAction());
      navigator('/login', { replace: true });
    }
  };

  const handleSelfPromote = async () => {
    const newAdminStatus = await selfUpgrade(user.email as string);
    if (newAdminStatus) {
      dispatch(toggleAdmin());
      setAdmin(true);
    }
  };

  const message = `Welcome to the Boilerplate, ${user.firstName} ${user.lastName}!`;

  return (
    <div
      style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}
    >
      <ScreenGrid>
        {/* Logo */}
        <Grid container justifyContent="center" sx={{ marginBottom: '40px' }}>
          <svg
            width="193"
            height="75"
            viewBox="0 0 193 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <svg
              width="193"
              height="75"
              viewBox="0 0 193 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                d="M37.1117 0C16.6169 0 0 16.6169 0 37.1117C0 57.6066 16.6169 74.2234 37.1117 74.2234C57.6066 74.2234 74.2234 57.6066 74.2234 37.1117C74.2234 16.6169 57.6139 0 37.1117 0ZM37.1117 71.4137C18.1973 71.4137 2.80972 56.0261 2.80972 37.1117C2.80972 18.1973 18.2046 2.81704 37.1117 2.81704C56.0188 2.81704 71.4064 18.2046 71.4064 37.119C71.4064 56.0334 56.0188 71.421 37.1117 71.421V71.4137Z"
                fill="white"
              />
              <path
                d="M37.1117 69.0284C19.5144 69.0284 5.19507 54.7091 5.19507 37.1117C5.19507 19.5144 19.5144 5.20239 37.1117 5.20239C54.7091 5.20239 69.0284 19.5217 69.0284 37.1191C69.0284 54.7164 54.7091 69.0357 37.1117 69.0357V69.0284ZM37.1117 5.65605C19.7705 5.65605 5.65604 19.7705 5.65604 37.1117C5.65604 54.453 19.7705 68.5674 37.1117 68.5674C54.453 68.5674 68.5674 54.453 68.5674 37.1117C68.5674 19.7705 54.4603 5.65605 37.1117 5.65605Z"
                fill="white"
              />
              <path
                d="M37.1117 28.5143C39.6214 28.5143 44.8823 40.558 44.4506 57.5919C44.4506 57.5919 52.0896 44.9409 48.2482 28.624C45.797 18.2046 38.6117 9.12427 37.2141 9.12427H37.002C35.6044 9.12427 28.4265 18.212 25.9753 28.624C22.1338 44.9409 29.7728 57.5919 29.7728 57.5919C29.3411 40.558 34.602 28.5143 37.1117 28.5143Z"
                fill="white"
              />
              <path
                d="M37.1263 65.0627C38.0775 65.0481 39.7531 62.8237 40.3751 57.9433C40.9751 53.2531 40.8287 51.7824 40.6458 49.5946C40.4482 47.2385 39.9873 46.002 39.9873 46.002C39.819 52.6677 38.3117 57.4091 37.2653 57.4091H37.0971H37.1629H36.9946C35.9483 57.4091 34.441 52.6677 34.2727 46.002C34.2727 46.002 33.8117 47.2458 33.6142 49.5946C33.4312 51.7824 33.2849 53.2604 33.8849 57.9433C34.5068 62.8237 36.1824 65.0773 37.1336 65.0627H37.1263Z"
                fill="white"
              />
              <path
                d="M84.7087 27.3288C84.7087 22.7484 88.1989 19.3752 92.6183 19.3752C95.4866 19.3752 97.4695 20.4947 98.8158 22.3825L96.95 23.6996C95.9256 22.3094 94.6012 21.585 92.5525 21.585C89.472 21.585 87.2404 24.0435 87.2404 27.3215C87.2404 30.5995 89.5233 33.0653 92.6403 33.0653C94.6451 33.0653 96.1232 32.319 97.2866 30.8117L99.1817 32.1141C97.5866 34.236 95.5598 35.2824 92.5525 35.2824C88.133 35.2824 84.716 31.9092 84.716 27.3288H84.7087Z"
                fill="white"
              />
              <path
                d="M103.806 35.0776H101.347L108.138 19.2656H108.277L115.089 35.0776H112.513L111.628 32.9118H104.699L103.813 35.0776H103.806ZM108.182 24.6217L105.606 30.7533H110.713L108.182 24.6217Z"
                fill="white"
              />
              <path
                d="M119.801 21.7461H115.199V19.5803H126.847V21.7461H122.245V35.0777H119.808V21.7461H119.801Z"
                fill="white"
              />
              <path
                d="M129.415 35.0776H126.95L133.74 19.2656H133.879L140.691 35.0776H138.115L137.23 32.9118H130.301L129.415 35.0776ZM133.791 24.6217L131.215 30.7533H136.323L133.791 24.6217Z"
                fill="white"
              />
              <path
                d="M143.998 19.5803H146.435V32.9119H153.269V35.0777H143.991V19.5803H143.998Z"
                fill="white"
              />
              <path
                d="M153.159 19.5803H155.852L160.249 27.6656L164.581 19.5803H167.134L161.435 30.1314V35.0777H158.998V30.1534L153.166 19.5803H153.159Z"
                fill="white"
              />
              <path
                d="M170.588 30.9946C171.298 32.3629 172.505 33.0946 174.1 33.0946C175.695 33.0946 176.837 32.319 176.837 31.0678C176.837 29.6117 175.739 29.1068 174.371 28.4922L173.303 28.0166C171.02 27.0142 169.476 25.8288 169.476 23.4142C169.476 20.9996 171.232 19.3826 173.786 19.3826C175.768 19.3826 177.225 20.1801 178.205 21.8191L176.361 23.0264C175.768 22.024 174.993 21.5191 173.829 21.5191C172.578 21.5191 171.847 22.2508 171.847 23.3191C171.847 24.5484 172.6 25.0313 174.283 25.7776L175.351 26.2532C177.7 27.2995 179.244 28.3751 179.244 30.9946C179.244 33.8482 177.056 35.2824 174.115 35.2824C171.495 35.2824 169.578 34.0092 168.532 32.0263L170.581 31.0019L170.588 30.9946Z"
                fill="white"
              />
              <path
                d="M185.742 21.7461H181.139V19.5803H192.78V21.7461H188.178V35.0777H185.742V21.7461Z"
                fill="white"
              />
              <path
                d="M93.2403 39.4753H95.9476L90.5476 46.3094L96.7524 54.7093H93.8403L88.9818 48.124L87.2989 50.1801V54.702H84.8989V39.468H87.2989V47.0191L93.2403 39.468V39.4753Z"
                fill="white"
              />
              <path
                d="M99.8914 39.4753H102.291V54.7093H99.8914V39.4753Z"
                fill="white"
              />
              <path
                d="M110.201 41.6046H105.672V39.4753H117.116V41.6046H112.586V54.7093H110.194V41.6046H110.201Z"
                fill="white"
              />
              <path
                d="M118.799 47.0921C118.799 42.5849 122.223 39.2776 126.569 39.2776C129.394 39.2776 131.34 40.3751 132.664 42.2336L130.828 43.5288C129.818 42.1678 128.523 41.4507 126.503 41.4507C123.481 41.4507 121.286 43.8727 121.286 47.0921C121.286 50.3116 123.525 52.7335 126.598 52.7335C128.567 52.7335 130.023 51.9945 131.164 50.5165L133.023 51.7896C131.457 53.875 129.459 54.8993 126.503 54.8993C122.157 54.8993 118.799 51.5847 118.799 47.0848V47.0921Z"
                fill="white"
              />
              <path
                d="M146.259 39.4753H148.659V54.7093H146.259V48.2996H138.957V54.7093H136.557V39.4753H138.957V46.1704H146.259V39.4753Z"
                fill="white"
              />
              <path
                d="M153.093 39.4753H162.796V41.6046H155.493V46.1704H161.969V48.2484H155.493V52.58H163.11V54.702H153.101V39.468L153.093 39.4753Z"
                fill="white"
              />
              <path
                d="M169.264 44.6994V54.7091H167.025V39.2556H167.2L176.968 49.4921V39.4824H179.207V54.9359H179.032L169.264 44.6994Z"
                fill="white"
              />
              <path
                d="M184.476 50.6994C185.171 52.0457 186.356 52.7628 187.929 52.7628C189.502 52.7628 190.615 52.0018 190.615 50.7726C190.615 49.3384 189.539 48.8482 188.2 48.2409L187.146 47.7726C184.907 46.7921 183.386 45.6214 183.386 43.2507C183.386 40.88 185.112 39.2849 187.622 39.2849C189.568 39.2849 191.002 40.0678 191.968 41.6849L190.154 42.8702C189.568 41.8824 188.807 41.3922 187.666 41.3922C186.437 41.3922 185.72 42.1093 185.72 43.1629C185.72 44.3702 186.459 44.8458 188.12 45.5775L189.173 46.0458C191.478 47.0775 193 48.1311 193 50.7067C193 53.5091 190.849 54.914 187.959 54.914C185.383 54.914 183.495 53.6628 182.471 51.7091L184.483 50.6994H184.476Z"
                fill="white"
              />
            </svg>
          </svg>
        </Grid>

        {/* Welcome message */}
        <Grid container justifyContent="center" sx={{ marginBottom: '20px' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {message}
          </Typography>
        </Grid>

        {/* Promote Button or Admin Actions */}
        <Grid
          item
          container
          justifyContent="center"
          sx={{ marginBottom: '20px' }}
        >
          <PromoteButton
            admin={admin}
            handleSelfPromote={handleSelfPromote}
            navigator={navigator}
          />
        </Grid>

        {/* Logout Button */}
        <Grid item container justifyContent="center">
          <PrimaryButton
            onClick={handleLogout}
            variant="contained"
            sx={{
              backgroundColor: '#333333',
              color: 'white',
              minWidth: '150px',
            }}
          >
            Logout
          </PrimaryButton>
        </Grid>
      </ScreenGrid>
    </div>
  );
}

export default HomePage;
