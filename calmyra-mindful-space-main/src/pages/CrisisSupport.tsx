import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, Heart, AlertTriangle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const helplines = [
  {
    name: "iCall",
    phone: "9152987821",
    description: "Psychosocial helpline by TISS. Available Mon-Sat, 8am-10pm.",
    type: "Counseling",
  },
  {
    name: "NIMHANS",
    phone: "080-46110007",
    description: "National Institute of Mental Health and Neurosciences helpline.",
    type: "Mental Health",
  },
  {
    name: "Vandrevala Foundation",
    phone: "1800-599-0019",
    description: "24/7 free mental health support. Toll-free across India.",
    type: "24/7 Support",
  },
  {
    name: "AASRA",
    phone: "9820466726",
    description: "Crisis intervention center. Available 24/7.",
    type: "Crisis Line",
  },
  {
    name: "Snehi",
    phone: "044-24640050",
    description: "Emotional support helpline based in Chennai. Available 24/7.",
    type: "Emotional Support",
  },
  {
    name: "Connecting Trust",
    phone: "9922001122",
    description: "Mental health and suicide prevention. Available 12pm-8pm.",
    type: "Prevention",
  },
];

const CrisisSupport = () => {
  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Alert Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-coral-light border border-coral/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2">
                    If you're in immediate danger
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you or someone else is in immediate physical danger, please call emergency services (112) or go to your nearest hospital emergency room right away.
                  </p>
                  <a href="tel:112">
                    <Button variant="destructive" size="lg" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Call Emergency: 112
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light text-lavender-dark text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              You're Not Alone
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Crisis Support Resources
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional help is available 24/7. These organizations are staffed by trained counselors ready to support you.
            </p>
          </motion.div>

          {/* Helpline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {helplines.map((helpline, index) => (
              <motion.div
                key={helpline.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-sage-light text-sage-dark mb-3">
                  {helpline.type}
                </span>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {helpline.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {helpline.description}
                </p>
                <a href={`tel:${helpline.phone}`}>
                  <Button variant="calm" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    {helpline.phone}
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Supportive Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-sage-light rounded-2xl p-8 text-center">
              <Heart className="w-10 h-10 text-sage-dark mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-sage-dark mb-4">
                Reaching out takes courage
              </h2>
              <p className="text-sage-dark/80 mb-6">
                Whatever you're going through, you don't have to face it alone. These feelings can be overwhelming, but with support, things can get better. Taking the step to reach out is a sign of strength, not weakness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/chat">
                  <Button variant="hero" size="lg">
                    Talk to Our AI
                  </Button>
                </Link>
                <Link to="/therapists">
                  <Button variant="heroOutline" size="lg">
                    Find a Therapist
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* International Resources */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Outside India? Find international crisis resources at{" "}
              <a
                href="https://findahelpline.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                findahelpline.com
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CrisisSupport;
