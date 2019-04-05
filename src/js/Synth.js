import Tone from 'tone';
import _ from 'lodash';

export default class Synth {
  synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
  chords = [];
  step = 0;

  loop = new Tone.Loop((time) => {
    const nextChord = this.chanceNote();
    console.log('next chord:', nextChord)
    Tone.context.resume();
    this.synth.triggerAttackRelease(nextChord, '16n', time);
  }, '16n').start(0);

  constructor() {
    // this.loop.humanize = true;
    Tone.Transport.bpm.value = 90;
  }

  chanceChord() {
    let currentChord = this.chords[this.step] || [];
    this.step++;
    if (this.step >= this.chords.length) this.step = 0;
    // find probabilities for each note
    return currentChord.reduce((acc, curr) => {
      // 0 <= x <= 100
      const chance = Math.floor(Math.random() * 101);
      return chance <= curr.probability ? [...acc, curr.note.name] : acc;
    }, []);
  }

  chanceNote() {
    let currentChord = this.chords[this.step] || [];
    this.step++;
    if (this.step >= this.chords.length) this.step = 0;
    // fill the array {probability} times with the note name
    const arr = _.flatMap(currentChord, (note) => {
      return new Array(note.probability).fill(note.note.name);
    });
    console.log(arr);
    
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
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