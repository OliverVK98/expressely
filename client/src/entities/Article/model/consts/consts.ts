import { SVGProps, VFC } from 'react';
import JavaIcon from '@/shared/assets/icons/java.svg';
import JavascriptIcon from '@/shared/assets/icons/js.svg';
import GoIcon from '@/shared/assets/icons/go.svg';
import ReactIcon from '@/shared/assets/icons/react-icon.svg';
import PythonIcon from '@/shared/assets/icons/python.svg';
import ProgrammingIcon from '@/shared/assets/icons/programming.svg';
import MathIcon from '@/shared/assets/icons/math.svg';
import CryptoIcon from '@/shared/assets/icons/crypto.svg';
import MLIcon from '@/shared/assets/icons/ml.svg';

export enum ArticleSortField {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED = 'createdAt',
}

export enum ArticleBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

export enum ArticleType {
    ALL = 'ALL',
    Programming = 'Programming',
    React = 'React',
    Javascript = 'Javascript',
    Math = 'Math',
    Python = 'Python',
    Crypto = 'Crypto',
    Java = 'Java',
    MachineLearning = 'Machine Learning',
    Go = 'Go',
}

export enum ArticleFeedType {
    RECENT = 'Recent',
    DISCOVER = 'Discover',
    HISTORY = 'History',
    MY_ARTICLES = 'My Articles',
}

export const articleFeedTypeDescription: {
    title: ArticleType;
    description: string;
    icon: VFC<SVGProps<SVGSVGElement>>;
}[] = [
    {
        title: ArticleType.Go,
        description: 'Compiled, multithreaded programming language',
        icon: GoIcon,
    },
    {
        title: ArticleType.Javascript,
        description:
            'High-level, interpreted programming language. It is a language which is also ' +
            'characterized as dynamic, weakly typed, prototype-based and multi-paradigm',
        icon: JavascriptIcon,
    },
    {
        title: ArticleType.Programming,
        description: 'The art of creating computer programs',
        icon: ProgrammingIcon,
    },
    {
        title: ArticleType.React,
        description:
            'An open-source JavaScript framework and library developed by Facebook',
        icon: ReactIcon,
    },
    {
        title: ArticleType.Python,
        description:
            'Interpreted high-level programming language for general-purpose programming',
        icon: PythonIcon,
    },
    {
        title: ArticleType.Math,
        description: 'Mother of all sciences',
        icon: MathIcon,
    },
    {
        title: ArticleType.Crypto,
        description: 'Everything cryptocurrency',
        icon: CryptoIcon,
    },
    {
        title: ArticleType.Java,
        description:
            'General-purpose computer-programming language that is concurrent, ' +
            'class-based, object-oriented, and specifically designed to have as ' +
            'few implementation dependencies as possible',
        icon: JavaIcon,
    },
    {
        title: ArticleType.MachineLearning,
        description: 'The basis of artificial intelligence',
        icon: MLIcon,
    },
];
