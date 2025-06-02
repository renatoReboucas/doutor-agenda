import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PageTableActionsProps {
  patient: typeof patientsTable.$inferSelect;
}

const PageTableActions = ({ patient }: PageTableActionsProps) => {
  const [upsertPatientFormIsOpen, setUpsertPatientFormIsOpen] =
    React.useState(false);
  return (
    <Dialog
      open={upsertPatientFormIsOpen}
      onOpenChange={setUpsertPatientFormIsOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUpsertPatientFormIsOpen(true)}>
            <EditIcon /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertPatientForm
        isOpen={upsertPatientFormIsOpen}
        onSuccess={() => setUpsertPatientFormIsOpen(false)}
        patient={patient}
      />
    </Dialog>
  );
};

export default PageTableActions;
