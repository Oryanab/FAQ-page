import React from 'react';
import { Box, Input, styled } from '@mui/material';
import { Search as MuiSearchIcon } from '@mui/icons-material';

const SearchContainer = styled(Box)({
    background: '#424242',
    height: 80,
    marginBottom: 40,
    padding: '0 16%',
    display: 'flex',
    alignItems: 'center'
});

const SearchInput = styled(Input)({
    background: '#FFF',
    display: 'flex',
    alignContent: 'center',
    fontSize: 16,
    fontWeight: 300,
    width: 800,
    height: 48,
    padding: '2px 20px 0 20px',
    color: '#868686'
});

interface SearchProps {
    setKeyword: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ setKeyword }) => {
    return (
        <SearchContainer>
            <SearchInput
                disableUnderline
                endAdornment={<MuiSearchIcon />}
                placeholder="Wie können wir dir helfen?"
                onChange={(e) => setKeyword(e.target.value)}
            />
        </SearchContainer>
    );
};

export default Search;
