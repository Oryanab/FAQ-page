import { Post } from 'GlobalTypes';
import axios from 'axios';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';

interface IMainContextProvider {
    children: JSX.Element;
}

interface IMainContextReturnType {
    posts: Post[];
}

const MainContext = createContext<IMainContextReturnType | null>(null);

export const MainContextProvider: React.FC<IMainContextProvider> = ({
    children
}) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = useCallback(async () => {
        const { data } = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        setPosts(data);
    }, []);

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value: IMainContextReturnType = {
        posts
    };

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext)!;
