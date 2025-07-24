import { AuthGuard } from "@/components/auth/AuthGuard";

export default function NotificationsPage() {
  return (
    <AuthGuard>
      <div>
        <h1>通知設定</h1>
      </div>
    </AuthGuard>
  );
}
