import { useEffect, useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/constants/profile";
import { sendContactInquiry } from "@/services/contactService";
import { toast } from "sonner";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Platform / Cloud Systems Role Opportunity",
    message: "",
  });

  const inquiryCategories = [
    "Platform / Cloud Systems Role Opportunity",
    "Cloud Security Audit / Consulting",
    "Technical Collaboration & Systems Architecture",
    "General Inquiry",
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard!", {
        description: profile.email,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy email to clipboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactInquiry({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setIsSubmitting(false);

      if (result.success) {
        setSubmitted(true);
        toast.success("Inquiry Dispatched to Platform Gateway!", {
          description: `Thanks ${formData.name}! Your inquiry has been received and processed.`,
        });
      } else {
        // Show error / rate limit or fallback
        toast.error(result.message);

        if (result.useFallback) {
          // Open mailto fallback client
          const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
            `[Portfolio] ${formData.subject} - from ${formData.name}`
          )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.subject}\n\nMessage:\n${formData.message}`
          )}`;
          window.location.href = mailtoUrl;
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      console.error("Submission error:", err);
      toast.error("An unexpected error occurred. Opening email client as fallback...");

      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.subject} - from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.subject}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }
  };

  return (
    <Section id="contact">
      <SectionHeading
        title="Get in Touch & Credentials"
        description="Let's discuss Platform Engineering, Cloud Infrastructure, Cloud Security Audits, or Full-Time opportunities."
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7 w-full">
          <Card className="border-border/70 bg-card/60 backdrop-blur-md shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />

            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border/50">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant="secondary"
                  className="gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary font-display"
                >
                  <MessageSquare className="size-3.5" />
                  <span>Send a Direct Message</span>
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Clock className="size-3 text-emerald-500" />
                  <span>Replies in &lt; 24h</span>
                </div>
              </div>

              <CardTitle className="text-lg sm:text-xl font-bold font-display text-foreground mt-2">
                Direct Inquiry & Role Discussion
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Fill out the form below to initiate direct contact or request technical discussions.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              {submitted ? (
                <div className="py-8 flex flex-col items-center text-center gap-3 animate-in fade-in-50 duration-300">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shadow-sm">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-foreground">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
                    Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Your message has been sent. I'll get back to you within 24 hours. You can also reach me directly at{" "}
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="font-mono text-primary underline font-medium hover:text-primary/80 cursor-pointer"
                    >
                      {profile.email}
                    </button>.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 rounded-full text-xs font-semibold cursor-pointer"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "Platform / Cloud Systems Role Opportunity",
                        message: "",
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground font-display">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        required
                        type="text"
                        placeholder="e.g. Alex Rivera"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="rounded-xl border-border/70 bg-background/80 focus:border-primary/50 text-xs sm:text-sm h-10"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground font-display">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl border-border/70 bg-background/80 focus:border-primary/50 text-xs sm:text-sm h-10"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground font-display">
                      Inquiry Category
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {inquiryCategories.map((cat) => {
                        const isSelected = formData.subject === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFormData({ ...formData, subject: cat })}
                            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all text-left border cursor-pointer ${
                              isSelected
                                ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs ring-1 ring-primary/40"
                                : "border-border/60 bg-background/60 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-foreground font-display">
                        Message / Role Details <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Hi Froillan, I reviewed your FaceOfMind platform architecture and would love to connect regarding..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-xl border-border/70 bg-background/80 focus:border-primary/50 text-xs sm:text-sm min-h-[110px] resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full font-semibold text-xs sm:text-sm h-10 px-6 gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-3.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Fast Contact Channels & Resume Hub */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full">
          {/* Direct Contact Channels Card */}
          <Card className="border-border/70 bg-card/60 backdrop-blur-md shadow-md rounded-2xl sm:rounded-3xl p-4 sm:p-5">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground font-display mb-3 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <span>Direct Channels</span>
            </h4>

            <div className="flex flex-col gap-2.5">
              {/* Email One-Click Copy */}
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border/60 bg-background/80 hover:border-primary/40 transition-all group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">
                      Email Address
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-foreground truncate mt-0.5">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyEmail}
                  className="h-8 px-2.5 text-xs font-mono rounded-lg hover:bg-primary/10 text-primary shrink-0"
                  aria-label="Copy Email"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span className="ml-1 hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                </Button>
              </div>

              {/* Phone / Call */}
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border/60 bg-background/80 hover:border-primary/40 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Phone className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">
                      Phone / Mobile
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-foreground truncate mt-0.5">
                      {profile.phone}
                    </p>
                  </div>
                </div>
                <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </a>

              {/* Location & Availability */}
              <div className="flex items-start sm:items-center gap-3 p-3 rounded-xl border border-border/60 bg-background/80">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 mt-0.5 sm:mt-0">
                  <MapPin className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">
                    Current Location & Availability
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-foreground mt-0.5 leading-snug">
                    <span>{profile.location}</span>
                    <span className="text-muted-foreground/60 mx-1.5">·</span>
                    <span className="text-primary font-mono text-[11px] sm:text-xs">
                      Remote / Hybrid / Relocation
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Download Official Resume Card */}
          <Card className="border-border/70 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 backdrop-blur-md shadow-md rounded-2xl sm:rounded-3xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <FileText className="size-5" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/5 text-primary border-primary/20">
                PDF Document
              </Badge>
            </div>

            <div className="mt-3">
              <h4 className="text-sm sm:text-base font-bold font-display text-foreground">
                Official Engineering Resume
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Complete career overview, B.S. IT degree, OJT security audit case study, and FaceOfMind cloud architecture.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Button
                size="sm"
                className="w-full rounded-full font-semibold text-xs sm:text-sm h-9 gap-1.5 shadow-xs"
                onClick={() => window.open(encodeURI(profile.resumePath), "_blank")}
              >
                <Download className="size-3.5" />
                <span>Download Resume (PDF)</span>
              </Button>
            </div>
          </Card>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-3 gap-2 w-full">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/90 transition-all text-center group"
            >
              <Linkedin className="size-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold font-display text-foreground">LinkedIn</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/90 transition-all text-center group"
            >
              <Github className="size-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold font-display text-foreground">GitHub</span>
            </a>

            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/90 transition-all text-center group"
            >
              <Globe className="size-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold font-display text-foreground">Platform</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
