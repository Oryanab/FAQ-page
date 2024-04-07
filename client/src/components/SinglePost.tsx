import {
    ExpandMore,
    SentimentSatisfiedAlt,
    ThumbDownAlt,
    ThumbUpAlt
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    styled
} from '@mui/material';
import { Post, Comment } from 'GlobalTypes';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactionType, useMainContext } from '../contexts/MainContext';

const StyledAccordion = styled(Accordion)({
    border: 'none',
    boxShadow: 'none',

    '&.Mui-expanded': {
        margin: 'unset',
        marginTop: '10px'
    }
});

const StyledAccordionSummary = styled(AccordionSummary)({
    background: '#D9D9D9',
    height: 54,
    maxHeight: 54,
    minHeight: 'unset',
    margin: 'unset',
    marginTop: '10px',
    fontWeight: 500,
    fontSize: 14,
    color: '#424242',
    letterSpacing: 0.4,

    ':hover': {
        background: '#8D8D8D'
    },

    '&.Mui-expanded': {
        background: '#8D8D8D',
        minHeight: 'unset',
        color: '#FFF'
    }
});

const StyledAccordionDetails = styled(AccordionDetails)({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    background: '#FFF',

    p: {
        fontWeight: 300,
        fontSize: 14,
        color: '#5D5D5D',
        letterSpacing: 0.4,
        margin: 0,
        marginTop: 5
    }
});

const ReactSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 10
});

const CommentsSection = styled(Box)({
    display: 'flex',
    gap: 10,
    flexDirection: 'column'
});

const CommentHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 500,
    fontSize: 12,
    marginBottom: 5,
    textTransform: 'capitalize',
    '.icon': {
        width: 20
    }
});

const CommentBody = styled(Box)({
    paddingLeft: 35,
    fontWeight: 300,
    fontSize: 10
});

interface PostProps {
    post: Post;
}

const SinglePost: React.FC<PostProps> = ({ post }) => {
    const { handleReactionsChange, reactions } = useMainContext();
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = useCallback(async () => {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
        setComments(data.slice(0, 3));
    }, [post.id]);

    useEffect(() => {
        if (expanded) {
            fetchComments();
        }
    }, [expanded, fetchComments]);

    return (
        <StyledAccordion
            className="single-post"
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            slotProps={{
                transition: {
                    timeout: { enter: 500, exit: 500 }
                }
            }}
            key={post.id}
        >
            <StyledAccordionSummary expandIcon={<ExpandMore />}>
                {post.id}. {post.title.slice(0, 50)}?
            </StyledAccordionSummary>
            <StyledAccordionDetails>
                <p>{post.body}</p>
                <ReactSection>
                    <p>Konnten wir deine Frage beantworten?</p>
                    <ThumbUpAlt
                        className="like-btn"
                        sx={{ cursor: 'pointer' }}
                        color={
                            reactions[post.id]?.isLike ? 'success' : 'action'
                        }
                        onClick={() =>
                            handleReactionsChange(post.id, ReactionType.LIKE)
                        }
                    />
                    <ThumbDownAlt
                        className="dislike-btn"
                        sx={{ cursor: 'pointer' }}
                        color={
                            reactions[post.id]?.isDislike ? 'error' : 'action'
                        }
                        onClick={() =>
                            handleReactionsChange(post.id, ReactionType.DISLIKE)
                        }
                    />
                </ReactSection>
                <CommentsSection>
                    {comments.map((comment) => (
                        <Box className="single-comment" key={comment.id}>
                            <CommentHeader>
                                <SentimentSatisfiedAlt className="icon" />
                                {`${comment.name.slice(0, 16)} - ${comment.email}`}
                            </CommentHeader>
                            <CommentBody>{comment.body}</CommentBody>
                        </Box>
                    ))}
                </CommentsSection>
            </StyledAccordionDetails>
        </StyledAccordion>
    );
};

export default SinglePost;
