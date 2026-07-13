import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/constants/profile";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Please add a short message"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email");
    }
  };

  const onSubmit = (data: ContactForm) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`);
    const body = encodeURIComponent(
      `From: ${data.name} <${data.email}>\n\n${data.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" muted>
      <SectionHeading
        title="Contact"
        description="Say hi: internships, project work, or just a conversation."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="h-auto min-h-11 w-full justify-start py-3 sm:py-4"
            onClick={copyEmail}
          >
            {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
            <span className="flex min-w-0 flex-col items-start gap-0.5 text-left">
              <span className="truncate font-medium">{profile.email}</span>
              <span className="text-xs text-muted-foreground">
                {copied ? "Copied" : "Click to copy"}
              </span>
            </span>
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full justify-start"
            onClick={() => window.open(profile.linkedin, "_blank")}
          >
            <Linkedin data-icon="inline-start" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full justify-start"
            onClick={() => window.open(profile.github, "_blank")}
          >
            <Github data-icon="inline-start" />
            GitHub
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-11 w-full sm:w-auto">
              <Mail data-icon="inline-start" />
              Send via email
            </Button>
          </form>
        </Form>
      </div>
    </Section>
  );
}
