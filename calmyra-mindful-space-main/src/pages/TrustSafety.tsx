import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Shield, Lock, Eye, Heart, AlertCircle, CheckCircle } from "lucide-react";

const TrustSafety = () => {
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
              <Shield className="w-4 h-4" />
              Your Safety Matters
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Trust & Safety
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transparency about how we protect you and the boundaries of our service.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Privacy Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                  <Lock className="w-6 h-6 text-sage-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Privacy First
                  </h2>
                  <p className="text-muted-foreground">
                    Your mental wellness journey is personal. Here's how we protect it.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Anonymous by Default</h3>
                    <p className="text-sm text-muted-foreground">
                      No account required to use our AI chat. No personal data collected.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">No Data Selling</h3>
                    <p className="text-sm text-muted-foreground">
                      We never sell your data to third parties. Your conversations stay private.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Minimal Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      Chat history is stored locally on your device, not on our servers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Encryption</h3>
                    <p className="text-sm text-muted-foreground">
                      All communications are encrypted in transit using industry standards.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Ethics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-lavender-light flex items-center justify-center">
                  <Eye className="w-6 h-6 text-lavender-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Ethical AI Boundaries
                  </h2>
                  <p className="text-muted-foreground">
                    Our AI is designed with clear ethical guidelines.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-lavender-light/50 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">What Our AI Will Do:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Listen with empathy and validate your feelings</li>
                    <li>• Offer general coping strategies and self-care tips</li>
                    <li>• Suggest breathing exercises, journaling prompts, and grounding techniques</li>
                    <li>• Encourage seeking professional help when appropriate</li>
                    <li>• Redirect to crisis resources when distress signals are detected</li>
                  </ul>
                </div>
                <div className="bg-coral-light/50 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">What Our AI Will NEVER Do:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Diagnose mental health conditions</li>
                    <li>• Prescribe medication or treatment plans</li>
                    <li>• Replace professional therapy or counseling</li>
                    <li>• Provide crisis intervention (only redirect to professionals)</li>
                    <li>• Make claims about curing or treating medical conditions</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Limitations Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-light flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-sky-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Understanding Our Limitations
                  </h2>
                  <p className="text-muted-foreground">
                    Being honest about what we can and cannot provide.
                  </p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Calmyra is a <strong className="text-foreground">wellness support tool</strong>, not a healthcare provider. While our AI can offer emotional support and coping strategies, it cannot:
                </p>
                <ul>
                  <li>Understand the full context of your situation like a human therapist can</li>
                  <li>Pick up on non-verbal cues or nuances in communication</li>
                  <li>Provide the depth of care that comes from a therapeutic relationship</li>
                  <li>Handle medical emergencies or active crisis situations</li>
                </ul>
                <p>
                  If you're experiencing persistent mental health challenges, we strongly encourage you to work with a licensed mental health professional. Calmyra can complement professional care but should never replace it.
                </p>
              </div>
            </motion.div>

            {/* Commitment Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-sage-light rounded-2xl p-8 text-center"
            >
              <Heart className="w-10 h-10 text-sage-dark mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-3 text-sage-dark">
                Our Commitment to You
              </h2>
              <p className="text-sage-dark/80 max-w-2xl mx-auto">
                We built Calmyra because we believe everyone deserves access to mental wellness support. We're committed to being transparent, ethical, and always putting your wellbeing first. If you ever have concerns, please reach out to us.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TrustSafety;
