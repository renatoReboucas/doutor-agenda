import { Calendar, DollarSign, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalRevenue: number | null;
  totalAppointments: number;
  totalDoctors: number;
  totalPatients: number;
}

const StatsCards = ({
  totalRevenue,
  totalAppointments,
  totalDoctors,
  totalPatients,
}: StatsCardsProps) => {
  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
          <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
            <DollarSign className="text-primary size-4" />
          </div>
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Faturamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalRevenue
              ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalRevenue / 100)
              : "R$ 0,00"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
          <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
            <Calendar className="text-primary size-4" />
          </div>
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAppointments}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
          <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
            <Users className="text-primary size-4" />
          </div>
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Pacientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPatients}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
          <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
            <Users className="text-primary size-4" />
          </div>
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Médicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDoctors}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
