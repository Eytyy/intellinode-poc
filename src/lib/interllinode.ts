import {
  Chatbot,
  ChatGPTInput,
  LanguageModelInput,
  RemoteLanguageModel,
  RemoteImageModel,
  ImageModelInput,
  type SupportedImageModels,
  type SupportedLangProviders,
} from 'intellinode';

export async function proofRead(
  textInput: string,
  openaiKey: string
) {
  try {
    const bot = new Chatbot(openaiKey, 'openai');
    const input = new ChatGPTInput(
      `Proofread the following text and suggest improvements`
    );
    input.addUserMessage(textInput);
    const response = await bot.chat(input);
    return response;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to proofread');
  }
}

export async function generateBlogPost(
  textInput: string,
  apiKey: string,
  provider: SupportedLangProviders = 'openai'
): Promise<string[]> {
  try {
    if (provider === 'openai') {
      const bot = new Chatbot(apiKey, 'openai');
      const input = new ChatGPTInput(
        `generate a blog post based on the user input`,
        {
          maxTokens: 1200,
        }
      );
      input.addUserMessage(textInput);
      const response = await bot.chat(input);
      return response;
    } else if (provider === 'cohere') {
      const langInput = new LanguageModelInput({
        prompt: `Write a blog post with sections titles about ${textInput}`,
      });
      langInput.setDefaultValues('cohere', 1200);
      const cohereLangModel = new RemoteLanguageModel(
        apiKey,
        'cohere'
      );
      const responses = await cohereLangModel.generateText(langInput);
      return responses;
    } else {
      throw new Error('Invalid Language Model Provider');
    }
  } catch (e) {
    console.log(e);
    throw new Error('Failed to generate blog post');
  }
}

export async function gernerateSummary(
  textInput: string,
  openaiKey: string
): Promise<string[]> {
  try {
    const bot = new Chatbot(openaiKey, 'openai');
    const input = new ChatGPTInput(
      `generate a one paragraph summary from user input`
    );
    input.addUserMessage(textInput);
    const response = await bot.chat(input);
    return response;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to generate summary');
  }
}

export async function generateSEOMetaTags(
  inputText: string,
  openaiKey: string
) {
  try {
    const bot = new Chatbot(openaiKey, 'openai');
    const input = new ChatGPTInput(
      `generate SEO meta tags in HTML format from user input, without including the whole document structure.
     Just return the meta and title tags.`
    );
    input.addUserMessage(inputText);
    const response = await bot.chat(input);
    return response;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to generate SEO meta tags');
  }
}

export async function generateImageDescription(
  textInput: string,
  openaiKey: string
): Promise<string[]> {
  try {
    const bot = new Chatbot(openaiKey, 'openai');
    const input = new ChatGPTInput(
      `generate image description from user input to use it as prompt to generate image from DALL·E or stable diffusion image model.
    return only the image description to use it as direct input`
    );
    input.addUserMessage(textInput);
    const response = await bot.chat(input);
    return response;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to generate image description');
  }
}

export async function generateImage(
  description: string,
  apiKey: string,
  modelBackend?: SupportedImageModels
): Promise<string[]> {
  try {
    const imageModel = new RemoteImageModel(apiKey, modelBackend);
    const imageInput = new ImageModelInput({
      prompt: description,
      numberOfImages: 1,
      width: 512,
      height: 512,
    });
    const image = await imageModel.generateImages(imageInput);
    return image;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to generate image');
  }
}
