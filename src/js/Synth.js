import Tone from 'tone';

const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
let noteEvents = new Array(8).fill(['', 0]);

let part = new Tone.Part(function(time, note) {
  synth.triggerAttackRelease(note, '8n', time);
}, noteEvents).start(0);

export function playNote(note) {
  Tone.context.resume();
  synth.triggerAttackRelease(note, "4n");
}

export function setNotes(notes) {
  // BARS:QUARTERS:SIXTEENTHS
  const timePrefix = '0:0';
  let time = 0;
  noteEvents = notes.map((note) => {
    const eventTime = `${timePrefix}:${String(time)}`;
    time += 2;
    return [note.name, eventTime];
  });
  part.events = noteEvents;
}

export function start() {
  Tone.context.resume();
  Tone.Transport.start();
}

export function stop() {
  Tone.Transport.stop();
}