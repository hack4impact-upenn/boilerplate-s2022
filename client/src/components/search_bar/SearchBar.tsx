import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px', // Added padding around the search bar
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
  width: '720px',
  minWidth: '360px',
  maxWidth: '720px',
  height: '56px',
  background: '#E4E4E4',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '20px',
  padding: '8px', // Added internal padding inside the search bar
});

const LeadingIconWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '48px',
  height: '48px',
  cursor: 'pointer',
});

const TrailingIconWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '48px',
  height: '48px',
  cursor: 'pointer',
});

const Input = styled('input')({
  flexGrow: 1,
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
});

function SearchBar({
  onSearch,
  placeholder,
}: {
  onSearch: (query: string) => void;
  placeholder: string;
}) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      onSearch(event.target.value);
    }
  };

  return (
    <Wrapper>
      <Container>
        <LeadingIconWrapper>{/* Icon */}</LeadingIconWrapper>
        <Input type="text" placeholder={placeholder} onChange={handleSearch} />
        <TrailingIconWrapper>{/* Icon */}</TrailingIconWrapper>
      </Container>
    </Wrapper>
  );
}

export default SearchBar;
