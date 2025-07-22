import { requireAuth } from "@/lib/auth/requireAuth";

export const getServerSideProps = requireAuth;

export default function ProfilePage() {
  return (
    <div>
      <h1>プロフィール</h1>
    </div>
  );
}
