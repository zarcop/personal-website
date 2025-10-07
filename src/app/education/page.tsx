'use client';


import { education } from '@/data/education';
import { formatDateRange } from '@/lib/utils';

export default function EducationPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
            Education
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My academic journey and educational background.
          </p>
        </div>

        {/* Education List */}
        <div className="space-y-16">
          {education.map((edu) => (
            <EducationItem key={edu.id} education={edu} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EducationItem({ education }: { education: any }) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-medium text-foreground mb-1">
            {education.degree} {education.field}
          </h3>
          <p className="text-lg text-muted-foreground mb-2">
            {education.institution}
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            {formatDateRange(education.startDate, education.endDate)} • {education.location}
          </p>
          {education.gpa && (
            <p className="text-sm text-muted-foreground mb-3">
              GPA: {education.gpa}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {education.honors && education.honors.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">Honors & Achievements</h4>
            <ul className="space-y-2">
              {education.honors.map((honor: string, idx: number) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-foreground mt-1 flex-shrink-0">•</span>
                  <span>{honor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {education.relevantCoursework && education.relevantCoursework.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">Relevant Coursework</h4>
            <div className="flex flex-wrap gap-3">
              {education.relevantCoursework.map((course: string) => (
                <span
                  key={course}
                  className="text-sm text-muted-foreground"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.activities && education.activities.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">Activities & Societies</h4>
            <div className="flex flex-wrap gap-3">
              {education.activities.map((activity: string) => (
                <span
                  key={activity}
                  className="text-sm text-muted-foreground"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
