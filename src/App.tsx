import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const features = [
  'Modern React 19 tooling with Vite for lightning-fast development',
  'TypeScript and ESLint preconfigured for consistent code quality',
  'Tailwind CSS ready to help you ship polished interfaces quickly',
]

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-6 py-16">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-6">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="h-16 w-16" alt="React logo" />
          </a>
        </div>

        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Ready to build your next project
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to deploy to Netlify is already configured and committed to the repository.
          </p>
        </div>

        <ul className="grid w-full gap-3 text-left md:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-700">{feature}</p>
            </li>
          ))}
        </ul>

        <a
          href="https://docs.netlify.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
        >
          Explore Netlify docs
        </a>
      </div>
    </div>
  )
}

export default App
