import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData, PersonalInfo, Education, Experience, Skill } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ResumeFormProps {
  resumeData: ResumeData;
  onResumeDataChange: (data: ResumeData) => void;
}

export function ResumeForm({ resumeData, onResumeDataChange }: ResumeFormProps) {
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onResumeDataChange({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  const updateSummary = (summary: string) => {
    onResumeDataChange({
      ...resumeData,
      summary
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      achievements: []
    };
    
    onResumeDataChange({
      ...resumeData,
      education: [...resumeData.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onResumeDataChange({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onResumeDataChange({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      location: ''
    };
    
    onResumeDataChange({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onResumeDataChange({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onResumeDataChange({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'technical'
    };
    
    onResumeDataChange({
      ...resumeData,
      skills: [...resumeData.skills, newSkill]
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onResumeDataChange({
      ...resumeData,
      skills: resumeData.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const removeSkill = (id: string) => {
    onResumeDataChange({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="shadow-soft">
        <CardHeader className="bg-gradient-subtle rounded-t-lg">
          <CardTitle className="text-foreground">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john.doe@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={resumeData.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
                placeholder="123 Main St, City, State 12345"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={resumeData.personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="https://www.yourwebsite.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="shadow-soft">
        <CardHeader className="bg-gradient-subtle rounded-t-lg">
          <CardTitle className="text-foreground">Professional Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            value={resumeData.summary || ''}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="A brief professional summary highlighting your key qualifications and career objectives..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="shadow-soft">
        <CardHeader className="bg-gradient-subtle rounded-t-lg flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Education</CardTitle>
          <Button onClick={addEducation} variant="gradient" size="sm">
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="border rounded-lg p-4 bg-gradient-accent">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-accent-foreground">Education #{index + 1}</h4>
                <Button 
                  onClick={() => removeEducation(edu.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University Name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="Computer Science"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>GPA</Label>
                  <Input
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {resumeData.education.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No education entries yet. Click "Add Education" to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="shadow-soft">
        <CardHeader className="bg-gradient-subtle rounded-t-lg flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Experience</CardTitle>
          <Button onClick={addExperience} variant="gradient" size="sm">
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-4 bg-gradient-accent">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-accent-foreground">Experience #{index + 1}</h4>
                <Button 
                  onClick={() => removeExperience(exp.id)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Position *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Software Engineer"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="City, State"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => {
                      updateExperience(exp.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(exp.id, 'endDate', '');
                      }
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={`current-${exp.id}`}>Current Position</Label>
                </div>
              </div>
              
              <div>
                <Label>Job Description</Label>
                <Textarea
                  value={exp.description.join('\n')}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                  placeholder="• Developed and maintained web applications&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 25%"
                  className="mt-1 min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Each line will be a separate bullet point in your resume.
                </p>
              </div>
            </div>
          ))}
          
          {resumeData.experience.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No experience entries yet. Click "Add Experience" to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="shadow-soft">
        <CardHeader className="bg-gradient-subtle rounded-t-lg flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Skills</CardTitle>
          <Button onClick={addSkill} variant="gradient" size="sm">
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {resumeData.skills.map((skill, index) => (
            <div key={skill.id} className="flex items-center space-x-4 p-3 border rounded-lg bg-gradient-accent">
              <div className="flex-1">
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  placeholder="Skill name (e.g., JavaScript, Spanish, Leadership)"
                />
              </div>
              <div className="w-32">
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="technical">Technical</option>
                  <option value="language">Language</option>
                  <option value="soft">Soft Skills</option>
                </select>
              </div>
              <Button 
                onClick={() => removeSkill(skill.id)} 
                variant="destructive" 
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {resumeData.skills.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No skills added yet. Click "Add Skill" to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}