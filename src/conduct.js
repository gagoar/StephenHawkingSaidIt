import encode64 from './encode64';

const _isWorkerSupported = () => ('Worker' in window);

const _handleMessage = (callback, {data}) => ( callback(encode64(data)));

class Conduct {
  constructor(script) {
    if (!_isWorkerSupported()) {
      return Error('your browser doesn\t support Workers: try any other browser or IE > 9.x');
    }

    this.worker = new Worker(script);
  }

  speak({text, callback}) {
    this.worker.onmessage = _handleMessage.bind(null, callback);
    this.worker.postMessage({text});
  }

};

export default Conduct;
