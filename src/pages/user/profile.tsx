import { AuthGuard } from "@/components/auth/AuthGuard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div>
        <h1>プロフィール</h1>
      </div>
    </AuthGuard>
  );
}
