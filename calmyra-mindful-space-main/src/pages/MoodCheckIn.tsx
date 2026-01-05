import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const moods = [
  { emoji: "😊", label: "Great", value: 5, color: "bg-sage-light text-sage-dark border-sage/30" },
  { emoji: "🙂", label: "Good", value: 4, color: "bg-sky-light text-sky-dark border-sky/30" },
  { emoji: "😐", label: "Okay", value: 3, color: "bg-cream text-foreground border-cream-dark" },
  { emoji: "😔", label: "Low", value: 2, color: "bg-lavender-light text-lavender-dark border-lavender/30" },
  { emoji: "😢", label: "Rough", value: 1, color: "bg-coral-light text-coral border-coral/30" },
];

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem("calmyra-moods");
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);

  const saveMood = () => {
    if (selectedMood === null) return;

    const newEntry: MoodEntry = {
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note.trim() || undefined,
    };

    const updatedEntries = [newEntry, ...entries].slice(0, 30); // Keep last 30 days
    setEntries(updatedEntries);
    localStorage.setItem("calmyra-moods", JSON.stringify(updatedEntries));

    toast.success("Mood saved! Take care of yourself 💚");
    setSelectedMood(null);
    setNote("");
  };

  const getWeeklyData = () => {
    const lastWeek = entries.slice(0, 7);
    return lastWeek.reverse();
  };

  const getMoodLabel = (value: number) => {
    return moods.find(m => m.value === value)?.label || "Unknown";
  };

  const getMoodEmoji = (value: number) => {
    return moods.find(m => m.value === value)?.emoji || "😐";
  };

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-light text-coral text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Daily Check-In
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              How Are You Feeling?
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Take a moment to check in with yourself. There's no right or wrong answer.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Mood Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-8 mb-8"
            >
              <h2 className="font-display text-xl font-semibold text-center mb-6">
                Select your mood
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      selectedMood === mood.value
                        ? `${mood.color} scale-110 shadow-card`
                        : "bg-muted/50 border-transparent hover:border-border"
                    }`}
                  >
                    <span className="text-3xl mb-2">{mood.emoji}</span>
                    <span className="text-sm font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>

              {selectedMood !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Want to add a note about how you're feeling? (optional)"
                    className="mb-4 rounded-xl"
                    rows={3}
                  />
                  <Button onClick={saveMood} variant="hero" size="lg" className="w-full">
                    Save Check-In
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Weekly Summary */}
            {entries.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold">
                      Your Week
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    {showHistory ? "Hide" : "View All"}
                  </Button>
                </div>

                {/* Visual Week */}
                <div className="flex justify-between gap-2 mb-6">
                  {[...Array(7)].map((_, i) => {
                    const entry = getWeeklyData()[i];
                    return (
                      <div key={i} className="flex-1 text-center">
                        <div
                          className={`h-16 rounded-lg flex items-center justify-center mb-2 ${
                            entry
                              ? moods.find(m => m.value === entry.mood)?.color || "bg-muted"
                              : "bg-muted/30"
                          }`}
                        >
                          <span className="text-xl">
                            {entry ? getMoodEmoji(entry.mood) : "·"}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {entry
                            ? new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })
                            : "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-border pt-6 space-y-3"
                  >
                    {entries.slice(0, 14).map((entry, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
                      >
                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          {entry.note && (
                            <p className="text-sm mt-1">{entry.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Tracking your mood helps you understand patterns. This is for your awareness, not diagnosis.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MoodCheckIn;
