declare module 'intellinode' {
  class Chatbot {
    constructor(keyValue?: string, provider?: string);
    chat(modelInput?: ChatGPTInput | LLamaReplicateInput);
  }
  class ChatGPTInput {
    constructor(systemMessage: string);

    addMessage(message: ChatGPTMessage);
  }
  class ChatGPTMessage {
    constructor(message: string, role: string);
  }
  class LLamaReplicateInput {
    constructor(message: string);

    addUserMessage(message: string): void;
    addAssistantMessage(message: string): void;
  }
  let SupportedChatModels = {
    OPENAI: 'openai',
    REPLICATE: 'replicate',
    SAGEMAKER: 'sagemaker',
  };
}
