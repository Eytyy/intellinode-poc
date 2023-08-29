import fs from 'fs';
import path from 'path';

class Config2 {
  config: {
    [key: string]: any;
  };
  static instance: Config2;

  constructor() {
    const configPath = path.join(__dirname, '..', 'config.json');
    this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  getProperty(key: string) {
    return key
      .split('.')
      .reduce(
        (obj, k) =>
          obj && obj[k] !== null && obj[k] !== 'undefined'
            ? obj[k]
            : null,
        this.config
      );
  }
  static getInstance() {
    if (!Config2.instance) {
      Config2.instance = new Config2();
    }
    return Config2.instance;
  }
}

class ChatGPTMessage {
  content: string;
  role: string;
  name: string | null;

  constructor(content: string, role: string, name = null) {
    this.content = content;
    this.role = role;
    this.name = name;
  }

  isSystemRole() {
    return this.role === 'system';
  }
}

type ChatInput = {
  messages: {
    content: string;
    role: string;
    name?: string;
  }[];
  model: string;
  temperature?: number;
  maxTokens?: number | null;
  numberOfOutputs?: number;
};

class ChatModelInput {
  getChatInput(): ChatInput | null {
    return null;
  }
}

class ChatGPTInput extends ChatModelInput {
  messages: ChatGPTMessage[];
  model: string;
  temperature: number;
  maxTokens: number | null;
  numberOfOutputs: number;

  constructor(
    systemMessage: string | ChatGPTMessage,
    options: {
      model: string;
      temperature: number;
      maxTokens: number;
      numberOfOutputs: number;
    }
  ) {
    super();
    if (
      systemMessage instanceof ChatGPTMessage &&
      systemMessage.isSystemRole()
    ) {
      this.messages = [systemMessage];
    } else if (typeof systemMessage === 'string') {
      this.messages = [new ChatGPTMessage(systemMessage, 'system')];
    } else {
      throw new Error('Invalid system message');
    }
    this.model = options.model || 'gpt-3.5-turbo';
    this.temperature = options.temperature || 0.7;
    this.maxTokens = options.maxTokens || null;
    this.numberOfOutputs = 1;
  }

  addMessage(message: ChatGPTMessage) {
    this.messages.push(message);
  }
  addUserMessage(message: string) {
    this.messages.push(new ChatGPTMessage(message, 'user'));
  }
  addSystemMessage(message: string) {
    this.messages.push(new ChatGPTMessage(message, 'system'));
  }
  cleanMessages() {
    if (this.messages.length > 1) {
      const firstMessage = this.messages[0];
      this.messages = [firstMessage];
    }
  }
  deleteLastMessage(message: ChatGPTMessage) {
    for (let i = this.messages.length - 1; i >= 0; i--) {
      const currentMessage = this.messages[i];
      if (
        currentMessage.content === message.content &&
        currentMessage.role === message.role
      ) {
        this.messages.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  getChatInput() {
    const messages = this.messages.map((message) => {
      if (message.name) {
        return {
          content: message.content,
          role: message.role,
          name: message.name,
        };
      } else {
        return {
          content: message.content,
          role: message.role,
        };
      }
    });
    const params = {
      model: this.model,
      messages,
      temprature: this.temperature,
      maxTokens: this.maxTokens,
      numberOfOutputs: this.numberOfOutputs,
    };
    return params;
  }
}

export { ChatGPTInput, ChatModelInput, ChatGPTMessage };
