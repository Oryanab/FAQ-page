import React from 'react';
import { MainContextProvider } from './contexts/MainContext';
import FrequentQuestionsPage from './components/FrequentQuestionsPage';

const App = () => {
    return (
        <MainContextProvider>
            <FrequentQuestionsPage />
        </MainContextProvider>
    );
};

export default App;
