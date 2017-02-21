importScripts('/js/speakGenerator.js');

onmessage = (event) => {
  postMessage(generateSpeech(event.data.text, event.data.args));
};
