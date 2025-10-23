import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CustomButton } from "../ButtonCustom";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onConfirm,
  title,
  description,
  trigger,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <CustomButton
              variant="primary"
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              EXCLUIR
            </CustomButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
