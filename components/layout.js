// eslint-disable-next-line import/extensions
import keysObj from './keyboard.js';

function initLayout() {
  const keyWide = ['Backspace', 'CapsLock', 'Enter', 'Tab', 'ControlLeft'];
  const wrapper = document.createElement('section');
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const desc = document.createElement('p');
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
  Object.entries(keysObj).forEach((key) => {
    const keyElement = document.createElement('div');
    const [keyEvent, keyVal] = key;
    keyElement.classList.add('key');
    if (keyWide.includes(keyEvent)) {
      keyElement.classList.add('key_wide');
    }
    if (keyEvent === 'Space') {
      keyElement.classList.add('key_space');
    }
    keyElement.innerHTML = keyVal;
    keyboard.append(keyElement);
  });
}
export default initLayout;
