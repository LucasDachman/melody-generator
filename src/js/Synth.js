import Tone from 'tone';

const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();



export function playNote(note) {
    Tone.context.resume();
    synth.triggerAttackRelease(note, "4n");
}
