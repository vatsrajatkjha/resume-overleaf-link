import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personalInfo, education, experience, skills, summary } = resumeData;

  return (
    <Card className="h-full shadow-large bg-card">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <CardTitle className="text-center">Resume Preview</CardTitle>
        <p className="text-center text-primary-foreground/80 text-sm">
          Professional LaTeX-style preview
        </p>
      </CardHeader>
      <CardContent className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="space-y-6 bg-background p-6 rounded-lg border">
          {/* Header */}
          <div className="text-center border-b-2 border-primary pb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.address}
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-2">
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {personalInfo.website}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  {personalInfo.linkedin}
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  {personalInfo.github}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {summary && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-3 border-b border-border pb-1">
                Summary
              </h2>
              <p className="text-foreground leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-3 border-b border-border pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-primary pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-foreground">
                        {edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-medium">{edu.institution || 'Institution'}</p>
                    {edu.gpa && (
                      <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                    )}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                        {edu.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-3 border-b border-border pb-1">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-foreground">
                        {exp.position || 'Position'}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-medium mb-2">
                      {exp.company || 'Company'} {exp.location && `• ${exp.location}`}
                    </p>
                    {exp.description && exp.description.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-foreground space-y-1">
                        {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-3 border-b border-border pb-1">
                Skills
              </h2>
              <div className="space-y-2">
                {['technical', 'language', 'soft'].map(category => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  const categoryName = category.charAt(0).toUpperCase() + category.slice(1) + 
                    (category === 'technical' ? ' Skills' : category === 'language' ? 's' : ' Skills');
                  
                  return (
                    <div key={category} className="flex">
                      <span className="font-semibold text-foreground w-32 flex-shrink-0">
                        {categoryName}:
                      </span>
                      <span className="text-muted-foreground">
                        {categorySkills.map(skill => skill.name).filter(Boolean).join(', ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!personalInfo.fullName && !summary && education.length === 0 && 
           experience.length === 0 && skills.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg mb-2">Your resume preview will appear here</p>
              <p className="text-sm">Start filling out the form to see your resume take shape!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}