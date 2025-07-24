import { AuthGuard } from "@/components/auth/AuthGuard";

export default function MyPage() {
  return (
    <AuthGuard>
      <div>
        <h1>マイページ</h1>
      </div>
    </AuthGuard>
  );
}
