import Tone from 'tone';

const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
let chords = [];

let step = 0;
let loop = new Tone.Loop(function(time) {
  console.log(chords[step]);
  
  synth.triggerAttackRelease(chords[step], '8n', time);
  step++;
  if (step >= chords.length) step = 0;
}, '8n').start(0);
loop.humanize = true;

export function playNote(note) {
  Tone.context.resume();
  synth.triggerAttackRelease(note, "4n");
}

export function setNotes(notes) {
  chords = notes;
}

export function start() {
  Tone.context.resume();
  Tone.Transport.start();
}

export function stop() {
  Tone.Transport.stop();
}