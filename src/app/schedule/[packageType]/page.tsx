import Tutors from "@/components/Tutors";

export default function SchedulePage({
  params,
}: {
  params: { packageType: string };
}) {
  const { packageType } = params;

  return (
    <div style={{ position: "absolute", right: 0, height: "100%" }}>
      <Tutors packageType={packageType} />
    </div>
  );
}
