import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import { getIdentitas, getAkunAdmin } from "@/lib/sheets";
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
  // Fetch account data and find the specific user who logged in
  const akunData = await getAkunAdmin();
  const adminAccount = akunData.find(a => a.email.toLowerCase() === session.email.toLowerCase()) || null;

  return (
    <AdminLayoutWrapper identitas={identitas} adminAccount={adminAccount}>
      {children}
    </AdminLayoutWrapper>
  );
}
