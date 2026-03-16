import { Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "password123!";

async function login(formData: FormData) {
  "use server";

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    (await cookies()).set("admin_session", "ok", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const params = await searchParams;
  const hasError = Boolean(params.error);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl items-center justify-center px-4 py-10">
      <form
        action={login}
        className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-sm ring-1 ring-sky-100"
      >
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-sky-700" />
          <div>
            <h1 className="text-base font-semibold text-sky-900">
              เข้าระบบเจ้าหน้าที่ / Admin Login
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              สำหรับเจ้าหน้าที่สถานเอกอัครราชทูต / For consular staff only
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium text-slate-700"
            >
              ชื่อผู้ใช้ / Username
            </label>
            <input
              id="username"
              name="username"
              required
              className="mt-1 w-full rounded-lg border border-sky-100 bg-sky-50/60 px-3 py-2 text-sm outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-700"
            >
              รหัสผ่าน / Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-sky-100 bg-sky-50/60 px-3 py-2 text-sm outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
            />
          </div>
        </div>

        {hasError && (
          <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
            ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
            <br />
            Invalid credentials. Please try again.
          </p>
        )}

        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
        >
          เข้าสู่ระบบ / Sign in
        </button>
      </form>
    </div>
  );
}

