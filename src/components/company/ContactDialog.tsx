import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  phone: z.string().min(10, 'Numărul de telefon este invalid'),
  email: z.string().email('Email invalid'),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyName: string;
};

export const ContactDialog = ({ open, onOpenChange, companyName }: ContactDialogProps) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contact form:', data);
    toast.success('Cererea ta a fost trimisă cu succes!');
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cere ofertă de la {companyName}</DialogTitle>
          <DialogDescription>
            Completează formularul și vei fi contactat în cel mai scurt timp.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Ion Popescu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input placeholder="0721234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ion@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesaj</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrie ce serviciu ai nevoie..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Anulează
              </Button>
              <Button type="submit">Trimite cererea</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
