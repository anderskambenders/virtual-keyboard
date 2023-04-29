// eslint-disable-next-line import/extensions
import keysObj from './keyboard.js';

function initLayout() {
  const keyWide = ['Backspace', 'CapsLock', 'Enter', 'Tab', 'ControlLeft'];
  const wrapper = document.createElement('section');
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const desc = document.createElement('p');
  let lang = 'En';
  wrapper.classList.add('wrapper');
  document.body.append(wrapper);
  title.classList.add('title');
  title.innerHTML = 'Virtual Keyboard RSS';
  wrapper.append(title);
  textarea.classList.add('textarea');
  wrapper.append(textarea);
  keyboard.classList.add('keyboard');
  wrapper.append(keyboard);
  desc.classList.add('desc');
  desc.innerHTML = 'Keyboard is created on MacOS. Use "shift" + "command" to switch language';
  wrapper.append(desc);
  const initKeys = () => {
    Object.entries(keysObj).forEach((key) => {
      const keyElement = document.createElement('div');
      const [keyEvent, keyVal] = key;
      keyElement.classList.add(`${keyEvent}`, 'key');
      if (keyWide.includes(keyEvent)) {
        keyElement.classList.add('key_wide');
      }
      if (keyEvent === 'Space') {
        keyElement.classList.add('key_space');
      }
      const [keyValEn, keyValRu] = keyVal;
      keyElement.innerHTML = (lang === 'En' ? keyValEn : keyValRu);
      keyboard.append(keyElement);
    });
  };

  const textareaKeyboardClick = (keyEvent) => {
    const startArea = textarea.selectionStart;
    const endArea = textarea.selectionEnd;
    const textareaText = textarea.value.substring(0, startArea)
              + keysObj[keyEvent.classList[0]][1] + textarea.value.substring(endArea);
    textarea.focus();
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = (startArea === endArea) ? (endArea + 1) : endArea;
  };
  const mouseClick = () => {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      key.addEventListener('mousedown', () => {
        textareaKeyboardClick(key);
        key.classList.toggle('key_active');
      });
      key.addEventListener('mouseup', () => {
        key.classList.toggle('key_active');
      });
    });
    document.addEventListener('mouseup', () => {
      keys.forEach(() => {
        document.querySelector('.key').classList.remove('active');
      });
    });
  };
  const keyboardClick = () => {
    document.addEventListener('keydown', (keyEvent) => {
      textarea.focus();
      document.querySelector(`.${keyEvent.code}`).classList.add('key_active');
    });
    document.addEventListener('keyup', (keyEvent) => {
      document.querySelector(`.${keyEvent.code}`).classList.remove('key_active');
    });
  };
  initKeys();
  mouseClick();
  keyboardClick();
}
export default initLayout;
