// eslint-disable-next-line import/extensions
import { keysObj, elemsUnhandle } from './keyboard.js';

function initLayout() {
  const keyWide = ['Backspace', 'CapsLock', 'Enter', 'Tab', 'ControlLeft'];
  const wrapper = document.createElement('section');
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const desc = document.createElement('p');
  let lang = 'En';
  let langIndex = 0;
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
      const [keyValEn, keyValEnCaps, keyValRu, keyValRuCaps] = keyVal;
      keyElement.innerHTML = (lang === 'En' ? keyValEn : keyValRu);
      keyboard.append(keyElement);
    });
  };

  const textareaMouseClick = (keyEvent) => {
    const startArea = textarea.selectionStart;
    const endArea = textarea.selectionEnd;
    if (keyEvent.classList[0] === 'Backspace') {
      const textareaText = textarea.value.substring(0, startArea > 0 ? startArea - 1 : startArea)
        + textarea.value.substring(endArea);
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = startArea > 0 ? endArea - 1 : endArea;
    } else if (keyEvent.classList[0] === 'Enter') {
      const enterVal = '\n';
      const textareaText = textarea.value.substring(0, startArea)
        + enterVal + textarea.value.substring(endArea);
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = endArea + 1;
    } else if (keyEvent.classList[0] === 'Tab') {
      const tabSymbol = '\t';
      const textareaText = textarea.value.substring(0, startArea)
        + tabSymbol + textarea.value.substring(endArea);
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = endArea + 1;
    } else if (!elemsUnhandle.includes(keyEvent.classList[0])) {
      const textareaText = textarea.value.substring(0, startArea)
              + keysObj[keyEvent.classList[0]][langIndex] + textarea.value.substring(endArea);
      textarea.focus();
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = (startArea === endArea) ? (endArea + 1) : endArea;
    }
  };

  const textareaKeyboardClick = (keyEvent) => {
    const startArea = textarea.selectionStart;
    const endArea = textarea.selectionEnd;
    const target = document.querySelector(`.${keyEvent.code}`);
    keyEvent.preventDefault();
    if (keyEvent.code === 'Backspace') {
      const textareaText = textarea.value.substring(0, startArea > 0 ? startArea - 1 : startArea)
        + textarea.value.substring(endArea);
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = startArea > 0 ? endArea - 1 : endArea;
    } else if (keyEvent.code === 'Enter') {
      const enterSymbol = '\n';
      const textareaText = textarea.value.substring(0, startArea)
        + enterSymbol + textarea.value.substring(endArea);
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = endArea + 1;
    } else if (keyEvent.code === 'Tab') {
      const tabSymbol = '\t';
      const textareaText = textarea.value.substring(0, startArea)
        + tabSymbol + textarea.value.substring(endArea);
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = endArea + 1;
    } else if (Object.keys(keysObj).includes(keyEvent.code)
      && !elemsUnhandle.includes(keyEvent.code)) {
      const textareaText = textarea.value.substring(0, startArea)
                  + target.textContent + textarea.value.substring(endArea);
      textarea.value = textareaText;
      textarea.focus();
      textarea.selectionEnd = (startArea === endArea) ? (endArea + 1) : endArea;
    }
  };

  const mouseClick = () => {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      key.addEventListener('mousedown', () => {
        textareaMouseClick(key);
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
  const switchLanguages = () => {
    const condition = document.querySelector('.ShiftLeft').classList.contains('key_active')
    && document.querySelector('.MetaLeft').classList.contains('key_active');
    if (condition && lang === 'En') {
      lang = 'Ru';
      langIndex = 2;
      keyboard.innerHTML = '';
      initKeys();
      mouseClick();
    } else if (condition && lang === 'Ru') {
      lang = 'En';
      langIndex = 0;
      keyboard.innerHTML = '';
      initKeys();
      mouseClick();
    }
  };
  const keyboardClick = () => {
    document.addEventListener('keydown', (keyEvent) => {
      textareaKeyboardClick(keyEvent);
      textarea.focus();
      document.querySelector(`.${keyEvent.code}`).classList.add('key_active');
    });
    document.addEventListener('keyup', (keyEvent) => {
      switchLanguages();
      document.querySelector(`.${keyEvent.code}`).classList.remove('key_active');
    });
  };

  initKeys();
  mouseClick();
  keyboardClick();
}
export default initLayout;
