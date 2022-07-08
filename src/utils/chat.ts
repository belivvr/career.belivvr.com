interface ChatPayload {
  id: string;
  message: string;
}

// eslint-disable-next-line import/prefer-default-export
export function chatOnSpeechBubble({ id, message }: ChatPayload) {
  const user = document.getElementById(id)!;

  if (user.querySelector('.chat')) {
    user.querySelector('.chat')!.remove();
    user.querySelector('.speech')!.remove();
  }

  const text = document.createElement('a-troika-text');
  text.className = 'chat';
  text.setAttribute('value', message);
  text.setAttribute('position', '0.05 0.9 0');
  text.setAttribute('billboard', '');
  text.setAttribute('font', 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff');
  text.setAttribute('font-size', '0.1');
  text.setAttribute('max-width', '0.9');
  text.setAttribute('overflow-wrap', 'break-word');
  text.setAttribute('outline-width', '0.01');

  const speech = document.createElement('a-image');
  speech.setAttribute('src', '#speech');
  speech.setAttribute('position', '0 0.8 0');
  speech.setAttribute('billboard', '');
  speech.setAttribute('opacity', '0.3');
  speech.className = 'speech';

  user.appendChild(text);
  user.appendChild(speech);

  setTimeout(() => {
    try {
      text.remove();
      speech.remove();
    } catch {
      // do nothing
    }
  }, 5000);
}
