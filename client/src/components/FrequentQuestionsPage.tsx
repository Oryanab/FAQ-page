import React from 'react';
import { Box, BoxProps, styled, useMediaQuery, useTheme } from '@mui/material';
import { useMainContext } from '../contexts/MainContext';
import Header from './Header';

interface MdScreenProps extends BoxProps {
    mdScreen: boolean;
}

const PageCotainer = styled(Box)({
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    height: '100%'
});

const PageHeader = styled('h1')({
    background: '#FFF',
    padding: '0 16%',
    fontSize: '28px',
    fontWeight: '600',
    color: '#424242',
    letterSpacing: 0.4,
    margin: 0,
    marginBottom: 10
});

const MainSection = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'mdScreen'
})<MdScreenProps>(({ mdScreen }) => ({
    background: '#FFF',
    padding: mdScreen ? '0 8%' : '0 14%',
    display: 'flex',
    flex: 1
}));

const FrequentQuestionsPage = () => {
    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const { posts } = useMainContext();

    return (
        <PageCotainer>
            <Header />
            <PageHeader>Fragen & Antworten</PageHeader>
            <MainSection mdScreen={mdScreen}></MainSection>
        </PageCotainer>
    );
};

export default FrequentQuestionsPage;
