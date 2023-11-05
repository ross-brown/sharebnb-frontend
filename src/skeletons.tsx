import Skeleton from "react-loading-skeleton";


export function ListingListSkeleton() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8
        2xl:grid-cols-4 2xl:max-w-7xl 2xl:mx-auto">
      <div className="mt-4">
        <div className="w-full rounded-lg">
          <div className="relative aspect-square">
            <Skeleton className="absolute inset-0 w-full h-full" count={1} />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-baseline justify-between">
          <Skeleton containerClassName="rounded-lg" className="w-full" count={1} height={30} width={300} />
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full rounded-lg">
          <div className="relative aspect-square">
            <Skeleton className="absolute inset-0 w-full h-full" count={1} />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-baseline justify-between">
          <Skeleton containerClassName="rounded-lg" className="w-full" count={1} height={30} width={300} />
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full rounded-lg">
          <div className="relative aspect-square">
            <Skeleton className="absolute inset-0 w-full h-full" count={1} />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-baseline justify-between">
          <Skeleton containerClassName="rounded-lg" className="w-full" count={1} height={30} width={300} />
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full rounded-lg">
          <div className="relative aspect-square">
            <Skeleton className="absolute inset-0 w-full h-full" count={1} />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-baseline justify-between">
          <Skeleton containerClassName="rounded-lg" className="w-full" count={1} height={30} width={300} />
        </div>
      </div>
    </div>
  );
}


export function ListingDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 p-4">
      <div className="p-4">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <div className="relative aspect-square">
            <Skeleton className="absolute inset-0 w-full h-full" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-neutral-800">
          <Skeleton width={250} />
        </h1>
        <p className="text-lg font-medium text-neutral-600">
          <Skeleton width={150} />
        </p>
        <p className="text-neutral-900 text-lg mt-6">
          <Skeleton count={6} />
        </p>
        <p className="mt-4 text-lg font-medium text-neutral-600">
          <Skeleton width={100} />
        </p>
        <p className="text-lg font-medium text-neutral-600">
          <Skeleton width={100} />
        </p>
        <p className="text-lg font-medium text-neutral-600">
          <Skeleton width={100} />
        </p>
      </div>
    </div>
  );
}
