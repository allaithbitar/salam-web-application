import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const DashboardLoginPage = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4"></CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">تسجيل الدخول</Button>
        <Link href="/auth/register">
          <Button className="w-full" variant="link">
            إنشاء حساب
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DashboardLoginPage;
