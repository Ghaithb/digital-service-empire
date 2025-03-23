
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(1, {
    message: "Le mot de passe est requis.",
  }),
});

interface DashboardLoginProps {
  onLogin: (password: string) => void;
}

const DashboardLogin: React.FC<DashboardLoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onLogin(values.password);
  };

  return (
    <div className="max-w-md mx-auto bg-card p-8 rounded-xl border shadow-sm">
      <div className="mb-6 text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="text-primary" size={24} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Authentification Admin</h2>
        <p className="text-muted-foreground text-sm">
          Veuillez vous connecter pour accéder au tableau de bord.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Entrez votre mot de passe admin"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>
      </Form>
      <p className="text-xs text-muted-foreground text-center mt-6">
        Note: Pour cet exemple, le mot de passe admin est "admin123"
      </p>
    </div>
  );
};

export default DashboardLogin;
