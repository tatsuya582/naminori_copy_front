import { AuthGuard } from "@/components/auth/AuthGuard";

export default function ApplysPage() {
  return (
    <AuthGuard>
      <div>
        <h1>応募管理</h1>
      </div>
    </AuthGuard>
  );
}
