import Skeleton from "react-loading-skeleton";


export function ListingListSkeleton() {
  return (
    <div className="flex gap-7">
      <div className="flex flex-col gap-1">
        <Skeleton className="rounded-lg" count={1} height={300} width={300} />
        <Skeleton className="rounded-lg" count={1} height={30} width={300} />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="rounded-lg" count={1} height={300} width={300} />
        <Skeleton className="rounded-lg" count={1} height={30} width={300} />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="rounded-lg" count={1} height={300} width={300} />
        <Skeleton className="rounded-lg" count={1} height={30} width={300} />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="rounded-lg" count={1} height={300} width={300} />
        <Skeleton className="rounded-lg" count={1} height={30} width={300} />
      </div>
    </div>
  );
}


export function ListingDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 p-4">
      <div className="p-4">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <Skeleton height={790} width={790} />
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
