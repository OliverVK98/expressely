import { User } from './user/user';
import { Article } from './article/article.entity';

export const testUser: User = {
  id: 1,
  username: 'admin',
  password: '123',
  roles: ['ADMIN'],
  email: 'test@test.com',
  features: {
    isArticleRatingEnabled: true,
    isAppRedesigned: true,
  },
  jsonSettings: {
    theme: 'app_light_theme',
    isArticlesPageWasOpened: true,
  },
  avatar:
    'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
};

const blocks = [
  {
    id: '1',
    type: 'TEXT',
    paragraphs: [
      'The tech world saw a renaissance in November 2022 when ChatGPT arrived. It created an explosion in the industry. Now we hear new announcements every other day about new generative AI tools.',
      'Generative AI research requires a considerable budget, talent, and a massive corpus of data. It also needs the ready availability of scalable computing platforms. This article explores the efforts of three tech giants- Google, Amazon, and Microsoft. All three are betting big money on AI research and development (R&D) and product creation. Their tech partners are racing to get the upper hand in the generative AI domain.',
      'Towards the end of this article, you see what Generative AI brings to the developers.',
    ],
  },
  {
    id: '2',
    type: 'IMAGE',
    src: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*sgAddYFkxb04YJ4hy3yAzg.png',
  },
  {
    id: '3',
    type: 'TEXT',
    title: 'How does Generative AI work?',
    paragraphs: [
      'Let us try to understand, in layperson’s terms, how a Generative AI application answers a question:',
      '• It first parses the input question to detect what words, phrases, and sentences most suitably represent the crux of the question. In this way, the tool ‘understands’ the question.',
      '• Then it tries to discover the words, phrases, and sentences available in the sizeable pre-trained model that is nothing but a deep learning neural network, which potentially has the answer to the input question.',
      '• Finally, it forms or generates sentences & paragraphs on the identified sections in the model to answer the question. It also randomizes the output sentences to give a slightly different flavor to the answer each time you ask the same question. The generative module of the tool does this.',
    ],
  },
  {
    id: '4',
    type: 'TEXT',
    title: 'How is a significant language model trained?',
    paragraphs: [
      'The quality of answers a Generative AI application provides depends on how its large language model was trained. Training a model is a multi-stage process.',
      'In the first stage of the model training process, humans play the role of the person asking questions and the chatbot answering them. The underlying model identifies the pattern of words and sentences in such a conversation. In this process, the correct answers are also ranked for their accuracy. This is supervised model training.',
      'In the second stage, an automated process finds potentially correct words, phrases, and sentences from material available in the open domain for a given question taking clues from the patterns identified in the first phase. This part of the model training is called unsupervised training.',
      'This combination of supervised and unsupervised model training makes it possible to create a humongous model in a relatively short time which obtains data from books, manuals, blogs, websites, and newspapers.',
    ],
  },
  {
    id: '5',
    type: 'TEXT',
    title: 'Google',
    paragraphs: [''],
  },
  {
    id: '6',
    type: 'IMAGE',
    src: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*aNjOvYpAaP2kt0CBf-lkLw.png',
  },
  {
    id: '7',
    type: 'TEXT',
    paragraphs: [
      'ChatGPT garnered so much attention for its detailed responses and precise answers across various domains of knowledge that it turned out to be the biggest existential threat to Google.',
    ],
  },
  {
    id: '8',
    type: 'TEXT',
    title: 'Bard',
    paragraphs: [
      'Awakened by the challenge, Google introduced Bard. Google has unparalleled expertise in developing search engines, and it also has its cloud platform. This makes Google one of the most formidable players in the Generative AI space. Alphabet CEO unveiled Bard on February 6 this year (2023). At the start, It had a rough launch, but it has taken a giant leap since then to the recent Google I/O.',
      'Google Bard uses the Internet to source information and provide fresh & up-to-date answers. Since Bard draws information from the Internet, it is more capable of answering open-ended questions. But, it can also produce errors or false information as the Internet is full of rogue propaganda sites. Bard is more formal but less humorous than ChatGPT. Additionally, It provides multiple draft answers to any question. Bard has inbuilt adaptive learning capabilities, allowing it to improve with user feedback on its answers. It uses a deep learning large language model named LaMDA (Language Model for Dialog Applications).',
    ],
  },
  {
    id: '9',
    type: 'TEXT',
    title: 'Other applications',
    paragraphs: [
      'Bard is not the only Generative AI application created by Google. Google has developed an AI image generator named Imagen, a text-to-image diffusion model. Google claims that human raters prefer Imagen over other competing models in side-by-side comparisons about sample quality and image-text alignment. Here are some example images created by Imagen.',
    ],
  },
  {
    id: '10',
    type: 'IMAGE',
    src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*6RUO8eI6mCtkHt1R-f7NNA.png',
  },
  {
    id: '11',
    type: 'TEXT',
    paragraphs: [
      'Google also has an AI music generator Model named MusicLM. MusicLM can create high-fidelity music from given text descriptions or prompts. The prompt can be like “Create a jazz song with a saxophone and have a solo female voice in it”. The model can create music of different lengths, from a 10-second audio clip to an entire song. What makes it remarkable is that it can even take an existing song and produce it in a different sound and flavor.',
    ],
  },
  {
    id: '12',
    type: 'TEXT',
    title: 'Amazon',
    paragraphs: [''],
  },
  {
    id: '13',
    type: 'IMAGE',
    src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*JWq9Seq8aM2RQDdLVBo95w.png',
  },
  {
    id: '14',
    type: 'TEXT',
    paragraphs: [
      'Amazon is coming up with many Generative AI services on its AWS platform. The most important among them is Amazon Bedrock , a cloud service that allows developers to build and scale generative AI applications. These applications can use pre-trained models created by AWS and some leading AI startups. Bedrock is currently available in a limited preview. Its models allow the development of generative AI applications and are available as a serverless API service.',
      'Bedrock does not try to provide one model for all the needs. It provides many foundational pre-trained models that can be used for different needs. Some examples are:',
      '• The AI21Lab’s foundational Jurassic model can generate text in many languages. Currently, it supports French, German, Spanish, Portuguese, Italian, and Dutch.',
      '• Anthropic lab’s model Claude has LLM abilities. It can be used for conversations, question-answering, and workflow automation.',
      '• Stable Diffusion generates unique, realistic, high-quality images, art, logos, and designs.',
      '• Titan can summarise, generate, and classify text. It can also do open-ended Q&A, information extraction, embeddings, and search.',
      '• Amazon SageMaker is a generic service that allows building, training, and deploying ML models for any use case.',
    ],
  },
  {
    id: '15',
    type: 'TEXT',
    title: 'Microsoft',
    paragraphs: [''],
  },
  {
    id: '16',
    type: 'IMAGE',
    src: 'https://miro.medium.com/v2/resize:fit:632/format:webp/1*Wk2U4jGiVjxVNaGSkkXzAg.png',
  },
  {
    id: '17',
    type: 'TEXT',
    paragraphs: [
      'Microsoft has established a long-term partnership with OpenAI. They intend to speed up breakthroughs in the Generative AI arena.',
      'The new Bing with ChatGPT is available in Microsoft’s Edge browser. ChatGPT is also used in the Bing app and the mobile app version of the Edge web browser. Bing with ChatGPT allows the users to tell it to Stop responding while generating the answer live.',
      'Microsoft’s Azure OpenAI Service empowers developers to build cutting-edge AI applications. The OpenAI Service provides OpenAI models for the same. It allows fine-tuning the OpenAI models with customer data and hyperparameters. Microsoft is also integrating another OpenAI product, the AI image generator DALL-E 2.',
    ],
  },
  {
    id: '18',
    type: 'IMAGE',
    src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*HkD1FT2gKb_QIhvCGjhSZA.png',
  },
  {
    id: '19',
    type: 'TEXT',
    paragraphs: [
      'Microsoft’s new Bing chatbot is available on the iOS, Android Bing, Edge, and Skype apps.',
    ],
  },
  {
    id: '20',
    type: 'TEXT',
    title: 'Generative AI Tools for Developers',
    paragraphs: [
      'Some people fear that the code-generation abilities of AI may make human programmers obsolete. But AI experts believe that Generative AI is not going to replace human developers any time soon. Instead, it will augment software developers. Developers need to learn to use AI tools as their assistants to become more productive. The Generative AI models have ushered in a new category of AI tools called coding companions. With coding companions, developers can become more creative and feel empowered. They can tackle complex problems and provide better solutions in a shorter time.',
      'Google, Microsoft, and Amazon- are working towards creating feature-rich, powerful coding assistant tools. These tools can help software developers in many ways:',
      '• Identify and suggest bug fixes in the given code',
      '• Refactor code so that it conforms to the standard coding patterns',
      '• Analyze code for adherence to coding guidelines. This can address many common coding issues.',
      '• Identify and provide suggestions for fixing security vulnerabilities. The security vulnerabilities can be SQL Injection, Cross-site scripting, Cross-Site Request Forgery, etc.',
      '• Porting the code written in one language to another',
      '• Write unit tests',
      '• Create CSS layout',
      '• Accessibility compliance for WCAG levels A, AA, or AAA',
    ],
  },
  {
    id: '21',
    type: 'TEXT',
    title: 'GitHub Copilot by Microsoft',
    paragraphs: [
      'Github Copilot is a coding companion tool that uses OpenAI’s model Codex to generate code. It can write functions in real time. It supports popular development environments such as VS Code, Neovim, and JetBrains. It can generate Python, JavaScript, TypeScript, Ruby, Go, C#, and C++ code. The Github Copilot tool also has voice-activated capabilities. Developers having difficulties using a keyboard can code with their voice. It can also generate code based on comments. It also allows the developers to write code comments in languages other than English. It also helps translate words from English to other languages.',
      'A developer can use GitHub Copilot to help find a correct Regex. The Ask Copilot feature of GitHub Copilot is of great help. It can explain a given code in plain English and some other supported human languages.',
    ],
  },
  {
    id: '22',
    type: 'TEXT',
    title: 'CodeWhisperer by Amazon',
    paragraphs: [
      'Amazon has also created a Generative AI tool named CodeWhisperer for programmers. CodeWhispere is an AI coding companion to enhance developer productivity. It uses a foundational model to generate code suggestions in real time. CodeWhisperer can be integrated with IDEs such as VS Code, IntelliJ IDEA, AWS Cloud9, and many more. It can write code in Python, Java, JavaScript, TypeScript, C#, Go, Kotlin, Rust, PHP, and SQL.',
    ],
  },
  {
    id: '23',
    type: 'IMAGE',
    src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*j8E3qfroZEoLMXezU4ZKyQ.png',
  },
  {
    id: '24',
    type: 'TEXT',
    paragraphs: [
      'At the moment, AWS CodeWhisperer has a slight edge over Github Copilot. CodeWhisperer’s NLP algorithms generate more accurate suggestions. GitHub Copilot sometimes generates code that is not correct.',
    ],
  },
  {
    id: '25',
    type: 'TEXT',
    title: 'Google Bard',
    paragraphs: [
      'Google, too, having no intention to stay behind, is adding powerful coding capabilities in Bard. Bard is going to support code generation in more than 20 programming languages. These languages include Java, JavaScript, Python, C++, and Go. Bard’s features include code generation, optimization, debugging, and explanation. The code generated by Bard can run in the browser with Google Colab. Developers can also export it to an integrated development environment.',
    ],
  },
  {
    id: '26',
    type: 'TEXT',
    title: 'The sinister side of AI',
    paragraphs: [
      'Famous author Yuval Noah Harari in his book Homo Deus: A Brief History of Tomorrow, writes about a new form of the Great Decoupling that separates intelligence from human consciousness through AI. He paints a gloomy picture of a future where Intelligent machines may overtake humans. Has Generative AI brought us closer to that dark future?',
      'Generative AI tools can spread fallacy through AI-authored fake news that will be difficult to control by law enforcement agencies.',
      'These AI tools provide a fertile ground for plagiarism and copyright infringement. If not appropriately guarded by the Generative AI tool makers, it will cause confidential and identity data theft.',
      'The code generated by the coding companions is based on patterns learned from their training examples. Some of these examples might be subject to restrictive licenses. This may lead to copyright violations and other legal problems.',
      'Biased answers may disturb specific communities unknowingly. It will help criminals in impersonation through fake audio and video. It may also facilitate tailored phishing. Deep fakes allow large-scale blackmailing.',
    ],
  },
  {
    id: '27',
    type: 'TEXT',
    title: 'Conclusion',
    paragraphs: [
      'Google, Amazon, and Microsoft all have powerful Generative AI weapons in their arsenal, but the battle has just begun. Microsoft and its partner OpenAI are ahead in the race since it reached the pole first. Currently, ChatGPT and Bing are the best at accomplishing verbal tasks. Google Bard is the best for finding answers related to the latest affairs in the world. Amazon Bedrock has a great combination of AI models for creating custom generative AI applications. Amazon and Google tools are not yet available to the general public, but what they build may be a game changer.',
      'The battle is on. Only time will tell who will emerge as the clear winner.',
    ],
  },
];

const getNewCodeBlocks = () => {
  return [...blocks.map((block) => JSON.stringify(block))];
};

export const testArticle: Article = {
  title: 'The Incredibles of Generative AI',
  subtitle:
    'How three tech giants Microsoft, Google, and Amazon are competing with one another in the Generative AI race',
  img: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*b3L1jwni6P8l0E-5Wvgjow.jpeg',
  views: 91,
  userId: '1',
  type: ['IT', 'AI'],
  blocks: getNewCodeBlocks(),
};
