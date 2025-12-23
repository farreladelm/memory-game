let ctx: AudioContext | null = null;
function getCtx() {
  if (!ctx)
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

function playTone(
  freq: number,
  duration = 0.12,
  type: OscillatorType = "sine",
  when = 0
) {
  const ac = getCtx();
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  g.connect(ac.destination);
  const now = ac.currentTime + when;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
  o.start(now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  o.stop(now + duration + 0.02);
}

export function playFlip() {
  playTone(1200, 0.06, "sine");
}

export function playMatch() {
  playTone(880, 0.12, "sine");
  playTone(1320, 0.12, "sine", 0.08);
}

export function playMismatch() {
  playTone(220, 0.18, "sawtooth");
}
