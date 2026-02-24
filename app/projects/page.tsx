import Image from 'next/image'
import TechBadges from '@/components/TechBadges'
import GitHubIcon from '@/components/icons/GitHub'

export const metadata = {
  title: 'Projects — Elias Zarco',
  description: 'Selected technical projects: order entry systems, analytics & ML, and full-stack applications.',
}

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl w-full py-8">
        <h2 className="mb-6 text-2xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* ——— Order Entry System at Millennium ——— */}
          <div className="flex flex-col rounded-xl border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold">Order Entry System at Millennium</h2>
            <p className="text-sm dark:text-white text-black leading-relaxed">
              Led a three-person team to design and deploy a full-stack Python order entry system for hedge fund traders;
              optimized order data retrieval with Redis caching and achieved sub-50&nbsp;ms request/response times through
              low-latency order matching using FastAPI and WebSocket, with a lightweight HTMX front end demoed at Millennium HQ in New York.
            </p>

            <div>
              <h3 className="text-sm font-semibold mb-2">Technical scope</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Asynchronous FastAPI, Redis sorted sets (price-time priority), atomic matching via Lua scripts, WebSocket
                streaming, and HTMX UI with real-time order book visualization.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 mb-3">
                <li>Sub-50&nbsp;ms latency, risk limits, multi-account support</li>
              </ul>
              <TechBadges technologies={['Python', 'FastAPI', 'Redis']} />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">In action</h3>
              <div className="rounded-lg border bg-card/40 p-2 overflow-hidden">
                <Image
                  src="/images/projects/order-entry-screenshot.png"
                  alt="Order Entry System — order book and trading interface"
                  width={800}
                  height={480}
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>

            <p className="text-sm dark:text-white text-black leading-relaxed">
              Demoed at <strong>Millennium HQ in New York</strong> — walked stakeholders through order submission, real-time matching, and risk controls.
            </p>
            <div className="rounded-lg border bg-card/40 p-2 overflow-hidden">
              <Image
                src="/images/projects/millennium-hq-team.jpg"
                alt="Team at Millennium HQ in New York"
                width={800}
                height={480}
                className="w-full h-auto rounded-md"
              />
            </div>

            <a
              href="https://github.com/zarcop/order-entry-system-millenium"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-auto pt-2"
            >
              <GitHubIcon className="h-5 w-5 flex-shrink-0" />
              zarcop/order-entry-system-millenium
            </a>
          </div>

          {/* ——— Insight for Impact (H2C2) ——— */}
          <div className="flex flex-col rounded-xl border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold">Insight for Impact</h2>
            <p className="text-sm dark:text-white text-black leading-relaxed">
              AI-powered humanitarian command center built for <strong>Hacklytics 2026</strong> (Databricks × United Nations).
              Transforms fragmented UN humanitarian data into actionable insights: 3D crisis globe, funding gap analytics,
              ML forecasts (XGBoost + Prophet), and natural-language queries via Databricks Genie — turning months of analysis into minutes of insight.
            </p>

            <div>
              <h3 className="text-sm font-semibold mb-2">Technical scope</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Full-stack Streamlit app with interactive 3D globe (Globe.gl / Three.js), Plotly charts, and a two-stage ML pipeline:
                Prophet for funding trends and XGBoost for needs/requirements prediction. Databricks Genie for conversational queries over live data.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 mb-3">
                <li>UN HNO/HRP data, mismatch scores, high-neglect-risk forecasting</li>
              </ul>
              <TechBadges technologies={['Python']} />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">In action</h3>
              <div className="rounded-lg border bg-card/40 p-2 overflow-hidden">
                <Image
                  src="/images/projects/insight-for-impact-screenshot.png"
                  alt="Insight for Impact — humanitarian dashboard and 3D globe"
                  width={800}
                  height={480}
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>

            <p className="text-sm dark:text-white text-black leading-relaxed">
              Built with <strong>Nikil Kandala</strong> for <strong>Hacklytics 2026: Golden Byte</strong> at Georgia Tech — production-ready command center in under 36 hours.
            </p>
            <div className="rounded-lg border bg-card/40 p-2 overflow-hidden">
              <Image
                src="/images/projects/insight-for-impact-team.png"
                alt="Insight for Impact team at Hacklytics 2026"
                width={800}
                height={533}
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-auto pt-2">
              <a
                href="https://github.com/Nikil456/Insight-for-Impact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <GitHubIcon className="h-5 w-5 flex-shrink-0" />
                Nikil456/Insight-for-Impact
              </a>
              <a
                href="https://devpost.com/software/insight-for-impact?ref_content=my-projects-tab&ref_feature=my_projects"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline underline-offset-4 decoration-dotted hover:decoration-solid transition-colors"
              >
                Devpost
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
