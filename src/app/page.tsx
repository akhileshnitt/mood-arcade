'use client';

import {
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const moodDeck = [
  {
    id: "amped",
    label: "Amped",
    emoji: "⚡️",
    blurb: "Reroute the static into something bright.",
    gradient: "from-amber-400 via-rose-500 to-fuchsia-600",
    badge: "Energy Remix",
    soundtrack: "Hyperfocus Lofi",
    activities: [
      {
        id: "breath",
        title: "Breath Loop",
        duration: "2 min",
        description: "Ride a glowing inhale/exhale loop to reset your nervous system.",
        component: "breath" as const,
      },
      {
        id: "smash",
        title: "Color Smash",
        duration: "60 s",
        description: "Pop the matching bubble, chase mini wins, rack up sparks.",
        component: "smash" as const,
      },
      {
        id: "prompt",
        title: "Micro Mission",
        duration: "any",
        description: "Send a voice note to Future You describing one thing you're proud of today.",
        component: "prompt" as const,
      },
    ],
  },
  {
    id: "meh",
    label: "Meh",
    emoji: "🌀",
    blurb: "When everything is beige, paint louder.",
    gradient: "from-sky-400 via-cyan-400 to-emerald-400",
    badge: "Mood Graffiti",
    soundtrack: "Sparkle Pop Breaks",
    activities: [
      {
        id: "breath",
        title: "Wave Breathing",
        duration: "2 min",
        description: "Slow tide inhale / exhale to bring the spark back online.",
        component: "breath" as const,
      },
      {
        id: "doodle",
        title: "Doodle Pad",
        duration: "3 min",
        description: "Sketch the weirdest creature you can imagine in one stroke.",
        component: "doodle" as const,
      },
      {
        id: "prompt",
        title: "Quest Card",
        duration: "90 s",
        description: "Text a friend a random photo from your camera roll with no context.",
        component: "prompt" as const,
      },
    ],
  },
  {
    id: "foggy",
    label: "Foggy",
    emoji: "🌫️",
    blurb: "Gentle structure, soft lights, zero pressure.",
    gradient: "from-indigo-500 via-purple-500 to-blue-500",
    badge: "Soft Reboot",
    soundtrack: "Cloud Steps",
    activities: [
      {
        id: "breath",
        title: "Glow Orbit",
        duration: "2 min",
        description: "Orbiting light cues you to inhale for 4, exhale for 6.",
        component: "breath" as const,
      },
      {
        id: "smash",
        title: "Color Bloom",
        duration: "45 s",
        description: "Tap chill tones to gently wake up your senses.",
        component: "smash" as const,
      },
      {
        id: "prompt",
        title: "Grounding Cue",
        duration: "2 min",
        description: "List 3 textures within arm's reach and describe them out loud.",
        component: "prompt" as const,
      },
    ],
  },
];

type ActivityType = "breath" | "smash" | "doodle" | "prompt";

type Activity = {
  id: string;
  title: string;
  duration: string;
  description: string;
  component: ActivityType;
};

type Mood = (typeof moodDeck)[number];

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood>(moodDeck[0]);
  const [promptShuffle, setPromptShuffle] = useState(0);

  const promptCopy = useMemo(() => {
    const prompts = [
      "Say one sentence about what tiny thing you're grateful for.",
      "Do a 10-second stretch and describe how it felt in notes.",
      "Record a 5-second beat using your desk as percussion.",
      "Write a one-line haiku about your current weather.",
    ];

    return prompts[promptShuffle % prompts.length];
  }, [promptShuffle]);

  const shufflePrompt = () => setPromptShuffle((prev) => prev + 1);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    shufflePrompt();
  };

  return (
    <div className="min-h-screen px-6 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60">
                Gen Z Mental Reset Lab
              </p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Mood Arcade
              </h1>
            </div>
            <div className="flex gap-3">
              <button className="rounded-full border border-white/25 px-5 py-2 text-sm font-medium text-white/90 transition hover:border-white hover:bg-white/10">
                Daily Drop
              </button>
              <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-lime-200">
                Claim Arcade Pass
              </button>
            </div>
          </div>
          <p className="max-w-3xl text-lg text-white/70">
            Tap into playful micro-interventions designed for fast mood pivots.
            Every deck pulls in tactile mini-games, breathing cues, and
            low-pressure prompts so your brain gets a joyful dopamine sweep.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-white/60">
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono uppercase tracking-[0.25em]">
              5 min loops
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono uppercase tracking-[0.25em]">
              tactile wins
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono uppercase tracking-[0.25em]">
              science x play
            </span>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {moodDeck.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 p-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                selectedMood.id === mood.id
                  ? "bg-white/15 shadow-[0_0_35px_rgba(255,255,255,0.18)]"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <div
                className={`absolute inset-0 opacity-40 blur-3xl transition group-hover:opacity-70 ${
                  selectedMood.id === mood.id ? "opacity-80" : ""
                } bg-gradient-to-tr ${mood.gradient}`}
              />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-white/70">
                    {mood.badge}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold">{mood.label}</p>
                  <p className="text-sm text-white/70">{mood.blurb}</p>
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/70">
                  {mood.soundtrack}
                </p>
              </div>
            </button>
          ))}
        </section>

        <AnimatePresence mode="wait">
          <motion.section
            key={selectedMood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:grid-cols-[1.3fr_1fr]"
          >
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/60">
                  Current Deck
                </p>
                <h2 className="text-3xl font-semibold text-white">
                  {selectedMood.emoji} {selectedMood.label}
                </h2>
                <p className="mt-2 text-white/70">{selectedMood.blurb}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedMood.activities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    prompt={promptCopy}
                    onShuffle={shufflePrompt}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-5">
              <div>
                <p className="text-sm text-white/70">Arcade Fuel</p>
                <p className="text-3xl font-semibold">{selectedMood.badge}</p>
                <p className="text-sm text-white/60">Soundtrack: {selectedMood.soundtrack}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                  Scoreboard
                </p>
                <p className="mt-2 text-4xl font-semibold text-lime-200">
                  <ScoreTicker />
                </p>
                <p className="text-xs text-white/60">tiny wins logged today</p>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• 20k+ micro-sessions completed</li>
                <li>• Built with therapists + vibe designers</li>
                <li>• Privacy-first, zero-signup beta</li>
              </ul>
              <button className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900">
                Start 5-Min Ritual
              </button>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ActivityCard({
  activity,
  prompt,
  onShuffle,
}: {
  activity: Activity;
  prompt: string;
  onShuffle: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/15 bg-slate-950/60 p-4">
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-[0.4em] text-white/50">
          {activity.duration}
        </p>
        <h3 className="text-xl font-semibold">{activity.title}</h3>
        <p className="text-sm text-white/70">{activity.description}</p>
      </div>
      <div className="flex-1">
        {activity.component === "breath" && <BreathLoop />}
        {activity.component === "smash" && <ColorSmash />}
        {activity.component === "doodle" && <DoodlePad />}
        {activity.component === "prompt" && (
          <PromptCard prompt={prompt} onShuffle={onShuffle} />
        )}
      </div>
    </div>
  );
}

const breathPhases = [
  { label: "inhale", seconds: 3 },
  { label: "hold", seconds: 1 },
  { label: "exhale", seconds: 4 },
];

function BreathLoop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % breathPhases.length);
    }, breathPhases[index].seconds * 1000);

    return () => clearTimeout(timer);
  }, [index]);

  const current = breathPhases[index];
  const scale = current.label === "inhale" ? "scale(1)" : current.label === "hold" ? "scale(0.9)" : "scale(0.7)";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-white/40 to-transparent text-slate-900"
        style={{
          transform: scale,
          transition: "transform 1s ease-in-out",
          boxShadow: "0 0 40px rgba(255,255,255,0.35)",
        }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900">
          {current.label}
        </p>
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
        {current.seconds}s
      </p>
    </div>
  );
}

const colorPalette = ["#ffc6ff", "#caffbf", "#9bf6ff", "#ffd6a5", "#bdb2ff"];

const pseudoRandomIndex = (seed: number, length: number) => {
  const raw = Math.abs(Math.sin((seed + 1) * 9301 + 49297) * 233280);
  return Math.floor((raw - Math.floor(raw)) * length) % length;
};

function ColorSmash() {
  const palette = colorPalette;
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState(1);
  const targetIndex = pseudoRandomIndex(seed, palette.length);

  const bump = (idx: number) => {
    if (idx === targetIndex) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
    }
    setSeed((prev) => prev + 1);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/60">
        Tap color: <span style={{ color: palette[targetIndex] }}>●</span>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {palette.map((color, idx) => (
          <button
            key={color}
            style={{ background: color }}
            onClick={() => bump(idx)}
            className="h-12 w-12 rounded-2xl transition hover:scale-110"
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-white/70">Score: {score}</p>
    </div>
  );
}

function DoodlePad() {
  const [strokes, setStrokes] = useState<string[]>([]);

  const handleDraw = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const spread = 20 + Math.random() * 30;
    const squiggle = `M${x - 10} ${y} Q ${x} ${y - spread} ${x + 10} ${y}`;
    setStrokes((prev) => [...prev.slice(-12), squiggle]);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div
        className="relative h-40 cursor-crosshair rounded-2xl border border-dashed border-white/20 bg-slate-900/70"
        onClick={handleDraw}
      >
        {strokes.length === 0 && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-white/60">
            Tap to doodle a squiggle
          </p>
        )}
        <svg className="pointer-events-none absolute inset-0" viewBox="0 0 100 100">
          {strokes.map((d, idx) => (
            <path
              key={`${d}-${idx}`}
              d={d}
              stroke={`hsl(${(idx * 40) % 360} 80% 70%)`}
              strokeWidth={2}
              fill="transparent"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
      <p className="text-xs text-white/60">
        Keep tapping to layer colors. Screenshot the chaos and send it to a friend.
      </p>
    </div>
  );
}

function PromptCard({
  prompt,
  onShuffle,
}: {
  prompt: string;
  onShuffle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-gradient-to-br from-white/15 to-transparent p-4 text-sm text-white/80">
      <p>{prompt}</p>
      <button
        onClick={onShuffle}
        className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-lime-200"
      >
        Shuffle ↺
      </button>
    </div>
  );
}

function ScoreTicker() {
  const [score, setScore] = useState(128);

  useEffect(() => {
    const timer = setInterval(() => {
      setScore((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return <span>{score}</span>;
}
