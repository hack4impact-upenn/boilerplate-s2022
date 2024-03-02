import React, { createContext, useMemo, useState } from 'react';
import { AnyChildren } from '../types/generic.ts';
import AlertType from '../types/alert.ts';

interface Alert {
  type: AlertType | undefined;
  text: string;
  setAlert: (text: string, type: AlertType) => void;
}

const ALERT_TIME = 5000;

const AlertContext = createContext<Alert>({
  type: undefined,
  text: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlert: () => {},
});

function AlertProvider({ children }: AnyChildren) {
  const [notification, setNotification] = useState<AlertType | undefined>();
  const [notificationText, setNotificationText] = useState<string>('');

  const setAlert = (text: string, type: AlertType) => {
    setNotification(type);
    setNotificationText(text);
    setTimeout(() => {
      setNotification(undefined);
      setNotificationText('');
    }, ALERT_TIME);
  };

  const providerContext: Alert = useMemo(() => {
    return {
      type: notification,
      text: notificationText,
      setAlert,
    };
  }, [notificationText, notification]);
  return (
    <AlertContext.Provider value={providerContext}>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertProvider };
export default AlertContext;
