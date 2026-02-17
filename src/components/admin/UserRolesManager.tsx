import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Shield, Loader2, Crown, UserCheck, User } from "lucide-react";
import { toast } from "sonner";

interface AppUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

const roleBadge = (role: string) => {
  switch (role) {
    case "admin":
      return (
        <Badge className="bg-primary/20 text-primary border-primary/30 gap-1">
          <Crown className="w-3 h-3" /> Admin
        </Badge>
      );
    case "moderator":
      return (
        <Badge className="bg-secondary/20 text-secondary border-secondary/30 gap-1">
          <Shield className="w-3 h-3" /> Moderator
        </Badge>
      );
    default:
      return (
        <Badge className="bg-muted text-muted-foreground gap-1">
          <User className="w-3 h-3" /> User
        </Badge>
      );
  }
};

const UserRolesManager = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-user-roles", {
        body: { action: "list" },
      });
      if (error) throw error;
      setUsers(data.users || []);
    } catch (e: any) {
      toast.error("Käyttäjien lataus epäonnistui");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const { error } = await supabase.functions.invoke("manage-user-roles", {
        body: { action: "set_role", userId, role: newRole },
      });
      if (error) throw error;
      toast.success("Rooli päivitetty!");
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message || "Roolin päivitys epäonnistui");
    } finally {
      setUpdatingId(null);
    }
  };

  const currentRole = (user: AppUser) => {
    if (user.roles.includes("admin")) return "admin";
    if (user.roles.includes("moderator")) return "moderator";
    return "user";
  };

  return (
    <Card className="mt-10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Käyttäjät & Roolit</CardTitle>
            <p className="text-sm text-muted-foreground">
              Hallinnoi käyttäjien oikeustasoja
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : users.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Ei käyttäjiä
          </p>
        ) : (
          <div className="space-y-3">
            {/* Header */}
            <div className="hidden md:grid grid-cols-[1fr_150px_150px_120px] gap-4 px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <span>Käyttäjä</span>
              <span>Nykyinen rooli</span>
              <span>Viimeisin kirjautuminen</span>
              <span>Muuta roolia</span>
            </div>

            {users.map((u) => {
              const role = currentRole(u);
              return (
                <div
                  key={u.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_150px_150px_120px] gap-3 md:gap-4 items-center p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/20 transition-colors"
                >
                  {/* Email */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {u.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Liittynyt:{" "}
                      {new Date(u.created_at).toLocaleDateString("fi-FI")}
                    </p>
                  </div>

                  {/* Current role */}
                  <div>{roleBadge(role)}</div>

                  {/* Last sign in */}
                  <div className="text-xs text-muted-foreground">
                    {u.last_sign_in_at
                      ? new Date(u.last_sign_in_at).toLocaleDateString("fi-FI", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Ei koskaan"}
                  </div>

                  {/* Role selector */}
                  <div>
                    <Select
                      value={role}
                      onValueChange={(val) => changeRole(u.id, val)}
                      disabled={updatingId === u.id}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        {updatingId === u.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserRolesManager;
