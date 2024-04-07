import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box,
    BoxProps,
    Button,
    styled,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useMainContext } from '../contexts/MainContext';
import Header from './Header';
import { LINKS, POSTS_CHUNK } from '../constants';
import { Post } from 'GlobalTypes';
import { HeadsetMic } from '@mui/icons-material';
import SinglePost from './SinglePost';
import Search from './Search';

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

const QuestionsSection = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'mdScreen'
})<MdScreenProps>(({ mdScreen }) => ({
    background: '#FFF',
    flex: 1,
    height: '100%',
    maxHeight: mdScreen ? 380 : 500,
    overflowY: 'scroll',
    padding: mdScreen ? '0 10px' : '0 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '::-webkit-scrollbar': {
        background: '#f5f5f5',
        borderRadius: 10,
        width: 7,
        height: 2
    },
    '::-webkit-scrollbar-thumb': {
        background: '#D9D9D9',
        borderRadius: 10,
        cursor: 'pointer'
    }
}));

const ContactSection = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'mdScreen'
})<MdScreenProps>(({ mdScreen }) => ({
    background: '#FFF',
    flex: 1,
    display: mdScreen ? 'none' : 'flex',
    justifyContent: 'center',
    paddingTop: 40
}));

const ContactWrapper = styled(Box)({
    background: '#D9D9D9',
    color: '#424242',
    width: 80,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '50%',
    gap: 5,
    cursor: 'pointer',

    ':hover': {
        background: '#E4E4E4'
    },

    h4: {
        fontWeight: 700,
        margin: 'unset'
    }
});

const LoadMoreButton = styled(Button)({
    background: '#424242',
    fontSize: 16,
    textTransform: 'none',
    color: '#FFF',
    fontWeight: 400,
    height: 40,
    marginTop: '10px',
    cursor: 'pointer',
    userSelect: 'none',
    width: 200,
    alignSelf: 'center',

    ':disabled': {
        color: '#F0F0F0',
        cursor: 'not-allowed'
    },

    ':hover': {
        background: '#70D159'
    }
});

const FrequentQuestionsPage = () => {
    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const { posts } = useMainContext();
    const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
    const [postCount, setPostCount] = useState<number>(POSTS_CHUNK);
    const [keyword, setKeyword] = useState<string>('');
    const maxPosts = useMemo(() => posts.length, [posts]);

    const handleLoadMore = useCallback(() => {
        if (postCount < maxPosts) {
            setPostCount((prev) => prev + POSTS_CHUNK);
        }
    }, [maxPosts, postCount]);

    useEffect(() => {
        keyword.length
            ? setDisplayPosts(
                  posts.slice(0, postCount).filter((post) =>
                      post.title.includes(
                          keyword
                              .replace(/[^\w\s]/gi, '')
                              .replace(/\d+/g, '')
                              .trim()
                      )
                  )
              )
            : setDisplayPosts(posts.slice(0, postCount));
    }, [postCount, posts, keyword]);

    return (
        <PageCotainer>
            <Header />
            <PageHeader>Fragen & Antworten</PageHeader>
            <Search setKeyword={setKeyword} />
            <MainSection mdScreen={mdScreen}>
                <QuestionsSection mdScreen={mdScreen}>
                    <Box>
                        {displayPosts.map((displayPost) => (
                            <SinglePost
                                key={displayPost.id}
                                post={displayPost}
                            />
                        ))}
                    </Box>
                    <LoadMoreButton
                        disabled={postCount === maxPosts || !!keyword.length}
                        onClick={handleLoadMore}
                    >
                        {postCount === maxPosts
                            ? 'No more to load'
                            : 'Load More'}
                    </LoadMoreButton>
                </QuestionsSection>
                <ContactSection mdScreen={mdScreen}>
                    <ContactWrapper onClick={() => window.open(LINKS[2].url)}>
                        <HeadsetMic />
                        <h4>Kontakt</h4>
                    </ContactWrapper>
                </ContactSection>
            </MainSection>
        </PageCotainer>
    );
};

export default FrequentQuestionsPage;
