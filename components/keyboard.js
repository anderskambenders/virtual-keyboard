// eslint-disable-next-line import/extensions
import { keysObj, elemsUnhandle } from './keyboard-data.js';

function initLayout() {
  const keyWide = ['Backspace', 'CapsLock', 'Enter', 'Tab', 'ControlLeft'];
  const wrapper = document.createElement('section');
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const desc = document.createElement('p');
  let lang = 'En';
  const langIndex = 0;
  let capsLockFlag = false;
  let shiftLockFlag = false;
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
  desc.innerHTML = 'Keyboard is created on MacOS. Use "left shift" + "left option" (alt) to switch language';
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
      switch (langIndex) {
        case 0:
          keyElement.innerHTML = keyValEn;
          break;
        case 1:
          keyElement.innerHTML = keyValEnCaps;
          break;
        case 2:
          keyElement.innerHTML = keyValRu;
          break;
        case 3:
          keyElement.innerHTML = keyValRuCaps;
          break;
        default:
      }
      keyboard.append(keyElement);
    });
  };

  const switchSymbols = (ind) => {
    Object.keys(keysObj).forEach((element) => {
      const key = document.querySelector(`.${element}`);
      key.innerHTML = keysObj[element][ind];
    });
  };

  const shiftHandle = () => {
    const condition = document.querySelector('.ShiftLeft').classList.contains('key_active')
      || document.querySelector('.ShiftRight').classList.contains('key_active');
    const capsLock = document.querySelector('.CapsLock');
    const noneCapsLockToUpper = () => {
      Object.keys(keysObj).forEach((element) => {
        if (!elemsUnhandle.includes(element)) {
          const key = document.querySelector(`.${element}`);
          if (!capsLock.classList.contains('key_active')) {
            key.innerHTML = key.innerHTML.toUpperCase();
          }
        }
      });
    };
    const capsLockToUpper = () => {
      Object.keys(keysObj).forEach((element) => {
        if (!elemsUnhandle.includes(element)) {
          const key = document.querySelector(`.${element}`);
          if (capsLock.classList.contains('key_active')) {
            key.innerHTML = key.innerHTML.toUpperCase();
          }
        }
      });
    };
    if (condition && lang === 'En') {
      switchSymbols(1);
      noneCapsLockToUpper();
    } else if (!condition && lang === 'En') {
      switchSymbols(0);
      capsLockToUpper();
    } else if (condition && lang === 'Ru') {
      switchSymbols(3);
      noneCapsLockToUpper();
    } else if (!condition && lang === 'Ru') {
      switchSymbols(2);
      capsLockToUpper();
    }
  };

  const capsLockHandle = () => {
    const capsLock = document.querySelector('.CapsLock');
    const shifts = document.querySelector('.ShiftLeft').classList.contains('key_active')
      || document.querySelector('.ShiftRight').classList.contains('key_active');
    Object.keys(keysObj).forEach((element) => {
      if (!elemsUnhandle.includes(element)) {
        const key = document.querySelector(`.${element}`);
        if (capsLock.classList.contains('key_active')) {
          key.innerHTML = key.innerHTML.toUpperCase();
        } else if (!shifts) {
          key.innerHTML = key.innerHTML.toLowerCase();
        }
      }
    });
    shiftHandle();
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
              + keyEvent.textContent + textarea.value.substring(endArea);
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
        if (key.classList.contains('CapsLock')) {
          key.classList.toggle('key_active');
          capsLockHandle();
        } else if (key.classList.contains('ShiftLeft') && !shiftLockFlag) {
          key.classList.add('key_active');
          shiftHandle();
        } else if (key.classList.contains('ShiftRight') && !shiftLockFlag) {
          key.classList.add('key_active');
          shiftHandle();
        } else { key.classList.toggle('key_active'); }
      });
    });
    document.addEventListener('mouseup', () => {
      if (document.querySelector('.ShiftLeft').classList.contains('key_active') && !shiftLockFlag) {
        document.querySelector('.ShiftLeft').classList.remove('key_active');
        shiftHandle();
      }
      if (document.querySelector('.ShiftRight').classList.contains('key_active') && !shiftLockFlag) {
        document.querySelector('.ShiftRight').classList.remove('key_active');
        shiftHandle();
      }
      Object.keys(keysObj).forEach((element) => {
        if (element !== 'CapsLock' && element !== 'ShiftRight' && element !== 'ShiftLeft') {
          document.querySelector(`.${element}`).classList.remove('key_active');
        }
      });
    });
  };
  const switchLanguages = () => {
    const condition = document.querySelector('.ShiftLeft').classList.contains('key_active')
    && document.querySelector('.AltLeft').classList.contains('key_active');
    if (condition && lang === 'En') {
      lang = 'Ru';
      switchSymbols(2);
    } else if (condition && lang === 'Ru') {
      lang = 'En';
      switchSymbols(0);
    }
    capsLockHandle();
  };
  const keyboardClick = () => {
    document.addEventListener('keydown', (keyEvent) => {
      textareaKeyboardClick(keyEvent);
      if (keyEvent.code === 'CapsLock' && !capsLockFlag) {
        capsLockFlag = true;
        document.querySelector(`.${keyEvent.code}`).classList.add('key_active');
        capsLockHandle();
      } else if (keyEvent.code === 'ShiftLeft' && !shiftLockFlag) {
        shiftLockFlag = true;
        document.querySelector(`.${keyEvent.code}`).classList.add('key_active');
        shiftHandle();
      } else if (keyEvent.code === 'ShiftRight' && !shiftLockFlag) {
        shiftLockFlag = true;
        document.querySelector(`.${keyEvent.code}`).classList.add('key_active');
        shiftHandle();
      } else if (keyEvent.code !== 'ShiftLeft' && keyEvent.code !== 'ShiftRight') {
        document.querySelector(`.${keyEvent.code}`).classList.add('key_active');
      }
      textarea.focus();
      document.querySelector(`.${keyEvent.code}`).classList.add('key_active');
    });
    document.addEventListener('keyup', (keyEvent) => {
      switchLanguages();
      if (keyEvent.code === 'CapsLock') {
        document.querySelector(`.${keyEvent.code}`).classList.remove('key_active');
        capsLockFlag = false;
        capsLockHandle();
      } else if (keyEvent.code === 'ShiftLeft' || keyEvent.code === 'ShiftRight') {
        shiftLockFlag = false;
        document.querySelector('.ShiftRight').classList.remove('key_active');
        document.querySelector('.ShiftLeft').classList.remove('key_active');
        shiftHandle();
      } else { document.querySelector(`.${keyEvent.code}`).classList.remove('key_active'); }
    });
  };

  initKeys();
  mouseClick();
  keyboardClick();
}
export default initLayout;
