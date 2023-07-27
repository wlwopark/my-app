import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import Header from "@/components/Header";

export default function Schedule({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { packageType: string };
}) {
  const { packageType } = params;
  return (
    <section>
      <Header packageType={packageType} />
      <div className="flex" style={{ height: "100%" }}>
        <WeeklyCalendar packageType={packageType} />
        {children}
      </div>
    </section>
  );
}
