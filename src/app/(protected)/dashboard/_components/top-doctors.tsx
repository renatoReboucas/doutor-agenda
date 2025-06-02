import { Stethoscope } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";

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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Stethoscope className="text-muted-foreground" />
          <CardTitle className="text-base text-gray-900">Médicos</CardTitle>
        </div>
        <Link href="#" className="hover:text-primary text-sm text-gray-500">
          Ver todos
        </Link>
      </div>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-gray-100">
                {doctor.avatarImageUrl ? (
                  <AvatarImage
                    src={doctor.avatarImageUrl || "/placeholder.svg"}
                    alt={doctor.name}
                  />
                ) : (
                  <AvatarFallback>
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">Dr. {doctor.name}</h3>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {doctor.appointments} agend.
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
