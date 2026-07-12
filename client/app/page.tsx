export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            AI CSV Importer
          </h1>

          <p className="mt-3 text-slate-600">
            Upload a CSV file and let AI extract CRM lead information.
          </p>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-slate-500">
            Upload component coming next...
          </p>
        </section>
      </div>
    </main>
  );
}