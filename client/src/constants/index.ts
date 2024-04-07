import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export const POSTS_CHUNK = 10;

export const LINKS: {
    icon: React.ElementType<SvgIconProps>;
    url: string;
    blank?: boolean;
}[] = [
    {
        icon: GitHub,
        url: 'https://github.com/Oryanab',
        blank: true
    },
    {
        icon: LinkedIn,
        url: 'https://www.linkedin.com/in/oryan-abergel/',
        blank: true
    },
    {
        icon: Email,
        url: 'mailto:oryan445@gmail.com'
    }
];
