import { useState } from 'react';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import { OverleafExport } from '@/components/OverleafExport';
import { ResumeData } from '@/types/resume';
import { FileText, Zap } from 'lucide-react';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      linkedin: '',
      github: ''
    },
    education: [],
    experience: [],
    skills: [],
    summary: ''
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-large">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8" />
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold">Professional Resume Builder</h1>
              <p className="text-primary-foreground/80">
                Create beautiful LaTeX resumes and export directly to Overleaf
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Resume Form - Left Column */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <ResumeForm 
                resumeData={resumeData}
                onResumeDataChange={setResumeData}
              />
            </div>
          </div>

          {/* Preview and Export - Right Columns */}
          <div className="xl:col-span-2 space-y-8">
            {/* Resume Preview */}
            <div className="xl:h-[600px]">
              <ResumePreview resumeData={resumeData} />
            </div>

            {/* Export Section */}
            <OverleafExport resumeData={resumeData} />
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-card rounded-lg shadow-soft p-8">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Professional Resume Builder Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-accent rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-accent-foreground mb-2">LaTeX Generation</h3>
              <p className="text-sm text-accent-foreground/80">
                Automatically converts your resume data into professional LaTeX format using the moderncv class.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-accent rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-accent-foreground mb-2">Overleaf Integration</h3>
              <p className="text-sm text-accent-foreground/80">
                One-click export to Overleaf for advanced editing, collaboration, and PDF compilation.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-accent rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded" />
              </div>
              <h3 className="font-semibold text-accent-foreground mb-2">Live Preview</h3>
              <p className="text-sm text-accent-foreground/80">
                See exactly how your resume will look as you build it with our real-time preview feature.
              </p>
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="mt-12 bg-muted rounded-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">How to Use</h2>
          <div className="space-y-3 text-foreground">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p>Fill out your personal information, education, experience, and skills in the form.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p>Watch your resume take shape in the live preview as you add information.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p>Click "Open in Overleaf" to export your resume as professional LaTeX code.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <p>Edit further in Overleaf and compile to a beautiful PDF resume.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">
            Professional Resume Builder with Overleaf Integration
          </p>
          <p className="text-sm">
            Your data is processed locally and never stored on our servers. 
            <a 
              href="https://www.overleaf.com/contact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Get help with Overleaf
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;