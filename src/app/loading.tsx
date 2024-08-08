import LoaderComponent from "@/components/ui/loader-component";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <LoaderComponent />
    </div>
  );
}
