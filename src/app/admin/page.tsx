import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login?redirect=/admin");
  }

  if ((session.user as { role?: string }).role !== "admin") {
    redirect("/");
  }

  return <AdminDashboard />;
}