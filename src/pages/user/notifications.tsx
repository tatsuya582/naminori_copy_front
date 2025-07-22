import { requireAuth } from "@/lib/auth/requireAuth";

export const getServerSideProps = requireAuth;

export default function NotificationsPage() {
  return (
    <div>
      <h1>通知設定</h1>
    </div>
  );
}
