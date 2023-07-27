import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import Header from "@/components/Header";
import { Reservation } from "@/types/reservation";

const reservations: Reservation[] = [
  {
    id: "1",
    classes: [
      {
        id: "1",
        tutorId: "1",
        startDate: new Date("2023-07-29 07:00"),
        endDate: new Date("2023-07-29 07:30"),
        type: "pck20",
      },
    ],
  },
];

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
        <WeeklyCalendar packageType={packageType} reservations={reservations} />
        {children}
      </div>
    </section>
  );
}
