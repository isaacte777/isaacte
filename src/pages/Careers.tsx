import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, MapPin, Clock, Code2, Briefcase, Upload, User, Mail, FileText, ArrowLeft } from "lucide-react";

const jobPositions = [
  {
    id: 1,
    title: "Fullstack Developer",
    location: "Remote / Hybrid",
    type: "Part time / Full time",
    icon: Code2,
    description: "We're looking for a talented Fullstack Developer to join our team and help build the future of affiliate marketing technology.",
    responsibilities: [
      "Develop and maintain web applications using modern technologies",
      "Collaborate with design and product teams",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and technical discussions",
    ],
  },
  {
    id: 2,
    title: "Business Development Representative",
    location: "Remote / Hybrid",
    type: "Full time",
    icon: Briefcase,
    description: "Join our growing sales team to help expand our partner network and drive business growth.",
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Build and maintain relationships with potential partners",
      "Conduct market research and competitive analysis",
      "Collaborate with the marketing team on outreach strategies",
    ],
  },
];

const Careers = () => {
  useSmoothScroll();
  useScrollToTop();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Application submitted!",
      description: "Thank you for your interest. We'll review your application and get back to you soon.",
    });
    
    setIsSubmitting(false);
    setFileName(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-container py-32 sm:py-40">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building the future of affiliate marketing. Join us and be part of something amazing.
          </p>
        </div>

        {/* Job Listings */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8">Open Positions</h2>
          <div className="space-y-6">
            {jobPositions.map((job) => (
              <div
                key={job.id}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <job.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Apply Now</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-2xl p-8 shadow-lg">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                required
                className="h-12"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className="h-12"
              />
            </div>

            {/* PDF CV */}
            <div className="space-y-2">
              <Label htmlFor="cv" className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                CV (PDF only)
              </Label>
              <div className="relative">
                <Input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".pdf"
                  required
                  onChange={handleFileChange}
                  className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </div>
              {fileName && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {fileName}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about yourself and why you're interested in joining our team..."
                required
                className="min-h-[150px] resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Application
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
