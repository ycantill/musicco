// audio-processor.js
class AudioProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    console.log(inputs);
    return true;
  }
}

registerProcessor("audio-processor", AudioProcessor);
