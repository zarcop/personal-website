import Image from 'next/image'
import Section from '@/components/Section'
import Timeline from '@/components/Timeline'
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
          <p className="text-base text-muted-foreground leading-relaxed">
            [I was born and raised in Mexico City, a place full of energy, creativity, and challenges. From a young age, I was curious about how things worked and how I could fix the problems around me. At first, I believed the best way to help people was through public policy, so I joined debate tournaments and worked on ideas that could make life fairer for others. But after seeing how politics often failed to bring real change, I decided I wanted to build things that could. That’s when I turned to engineering — a field that taught me how to think logically, solve problems, and turn ideas into reality. Choosing to study Industrial and Systems Engineering at Georgia Tech was my way of preparing to make a real impact, and for a time, I explored finance too, hoping to understand how money and systems could drive progress.

It was in college that I found what truly excited me: Computer Science. I realized that through code, I could create tools, design systems, and make ideas come alive. After many late nights of learning and building, my path became clear. During my internship at Google, I worked with the LearnX team to develop AI tools that help people study and learn — and it changed everything for me. Seeing technology used for something so meaningful made me realize what I wanted to do with my life. Now, my goal is simple: to use technology, data, and AI to make a positive impact on the world and give back to the country that raised me.]
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
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Order-Entry System</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Low-latency order entry system built with Redis and FastAPI. Demoed at Millennium HQ in NYC.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Python</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">FastAPI</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Redis</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Sub-50ms request/response times</p>
              <p>• Real-time order book via WebSockets</p>
              <p>• Role-based access & audit logging</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Cruise Line Database System</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Designed EERD and built optimized SQL database for complex cruise line management system.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">SQL</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Database Design</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">ER Modeling</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Optimized constraints and stored procedures</p>
              <p>• Enhanced data integrity and query performance</p>
              <p>• Scalable architecture for complex scenarios</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Commodities Trading Strategy</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced quantitative models for commodities volatility monitoring and trading.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Python</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">ARIMA</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">XGBoost</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• ARIMA and SARIMA-GARCH forecasting models</p>
              <p>• Ensemble trading strategies</p>
              <p>• Risk-adjusted performance metrics</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Financial Sector Research</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Financial modeling and valuations for institutional stocks. Influenced $2.3M portfolio decisions.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Finance</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Valuation</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">DDM</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• DDM and comparative analysis for 7 institutions</p>
              <p>• Sector Sharpe ratio of 2.79</p>
              <p>• Impactful stock pitch presentations</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
