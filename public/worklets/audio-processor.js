// audio-processor.js
class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._lastUpdate = currentTime;
  }
  process(inputs, outputs, parameters) {
    const [channel] = inputs;

    if (channel.length) {
      // Post a message to the node for every 1 second.
      if (currentTime - this._lastUpdate > 1.0) {
        this.port.postMessage({
          second: 1,
          contextTimestamp: currentTime,
        });
        this._lastUpdate = currentTime;
      }
      return true;
    } else {
      return false;
    }
  }
}

registerProcessor("audio-processor", AudioProcessor);
