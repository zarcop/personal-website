import Image from 'next/image'
import GitHubIcon from '@/components/icons/GitHub'
import Section from '@/components/Section'
import Timeline from '@/components/Timeline'
import TechBadges from '@/components/TechBadges'
import { experience } from '@/data/experience'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Portrait Photo */}
          <div className="flex-shrink-0">
            <Image 
              src="/images/profile/professional_portrait.png" 
              alt="Elias Zarco Gonzalez" 
              width={200}
              height={200}
              className="w-48 h-48 rounded-full object-cover border-4 border-border shadow-lg"
              priority
            />
          </div>
          
          {/* Bio Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Elias Zarco</h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Industrial & Systems Engineer turned <strong>Software & Data Engineer</strong>. 
              I&apos;m a <strong>jack of all trades and interdisciplinary thinker</strong> who loves building 
              smart systems that bridge AI, real-world engineering, and finance.
            </p>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              I study <strong>Industrial & Systems Engineering</strong> (Data Science & Analytics) + 
              <strong> CS</strong> (Intelligence) at <strong>Georgia Tech</strong>. 
              With past experience at <strong>Google</strong>, I bring a mix of creative insight and 
              technical skill to everything I build — from data-driven tools to intelligent models 
              that make complex systems work smarter.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-4 text-sm">
              <a 
                href="https://drive.google.com/file/d/1GidEu3uZZTEMEmspi4-FuP4tec6E0iqy/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                📄 Resume
              </a>
              <a 
                href="https://linkedin.com/in/eliaszarcog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                💼 LinkedIn
              </a>
              <a 
                href="https://github.com/zarcop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                💻 GitHub
              </a>
              <a 
                href="mailto:eliaszarco@gmail.com" 
                className="text-primary hover:underline"
              >
                ✉️ Email
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Personal History Section */}
      <Section title="My Journey">
        <div className="prose prose-lg max-w-none">
          <p className="text-base dark:text-white text-black leading-relaxed mb-4">
          I was born and raised in Mexico City, where I grew up curious about how things worked and driven to solve real problems in my community. At first, I believed public policy was the path to creating change, so I joined debate tournaments and focused on social issues. Over time, I realized that progress often required building practical solutions — not just discussing them. That led me to pursue engineering, where I could apply analytical thinking to tangible challenges. I chose to study Industrial and Systems Engineering at Georgia Tech, exploring fields like business and finance before discovering where my true passion lay.
          </p>
          <p className="text-base dark:text-white text-black leading-relaxed mb-4">
          At Georgia Tech, I found that Computer Science combined everything I cared about — creativity, logic, and impact. Learning to code opened a new world for me, one where I could design and build systems that make a difference. My internship at Google confirmed that direction, as I worked with the LearnX team developing educational AI tools that help people learn and grow. That experience solidified my goal: to use technology, data, and AI to create meaningful, accessible solutions for my community, my country, and the world.
          </p>
        </div>
      </Section>

      {/* Work Experience Timeline */}
      <Section title="Professional Experience">
        <Timeline experiences={experience} />
      </Section>

      {/* Key Projects Section */}
      <Section title="Key Projects">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow relative">
            <h3 className="text-xl font-semibold mb-3">Order-Entry System</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Low-latency order entry system built with Redis and FastAPI. Demoed at Millennium HQ in NYC.
            </p>
            <TechBadges technologies={['Python', 'FastAPI', 'Redis']} />
            <div className="mb-4"></div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Sub-50ms request/response times</p>
              <p>• Real-time order book via WebSockets</p>
              <p>• Role-based access & audit logging</p>
            </div>
            <a
              href="https://github.com/zarcop/order-entry-system-millenium" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View project on GitHub"
              className="absolute bottom-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          </div>

          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow relative">
            <h3 className="text-xl font-semibold mb-3">Cruise Line Database System</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Designed EERD and built optimized SQL database for complex cruise line management system.
            </p>
            <TechBadges technologies={['SQL', 'Python']} />
            <div className="mb-4"></div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Optimized constraints and stored procedures</p>
              <p>• Enhanced data integrity and query performance</p>
              <p>• Scalable architecture for complex scenarios</p>
            </div>
            <a
              href="https://github.com/zarcop/CruiseLine-DatabaseSystem" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View project on GitHub"
              className="absolute bottom-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          </div>

          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow relative">
            <h3 className="text-xl font-semibold mb-3">Peohnein - Software that Matches Air Quality Data to PPE Recommendations</h3>
            <p className="text-sm text-muted-foreground mb-4">
            Engineered a real-time workplace safety app that analyzes air quality data from PurpleAir sensors to recommend PPE using the Amazon Product Advertising API.
            </p>
            <TechBadges technologies={['Python', 'Javascript', 'Node.js']} />
            <div className="mb-4"></div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Real-time air quality monitoring and API integration</p>
              <p>• Automated PPE recommendations based on safety thresholds</p>
              <p>• Interactive dashboard for workplace safety metrics</p>
            </div>
            {/* Peohnein has no GitHub link */}
          </div>
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow relative">
            <h3 className="text-xl font-semibold mb-3">Air Quality Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
            Analyzed over one million pollution data points using Python to uncover trends through correlation analysis, time-series modeling, and statistical forecasting.
            </p>
            <TechBadges technologies={['Numpy', 'Pandas', 'MatPlotlib']} />
            <div className="mb-4"></div>
            <a
              href="https://github.com/zarcop/Air-Quality-Stastical-Analysis." 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View project on GitHub"
              className="absolute bottom-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
