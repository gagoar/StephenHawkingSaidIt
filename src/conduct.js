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

    let promise = new Promise((resolve, reject) => {
      this.worker.onmessage = _handleMessage.bind(null, resolve);
    });

    this.worker.postMessage({text});

    return promise;
  }

};

export default Conduct;
