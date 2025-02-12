import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...'
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleHamburgerChange = () => {
    return;
  };

  return (
    <div style={styles.container}>
      {/* Leading Icon - Hamburger Menu */}
      <div style={styles.leadingIconWrapper} onClick={handleHamburgerChange}>
        <div style={styles.iconContainer}>
          <div style={styles.iconStateLayer}>
            <svg
              style={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#49454F"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div style={styles.inputWrapper}>
        <input
          style={styles.input}
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </div>

      {/* Trailing Icon - Paper Airplane "Submit" */}
      <div style={styles.trailingIconWrapper} onClick={handleSearchClick}>
        <div style={styles.iconContainer}>
          <div style={styles.iconStateLayer}>
            <svg
              style={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#49454F"
                d="M2 21l21-9L2 3v7l15 2-15 2v7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS aligned with Figma
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    width: '720px',
    minWidth: '360px',
    maxWidth: '720px',
    height: '56px',
    left: '433px',
    top: '100px',
    background: '#E4E4E4',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    padding: '0px',
  },
  leadingIconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48px',
    height: '48px',
    cursor: 'pointer'
  },
  trailingIconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '48px',
    height: '48px',
    cursor: 'pointer'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '100px',
  },
  iconStateLayer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    padding: '8px',
    gap: '10px',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    width: '608px',
    height: '48px',
    flex: 1,
  },
  input: {
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: '#49454F',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    paddingLeft: '0.5rem',
  },
};

export default SearchBar;
