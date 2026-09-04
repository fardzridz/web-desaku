import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import { getIdentitas, getAkunByEmailSafe } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const identitas = await getIdentitas();
  // Fetch account data (tanpa password hash) untuk profil sidebar
  const adminAccount = await getAkunByEmailSafe(session.email);

  return (
    <AdminLayoutWrapper identitas={identitas} adminAccount={adminAccount}>
      {children}
    </AdminLayoutWrapper>
  );
}
