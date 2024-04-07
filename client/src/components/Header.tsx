import { Box, BoxProps, styled, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { LINKS } from '../constants';

interface MdScreenProps extends BoxProps {
    mdScreen: boolean;
}

const HeaderContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'mdScreen'
})<MdScreenProps>(({ mdScreen }) => ({
    background: '#FFF',
    padding: mdScreen ? '0 5%' : '0 15%',
    marginBottom: 30
}));

const HeaderBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #F0F0F0',
    padding: '0 20px',
    paddingBottom: '20px'
});

const LinksWarpper = styled(Box)({
    gap: 10,
    display: 'flex',
    justifyContent: 'center'
});

const Link = styled(Box)({
    gap: 10,
    width: 25,
    height: 25,
    borderRadius: 4,
    background: '#E10915',
    cursor: 'pointer',
    padding: 2,
    color: '#FFF'
});

const Header = () => {
    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <HeaderContainer mdScreen={mdScreen}>
            <HeaderBox>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Logo_Kaufland.svg/2560px-Logo_Kaufland.svg.png"
                    alt="Logo"
                    width={140}
                    height={35}
                />
                <LinksWarpper>
                    {LINKS.map((link) => {
                        const { icon: Icon, url, blank } = link;
                        const handleClick = () => {
                            if (blank) {
                                window.open(url, '_blank');
                            } else {
                                window.open(url);
                            }
                        };

                        return (
                            <Link key={link.url}>
                                <Icon onClick={handleClick} />
                            </Link>
                        );
                    })}
                </LinksWarpper>
            </HeaderBox>
        </HeaderContainer>
    );
};

export default Header;
