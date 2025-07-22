import { requireAuth } from "@/lib/auth/requireAuth";

export const getServerSideProps = requireAuth;

export default function MyPage() {
  return (
    <div>
      <h1>マイページ</h1>
    </div>
  );
}
