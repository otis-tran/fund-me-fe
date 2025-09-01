import { Suspense } from 'react';

function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="h-12 loading-pulse w-96 mx-auto" />
          <div className="h-6 loading-pulse w-64 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-dark p-6 rounded-xl">
              <div className="h-4 loading-pulse w-24 mb-2" />
              <div className="h-8 loading-pulse w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Fund</span>
            <span className="text-slate-100">Me</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Support innovative projects with cryptocurrency. Transparent,
            decentralized, and secure funding platform.
          </p>
        </div>

        <div className="space-y-8">
          <div className="glass-dark p-8 rounded-xl text-center">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">
              Dashboard Components Coming Soon
            </h2>
            <p className="text-slate-400">
              Stats, funding form, and funders list will be implemented next.
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
