import Tone from 'tone';

export default class Synth {
  synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
  chords = [];
  step = 0;

  loop = new Tone.Loop((time) => {
    this.synth.triggerAttackRelease(this.chords[this.step], '8n', time);
    this.step++;
    if (this.step >= this.chords.length) this.step = 0;
  }, '8n').start(0);

  constructor() {
    this.loop.humanize = true;
  }

  playNote(note) {
    Tone.context.resume();
    this.synth.triggerAttackRelease(note, "4n");
  }

  setNotes(chords) {
    this.chords = chords;
  }

  start() {
    Tone.context.resume();
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }
}