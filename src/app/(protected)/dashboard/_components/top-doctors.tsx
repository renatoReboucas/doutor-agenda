import { Stethoscope } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface DoctorsListProps {
  doctors: {
    id: string;
    name: string;
    avatarImageUrl: string | null;
    specialty: string;
    appointments: number;
  }[];
}

export default function TopDoctors({ doctors }: DoctorsListProps) {
  return (
    <Card className="rounded-lg bg-white p-5 shadow-sm">
      <CardContent>
        <div className="flex items-center gap-2">
          <Stethoscope className="text-muted-foreground" />
          <CardTitle className="text-base text-gray-900">Médicos</CardTitle>
        </div>
      </CardContent>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm">Dr. {doctor.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {doctor.specialty}
                </p>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">
              {doctor.appointments} agend.
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
