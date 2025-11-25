"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  IconButton,
  Chip,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import WorkIcon from "@mui/icons-material/Work";
import { jsPDF } from "jspdf";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa: string;
}

interface ResumeData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;

  // Professional Summary
  summary: string;

  // Experience
  experiences: Experience[];

  // Education
  education: Education[];

  // Skills
  skills: string[];

  // Template
  template: "modern" | "classic" | "creative";
}

export default function ResumeBuilder({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
    experiences: [
      {
        id: 1,
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        currentJob: false,
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        degree: "",
        institution: "",
        location: "",
        graduationYear: "",
        gpa: "",
      },
    ],
    skills: [],
    template: "modern",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleInputChange = (field: keyof ResumeData, value: string) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTemplateChange = (event: SelectChangeEvent) => {
    setResumeData((prev) => ({
      ...prev,
      template: event.target.value as "modern" | "classic" | "creative",
    }));
  };

  // Experience handlers
  const handleExperienceChange = (
    id: number,
    field: keyof Experience,
    value: string | boolean
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addExperience = () => {
    const newId = Math.max(...resumeData.experiences.map((e) => e.id), 0) + 1;
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: newId,
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          currentJob: false,
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: number) => {
    if (resumeData.experiences.length === 1) {
      toolState.actions.showMessage("Resume must have at least one experience");
      return;
    }
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  // Education handlers
  const handleEducationChange = (
    id: number,
    field: keyof Education,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addEducation = () => {
    const newId = Math.max(...resumeData.education.map((e) => e.id), 0) + 1;
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          degree: "",
          institution: "",
          location: "",
          graduationYear: "",
          gpa: "",
        },
      ],
    }));
  };

  const removeEducation = (id: number) => {
    if (resumeData.education.length === 1) {
      toolState.actions.showMessage(
        "Resume must have at least one education entry"
      );
      return;
    }
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Skills handlers
  const addSkill = () => {
    if (skillInput.trim() && !resumeData.skills.includes(skillInput.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const generatePDF = () => {
    try {
      const pdf = new jsPDF();
      let yPos = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Helper function to add text with wrapping
      const addWrappedText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        lineHeight: number = 6
      ): number => {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + lines.length * lineHeight;
      };

      // Header - Name and Contact
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text(resumeData.fullName || "Your Name", margin, yPos);
      yPos += 10;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const contactInfo = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
      ]
        .filter(Boolean)
        .join(" | ");
      pdf.text(contactInfo, margin, yPos);
      yPos += 5;

      if (resumeData.linkedin || resumeData.website) {
        const links = [resumeData.linkedin, resumeData.website]
          .filter(Boolean)
          .join(" | ");
        pdf.text(links, margin, yPos);
        yPos += 8;
      } else {
        yPos += 3;
      }

      // Professional Summary
      if (resumeData.summary) {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Professional Summary", margin, yPos);
        yPos += 7;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        yPos = addWrappedText(resumeData.summary, margin, yPos, contentWidth);
        yPos += 8;
      }

      // Work Experience
      if (resumeData.experiences.some((exp) => exp.jobTitle || exp.company)) {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Work Experience", margin, yPos);
        yPos += 7;

        resumeData.experiences.forEach((exp) => {
          if (exp.jobTitle || exp.company) {
            if (yPos > 270) {
              pdf.addPage();
              yPos = 20;
            }

            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text(exp.jobTitle || "Position", margin, yPos);
            yPos += 6;

            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            const companyLine = [
              exp.company,
              exp.location,
              exp.currentJob ? "Present" : exp.endDate || "",
            ]
              .filter(Boolean)
              .join(" | ");
            pdf.text(companyLine, margin, yPos);
            yPos += 6;

            if (exp.description) {
              yPos = addWrappedText(
                exp.description,
                margin,
                yPos,
                contentWidth
              );
            }
            yPos += 6;
          }
        });
        yPos += 2;
      }

      // Education
      if (resumeData.education.some((edu) => edu.degree || edu.institution)) {
        if (yPos > 250) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Education", margin, yPos);
        yPos += 7;

        resumeData.education.forEach((edu) => {
          if (edu.degree || edu.institution) {
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text(edu.degree || "Degree", margin, yPos);
            yPos += 6;

            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            const eduLine = [edu.institution, edu.location, edu.graduationYear]
              .filter(Boolean)
              .join(" | ");
            pdf.text(eduLine, margin, yPos);
            yPos += 6;

            if (edu.gpa) {
              pdf.text(`GPA: ${edu.gpa}`, margin, yPos);
              yPos += 6;
            }
          }
        });
        yPos += 2;
      }

      // Skills
      if (resumeData.skills.length > 0) {
        if (yPos > 260) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Skills", margin, yPos);
        yPos += 7;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        const skillsText = resumeData.skills.join(", ");
        yPos = addWrappedText(skillsText, margin, yPos, contentWidth);
      }

      pdf.save(`${resumeData.fullName.replace(/\s+/g, "_") || "resume"}.pdf`);
      toolState.actions.showMessage("Resume downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toolState.actions.showMessage("Error generating PDF");
    }
  };

  const clearAll = () => {
    setResumeData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      summary: "",
      experiences: [
        {
          id: 1,
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          currentJob: false,
          description: "",
        },
      ],
      education: [
        {
          id: 1,
          degree: "",
          institution: "",
          location: "",
          graduationYear: "",
          gpa: "",
        },
      ],
      skills: [],
      template: "modern",
    });
    toolState.actions.showMessage("Resume cleared");
  };

  const buttons = [
    {
      type: "custom" as const,
      text: "Download PDF",
      onClick: generatePDF,
      icon: <DownloadIcon />,
      variant: "contained" as const,
    },
    {
      type: "custom" as const,
      text: "Clear All",
      onClick: clearAll,
      color: "error" as const,
    },
    ...createCommonButtons({
      onFullScreen: toolState.toggleFullScreen,
    }),
  ];

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Free Resume Builder - Create Professional Resume"
        description="Build your professional resume online for free. Choose from modern templates, add your experience, education, and skills. Download as PDF instantly."
        exampleCode="Create ATS-friendly resume"
        exampleOutput="Professional PDF resume"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="space-y-6">
        {/* Template Selection */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <WorkIcon /> Template
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Resume Template</InputLabel>
              <Select
                value={resumeData.template}
                label="Resume Template"
                onChange={handleTemplateChange}
              >
                <MenuItem value="modern">Modern</MenuItem>
                <MenuItem value="classic">Classic</MenuItem>
                <MenuItem value="creative">Creative</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Personal Information
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Full Name"
                value={resumeData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={resumeData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                value={resumeData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                fullWidth
              />
              <TextField
                label="Location"
                value={resumeData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                fullWidth
              />
              <TextField
                label="LinkedIn URL"
                value={resumeData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                fullWidth
              />
              <TextField
                label="Website/Portfolio"
                value={resumeData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                fullWidth
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Professional Summary
            </Typography>
            <TextField
              label="Summary"
              value={resumeData.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder="Write a brief professional summary highlighting your key qualifications and career objectives..."
            />
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">Work Experience</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addExperience}
                variant="outlined"
                size="small"
              >
                Add Experience
              </Button>
            </div>

            {resumeData.experiences.map((exp, index) => (
              <div key={exp.id} className="mb-6 pb-6 border-b last:border-b-0">
                <div className="flex justify-between items-center mb-3">
                  <Typography variant="subtitle2" className="font-semibold">
                    Experience #{index + 1}
                  </Typography>
                  {resumeData.experiences.length > 1 && (
                    <IconButton
                      onClick={() => removeExperience(exp.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "jobTitle", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Company"
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "company", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Location"
                    value={exp.location}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "location", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Start Date"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="End Date"
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "endDate", e.target.value)
                    }
                    fullWidth
                    disabled={exp.currentJob}
                    InputLabelProps={{ shrink: true }}
                  />
                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.currentJob}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "currentJob",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">I currently work here</span>
                    </label>
                  </div>
                </div>

                <TextField
                  label="Job Description"
                  value={exp.description}
                  onChange={(e) =>
                    handleExperienceChange(
                      exp.id,
                      "description",
                      e.target.value
                    )
                  }
                  fullWidth
                  multiline
                  rows={3}
                  className="mt-4"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">Education</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addEducation}
                variant="outlined"
                size="small"
              >
                Add Education
              </Button>
            </div>

            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-6 pb-6 border-b last:border-b-0">
                <div className="flex justify-between items-center mb-3">
                  <Typography variant="subtitle2" className="font-semibold">
                    Education #{index + 1}
                  </Typography>
                  {resumeData.education.length > 1 && (
                    <IconButton
                      onClick={() => removeEducation(edu.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "degree", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      handleEducationChange(
                        edu.id,
                        "institution",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                  <TextField
                    label="Location"
                    value={edu.location}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "location", e.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Graduation Year"
                    value={edu.graduationYear}
                    onChange={(e) =>
                      handleEducationChange(
                        edu.id,
                        "graduationYear",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                  <TextField
                    label="GPA (Optional)"
                    value={edu.gpa}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "gpa", e.target.value)
                    }
                    fullWidth
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Skills
            </Typography>
            <div className="flex gap-2 mb-4">
              <TextField
                label="Add Skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                fullWidth
                placeholder="e.g., JavaScript, Project Management"
              />
              <Button
                startIcon={<AddIcon />}
                onClick={addSkill}
                variant="contained"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => removeSkill(skill)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </div>

            {resumeData.skills.length === 0 && (
              <Alert severity="info" className="mt-2">
                Add your skills to make your resume stand out
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="body2" className="text-sm">
              <strong>Tips:</strong> Fill in your information, choose a
              template, and click &quot;Download PDF&quot; to generate your
              professional resume. Make sure to proofread all information before
              downloading.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
