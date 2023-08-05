import { FC } from "react";
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
} from "../ui/alert-dialog";

interface RemoveSessionAlertDialogProps {
  onAccept: () => Promise<void>;
}

const RemoveSessionAlertDialog: FC<RemoveSessionAlertDialogProps> = ({
  onAccept,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-600 text-white px-4 py-2 rounded">
        Eliminar sesión
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esto borrará los datos de la sesión del servidor
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept} className="">
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveSessionAlertDialog;
