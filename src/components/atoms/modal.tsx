import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/ui/dialog";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  title?: string;
  description?: string;
}

export default function Modal({
  children,
  open,
  setOpen,
  className,
  description,
  title,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(className, "!rounded-xl max-sm:w-11/12")}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="!text-left">{title}</DialogTitle>
          <DialogDescription className="!text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
