"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login form submitted:", formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.nav.about === "О компании" ? "Назад" : t.nav.about === "About" ? "Back" : "Бозгашт"}
          </Button>
        </Link>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t.nav.login}</CardTitle>
            <CardDescription>
              {t.nav.about === "О компании"
                ? "Войдите в свой аккаунт"
                : t.nav.about === "About"
                  ? "Sign in to your account"
                  : "Ба ҳисоби худ ворид шавед"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  {t.nav.about === "О компании" ? "Email" : t.nav.about === "About" ? "Email" : "Email"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      t.nav.about === "О компании"
                        ? "name@example.com"
                        : t.nav.about === "About"
                          ? "name@example.com"
                          : "name@example.com"
                    }
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    {t.nav.about === "О компании" ? "Пароль" : t.nav.about === "About" ? "Password" : "Парол"}
                  </Label>
                  <Link href="#" className="text-sm text-blue-500 hover:underline">
                    {t.nav.about === "О компании"
                      ? "Забыли пароль?"
                      : t.nav.about === "About"
                        ? "Forgot password?"
                        : "Паролро фаромӯш кардед?"}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) => setFormData({ ...formData, remember: checked as boolean })}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t.nav.about === "О компании"
                    ? "Запомнить меня"
                    : t.nav.about === "About"
                      ? "Remember me"
                      : "Маро дар хотир нигоҳ доред"}
                </label>
              </div>

              <Button type="submit" className="w-full">
                {t.nav.login}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              {t.nav.about === "О компании"
                ? "Нет аккаунта?"
                : t.nav.about === "About"
                  ? "Don't have an account?"
                  : "Ҳисоб надоред?"}{" "}
              <Link href="/register" className="font-medium text-blue-500 hover:underline">
                {t.nav.register}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
