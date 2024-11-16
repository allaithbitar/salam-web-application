import RegisterForm from "@/components/pages-components/auth/register/register-form.component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const DashboardRegisterPage = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">إنشاء حساب عضوية</CardTitle>
        <CardDescription>إنشاء حساب للمشاركة في محتوى الموقع</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RegisterForm />
        <Link href="/auth/login">
          <Button className="w-full" variant="link">
            تسجيل الدخول
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DashboardRegisterPage;
