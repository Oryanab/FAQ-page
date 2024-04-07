import { Post, Reaction } from 'GlobalTypes';
import axios from 'axios';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';

export const enum ReactionType {
    LIKE = 'like',
    DISLIKE = 'dislike'
}

const REACTION_LOCAL_STORAGE_KEY = 'kaufland-reactions';

interface IMainContextProvider {
    children: JSX.Element;
}

interface IMainContextReturnType {
    posts: Post[];
    handleReactionsChange: (postId: number, action: ReactionType) => void;
    reactions: Reaction;
}

const MainContext = createContext<IMainContextReturnType | null>(null);

export const MainContextProvider: React.FC<IMainContextProvider> = ({
    children
}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [reactions, setReactions] = useState<Reaction>({});

    const fetchPosts = useCallback(async () => {
        const { data } = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        setPosts(data);
    }, []);

    const updateReactions = useCallback(
        (reactions: Reaction) => {
            localStorage.setItem(
                REACTION_LOCAL_STORAGE_KEY,
                JSON.stringify(reactions)
            );
            setReactions(reactions);
        },
        [setReactions]
    );

    const handleReactionsChange = useCallback(
        (postId: number, action: ReactionType) => {
            const updatedReactions = { ...reactions };
            if (action === ReactionType.LIKE) {
                const like = !updatedReactions[postId]?.isLike || false;
                updatedReactions[postId] = {
                    isLike: like,
                    isDislike: like
                        ? false
                        : updatedReactions[postId]?.isDislike
                };
            }

            if (action === ReactionType.DISLIKE) {
                const dislike = !updatedReactions[postId]?.isDislike || false;
                updatedReactions[postId] = {
                    isLike: dislike ? false : updatedReactions[postId]?.isLike,
                    isDislike: dislike
                };
            }

            updateReactions(updatedReactions);
        },
        [reactions, updateReactions]
    );

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const storedReations = localStorage.getItem(
            REACTION_LOCAL_STORAGE_KEY
        ) as string;
        if (storedReations) {
            setReactions(JSON.parse(storedReations) as Reaction);
        }
    }, []);

    const value: IMainContextReturnType = {
        posts,
        handleReactionsChange,
        reactions
    };

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext)!;
