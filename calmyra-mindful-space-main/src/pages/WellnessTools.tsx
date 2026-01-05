import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Wind, BookHeart, Leaf, Timer } from "lucide-react";

type Tool = "breathing" | "journaling" | "grounding" | null;

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(0);

  const startExercise = () => {
    setIsActive(true);
    setPhase("inhale");
    setCount(0);

    const runCycle = (currentPhase: "inhale" | "hold" | "exhale", elapsed: number) => {
      if (elapsed >= 12) {
        setCount(c => c + 1);
        if (count < 3) {
          runCycle("inhale", 0);
        } else {
          setIsActive(false);
        }
        return;
      }

      if (elapsed < 4) {
        setPhase("inhale");
      } else if (elapsed < 8) {
        setPhase("hold");
      } else {
        setPhase("exhale");
      }

      setTimeout(() => runCycle(phase, elapsed + 1), 1000);
    };

    runCycle("inhale", 0);
  };

  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-8">
        <motion.div
          animate={isActive ? {
            scale: phase === "inhale" ? 1.3 : phase === "hold" ? 1.3 : 1,
          } : {}}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-sky-light border-4 border-sky/30 flex items-center justify-center"
        >
          <span className="font-display text-xl text-sky-dark capitalize">
            {isActive ? phase : "Ready"}
          </span>
        </motion.div>
      </div>
      <p className="text-muted-foreground mb-6">
        {isActive
          ? "Follow the circle: breathe in as it expands, hold, then exhale as it shrinks."
          : "4-4-4 Box Breathing: Inhale for 4 seconds, hold for 4, exhale for 4."}
      </p>
      <Button
        onClick={startExercise}
        disabled={isActive}
        variant="hero"
        size="lg"
      >
        {isActive ? `Cycle ${count + 1} of 4` : "Start Breathing Exercise"}
      </Button>
    </div>
  );
};

const journalingPrompts = [
  "What emotion are you feeling most strongly right now? Describe it without judgment.",
  "What's one small thing that brought you comfort today?",
  "If your stress could speak, what would it tell you it needs?",
  "Write a letter of compassion to yourself as if you were writing to a dear friend.",
  "What's something you're grateful for, even in this difficult moment?",
  "Describe a moment when you felt at peace. What made it peaceful?",
  "What would you tell your younger self about handling difficult emotions?",
  "What's one boundary you'd like to set for your mental wellbeing?",
];

const JournalingPrompts = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const nextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % journalingPrompts.length);
  };

  return (
    <div className="text-center max-w-lg mx-auto">
      <motion.div
        key={currentPrompt}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-lavender-light rounded-2xl p-8 mb-6"
      >
        <BookHeart className="w-8 h-8 text-lavender-dark mx-auto mb-4" />
        <p className="text-lg text-foreground leading-relaxed">
          "{journalingPrompts[currentPrompt]}"
        </p>
      </motion.div>
      <p className="text-muted-foreground text-sm mb-6">
        Take your time to reflect on this prompt. There's no right or wrong answer.
      </p>
      <Button onClick={nextPrompt} variant="calm" size="lg">
        Get Another Prompt
      </Button>
    </div>
  );
};

const GroundingExercise = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { sense: "See", count: 5, prompt: "Name 5 things you can see right now" },
    { sense: "Touch", count: 4, prompt: "Notice 4 things you can touch or feel" },
    { sense: "Hear", count: 3, prompt: "Listen for 3 sounds around you" },
    { sense: "Smell", count: 2, prompt: "Identify 2 things you can smell" },
    { sense: "Taste", count: 1, prompt: "Notice 1 thing you can taste" },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-sage-light rounded-2xl p-8 mb-6"
      >
        <div className="w-16 h-16 rounded-full bg-sage/20 mx-auto mb-4 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-sage-dark">
            {steps[step].count}
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">
          {steps[step].sense}
        </h3>
        <p className="text-muted-foreground">{steps[step].prompt}</p>
      </motion.div>
      <p className="text-muted-foreground text-sm mb-6">
        The 5-4-3-2-1 technique helps ground you in the present moment.
      </p>
      <Button onClick={nextStep} variant="hero" size="lg">
        {step < steps.length - 1 ? "Next Sense" : "Start Over"}
      </Button>
    </div>
  );
};

const WellnessTools = () => {
  const [activeTool, setActiveTool] = useState<Tool>(null);

  const tools = [
    {
      id: "breathing" as Tool,
      name: "Breathing Exercises",
      description: "Calm your mind with guided breathing techniques",
      icon: Wind,
      color: "bg-sky-light text-sky-dark",
    },
    {
      id: "journaling" as Tool,
      name: "Journaling Prompts",
      description: "Reflect and process your emotions through writing",
      icon: BookHeart,
      color: "bg-lavender-light text-lavender-dark",
    },
    {
      id: "grounding" as Tool,
      name: "Grounding Exercise",
      description: "Connect to the present with the 5-4-3-2-1 technique",
      icon: Leaf,
      color: "bg-sage-light text-sage-dark",
    },
  ];

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light text-sage-dark text-sm font-medium mb-4">
              <Timer className="w-4 h-4" />
              Self-Care Tools
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Wellness Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quick exercises to help you relax, reflect, and reset. Choose what feels right for you.
            </p>
          </motion.div>

          {!activeTool ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.button
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveTool(tool.id)}
                    className="p-8 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300 text-left group"
                  >
                    <div className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tool.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setActiveTool(null)}
                className="mb-8"
              >
                ← Back to Tools
              </Button>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border p-8 lg:p-12"
              >
                {activeTool === "breathing" && <BreathingExercise />}
                {activeTool === "journaling" && <JournalingPrompts />}
                {activeTool === "grounding" && <GroundingExercise />}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WellnessTools;
