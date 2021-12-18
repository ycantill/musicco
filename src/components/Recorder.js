import { useState } from "react";

export const Recorder = () => {
  const [message, setMessage] = useState("Press Record");
  const [recorder, setRecorder] = useState();
  const [masterBuffer, setMasterBuffer] = useState();
  const [duration, setDuration] = useState(0);
  const [audioContext, setAudioContext] = useState(new AudioContext());
  const [seconds, setSeconds] = useState(0);
  const sampleRate = 44100;
  let data = [];
  let audioBuffers = [];
  let masterDuration = 0;

  const recording = (e) => {
    data.push(e.data);
  };

  const renderMasterBuffer = async () => {
    const duration = audioBuffers.reduce((duration, audioBuffer) => {
      const x = audioBuffer.startTime + audioBuffer.buffer.duration;
      return x > duration ? x : duration;
    }, masterDuration);

    const offlineAudioContext = new OfflineAudioContext({
      numberOfChannels: 2,
      length: sampleRate * duration,
      sampleRate: sampleRate,
    });

    audioBuffers.forEach((audioBuffer) => {
      const track = offlineAudioContext.createBufferSource();

      track.buffer = audioBuffer.buffer;
      track.connect(offlineAudioContext.destination);

      track.start(offlineAudioContext.currentTime + audioBuffer.startTime);
    });

    const renderedMasterBuffer = await offlineAudioContext.startRendering();

    return renderedMasterBuffer;
  };

  const stoppped = async () => {
    setMessage("Saving...");
    const blob = new Blob(data, { type: "audio/mpeg" });
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    audioBuffers.push({
      buffer: audioBuffer,
      startTime: 0,
    });

    const renderedMasterBuffer = await renderMasterBuffer();
    masterDuration = renderedMasterBuffer.duration;

    setMasterBuffer(renderedMasterBuffer);
    setDuration(masterDuration);
    data = [];

    setMessage(`${masterDuration}`);
  };

  const getMediaDeviceStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    setRecorder(() => {
      return Object.assign(new MediaRecorder(stream), {
        ondataavailable: recording,
        onstop: stoppped,
      });
    });
  };

  const getNavigatorMediaDevice = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      try {
        await getMediaDeviceStream();
      } catch (error) {
        console.log("The following getUserMedia error occurred: " + error);
      }
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  };

  // Button events
  const record = () => {
    recorder.start();
    setMessage("Recording...");
  };

  const stop = () => {
    recorder.stop();
  };

  const play = async () => {
    setMessage("Playing...");
    
    await audioContext.audioWorklet.addModule("worklets/audio-processor.js");

    const audioProcessorNode = new AudioWorkletNode(
      audioContext,
      "audio-processor"
    );
    audioProcessorNode.port.onmessage = (event) => {
      const second = event.data.second;
      // Handling data from the processor.
      setSeconds((previousSeconds) => {
        return previousSeconds + second;
      });
    };
    const song = audioContext.createBufferSource();

    song.buffer = masterBuffer;
    song.connect(audioProcessorNode).connect(audioContext.destination);
    song.start();

    song.onended = () => {
      setMessage("Press Record");
    };
  };

  const start = async () => {
    await getNavigatorMediaDevice();
  };

  return recorder ? (
    <div className="recorder">
      <div className="controls">
        <button onClick={record}>Record</button>
        <button onClick={stop}>Stop</button>
        <button onClick={play}>Play</button>
      </div>
      <br />
      <div className="player">
        <input type="range" min="0" max={duration} step="any" />
      </div>
      <br />
      <span>{message}</span>
      <span>{seconds}</span>
    </div>
  ) : (
    <button onClick={start}>Start</button>
  );
};
