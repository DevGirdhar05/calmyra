import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Wind, BookHeart, Heart, Users, Shield } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "AI Wellness Chat",
    description: "Have a judgment-free conversation with our compassionate AI. Get emotional support for everyday stress, overthinking, and low mood.",
    color: "bg-sage-light text-sage-dark",
  },
  {
    icon: Wind,
    title: "Breathing Exercises",
    description: "Guided breathing techniques to help calm your mind, reduce anxiety, and find your center in moments of stress.",
    color: "bg-sky-light text-sky-dark",
  },
  {
    icon: BookHeart,
    title: "Journaling Prompts",
    description: "Thoughtful prompts to help you process emotions, gain clarity, and practice self-reflection at your own pace.",
    color: "bg-lavender-light text-lavender-dark",
  },
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Simple daily check-ins to understand your emotional patterns. Visual insights without any medical labels.",
    color: "bg-coral-light text-coral",
  },
  {
    icon: Users,
    title: "Therapist Discovery",
    description: "Browse verified therapists by specialty, language, and approach. Find the right support when you're ready.",
    color: "bg-sage-light text-sage-dark",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays yours. Anonymous usage, no tracking, and clear boundaries between wellness support and therapy.",
    color: "bg-lavender-light text-lavender-dark",
  },
];

export const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Everything You Need
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Tools for Your Wellness Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From quick emotional check-ins to deeper self-exploration, find what works for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
