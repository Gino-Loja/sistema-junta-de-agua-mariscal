export default function StatusSkeleton() {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="h-44 bg-default-100 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-default-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-default-200 rounded w-1/2"></div>
            <div className="h-8 bg-default-200 rounded w-1/2"></div>
            <div className="h-8 bg-default-200 rounded w-1/2"></div>


          </div>
        ))}
      </div>
    );
  }