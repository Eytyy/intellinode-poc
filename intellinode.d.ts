declare module 'intellinode' {
  let LangModels = ['command', 'text-davinci-003'] as const;
  type SupportedLangModels = (typeof LangModels)[number];

  let LangProviders = ['openai', 'cohere'] as const;
  type SupportedLangProviders = (typeof LangProviders)[number];

  let ChatModels = ['openai', 'replicate', 'sagemaker'] as const;
  type SupportedChatModels = (typeof ChatModels)[number];

  let ImageModels = ['openai', 'stability'] as const;
  type SupportedImageModels = (typeof ImageModels)[number];

  class Chatbot {
    constructor(keyValue?: string, provider?: string);
    chat(modelInput?: ChatGPTInput | LLamaReplicateInput);
  }
  class ChatGPTInput {
    constructor(
      systemMessage: string,
      options?: {
        model?: string;
        temperature?: number;
        maxTokens?: number;
        numberOfOutputs?: number;
      }
    );

    addMessage(message: ChatGPTMessage);
    addUserMessage(message: string): void;
  }
  class ChatGPTMessage {
    constructor(message: string, role: string);
  }
  class LLamaReplicateInput {
    constructor(message: string);

    addUserMessage(message: string): void;
    addAssistantMessage(message: string): void;
  }
  type LanguageModelInputOptions = {
    prompt: string;
    model?: SupportedLangModels | null;
    temperature?: number;
    maxTokens?: number;
    numberOfOutputs?: number;
  };
  class LanguageModelInput {
    constructor({
      prompt,
      model,
      temperature,
      maxTokens,
      numberOfOutputs,
    }: LanguageModelInputOptions);
    setDefaultValues(
      provider: 'openai' | 'cohere',
      tokenCount: number
    ): void;
  }
  class RemoteLanguageModel {
    constructor(keyValue?: string, provider?: SupportedLangProviders);
    generateText(input: LanguageModelInput): Promise<string[]>;
  }
  class RemoteImageModel {
    constructor(keyValue?: string, provider?: SupportedImageModels);
    generateImages(input: ImageModelInput): Promise<string[]>;
  }
  type ImageModelInputOptions = {
    prompt: string;
    numberOfImages: number;
    imageSize?: string;
    reponseFormat?: string;
    width?: number;
    height?: number;
    diffusion_cfgScale?: number;
    diffusion_style_preset?: string;
    engine?: string;
  };
  class ImageModelInput {
    constructor({
      prompt,
      numberOfImages,
      imageSize,
      reponseFormat,
      width,
      height,
      diffusion_cfgScale,
      diffusion_style_preset,
      engine,
    }: ImageModelInputOptions);
  }
}
