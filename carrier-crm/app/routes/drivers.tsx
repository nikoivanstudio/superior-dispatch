function PlaceholderCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="flex flex-1 flex-col gap-4 px-6 py-8 md:px-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Protected route
      </p>
      <div className="rounded-3xl border border-border bg-card p-6 text-left shadow-sm">
        <h1 className="m-0 text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}

export default function DriversRoute() {
  return (
    <PlaceholderCard
      title="Drivers"
      description="This protected page is a placeholder so routing, SSR redirects, and layout navigation can be verified before business screens are moved over."
    />
  );
}
