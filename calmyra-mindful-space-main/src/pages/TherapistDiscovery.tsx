import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Users, Star, Globe, Clock, IndianRupee, Calendar } from "lucide-react";

const therapists = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    specializations: ["Anxiety", "Depression", "Trauma"],
    languages: ["English", "Hindi"],
    experience: "12 years",
    fee: 2000,
    rating: 4.9,
    avatar: "PS",
  },
  {
    id: 2,
    name: "Dr. Arun Mehta",
    title: "Psychiatrist",
    specializations: ["Mood Disorders", "OCD", "ADHD"],
    languages: ["English", "Hindi", "Gujarati"],
    experience: "15 years",
    fee: 2500,
    rating: 4.8,
    avatar: "AM",
  },
  {
    id: 3,
    name: "Sneha Iyer",
    title: "Counseling Psychologist",
    specializations: ["Relationships", "Self-esteem", "Work Stress"],
    languages: ["English", "Tamil", "Malayalam"],
    experience: "8 years",
    fee: 1500,
    rating: 4.7,
    avatar: "SI",
  },
  {
    id: 4,
    name: "Dr. Rahul Gupta",
    title: "Clinical Psychologist",
    specializations: ["Grief", "Life Transitions", "Mindfulness"],
    languages: ["English", "Hindi"],
    experience: "10 years",
    fee: 1800,
    rating: 4.9,
    avatar: "RG",
  },
  {
    id: 5,
    name: "Anjali Das",
    title: "Art Therapist",
    specializations: ["Expressive Therapy", "Anxiety", "Children & Teens"],
    languages: ["English", "Bengali", "Hindi"],
    experience: "6 years",
    fee: 1200,
    rating: 4.8,
    avatar: "AD",
  },
  {
    id: 6,
    name: "Dr. Kavitha Nair",
    title: "Psychiatrist",
    specializations: ["Bipolar Disorder", "Schizophrenia", "Sleep Disorders"],
    languages: ["English", "Hindi", "Kannada"],
    experience: "18 years",
    fee: 3000,
    rating: 4.9,
    avatar: "KN",
  },
];

const TherapistDiscovery = () => {
  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light text-lavender-dark text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Find Support
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Discover Therapists
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse verified mental health professionals. When you're ready for professional support, we'll help you find the right match.
            </p>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-sage-light rounded-2xl p-6 text-center">
              <p className="text-sage-dark">
                <strong>Coming Soon:</strong> Online booking and video sessions. For now, browse therapists and reach out directly when you're ready.
              </p>
            </div>
          </motion.div>

          {/* Therapist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {therapists.map((therapist, index) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-lavender-light flex items-center justify-center text-lavender-dark font-display font-semibold text-lg">
                    {therapist.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold">{therapist.name}</h3>
                    <p className="text-sm text-muted-foreground">{therapist.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{therapist.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {therapist.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{therapist.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{therapist.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" />
                    <span>₹{therapist.fee}/session</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="hero" size="sm" className="flex-1 gap-2">
                    <Calendar className="w-4 h-4" />
                    Request Session
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Calmyra helps you discover therapists but does not provide therapy services directly. Session bookings and payments will be handled by individual practitioners.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TherapistDiscovery;
