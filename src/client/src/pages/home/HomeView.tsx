import React from 'react';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';

function App({ children }: any) {
  return (
    <div
      style={{
        backgroundColor: COLORS.header,
        width: '100px',
        height: '100px',
        fontFamily: FONTS.headerFont,
        fontWeight: FONTS.headerWeight,
      }}
    >
      {children}
    </div>
  );
}

export default App;
