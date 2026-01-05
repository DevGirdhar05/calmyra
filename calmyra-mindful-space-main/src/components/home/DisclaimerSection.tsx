import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const DisclaimerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-cream" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card border border-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-lavender-light flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-lavender-dark" />
              </div>
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2">
                  We're Here to Support, Not Replace
                </h2>
                <p className="text-muted-foreground">
                  Important information about what Calmyra can and cannot do
                </p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Calmyra provides <strong className="text-foreground">general emotional wellness support</strong> designed to help with everyday stress, overthinking, burnout, and low mood. Our AI companion offers a safe space for self-reflection and emotional processing.
              </p>
              <div className="bg-lavender-light/50 rounded-xl p-4 border border-lavender/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-lavender-dark mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    <strong className="text-foreground">Calmyra is NOT a substitute for:</strong> Professional therapy, psychiatric treatment, medical advice, crisis intervention, or diagnosis of mental health conditions.
                  </p>
                </div>
              </div>
              <p>
                If you're experiencing a mental health crisis, thoughts of self-harm, or need professional support, please reach out to a licensed mental health professional or crisis helpline.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/crisis">
                <Button variant="calm" size="lg" className="gap-2 w-full sm:w-auto">
                  <Phone className="w-4 h-4" />
                  View Crisis Resources
                </Button>
              </Link>
              <Link to="/trust">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Learn About Our Approach
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
