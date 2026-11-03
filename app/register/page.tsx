"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, User } from "lucide-react"

export default function RegisterPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Register form submitted:", formData)
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
            <CardTitle className="text-2xl font-bold">{t.nav.register}</CardTitle>
            <CardDescription>
              {t.nav.about === "О компании"
                ? "Создайте аккаунт для доступа к облачным сервисам"
                : t.nav.about === "About"
                  ? "Create an account to access cloud services"
                  : "Барои дастрасӣ ба хидматҳои абрӣ ҳисоб эҷод кунед"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {t.nav.about === "О компании" ? "Имя" : t.nav.about === "About" ? "Name" : "Ном"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={
                      t.nav.about === "О компании"
                        ? "Введите ваше имя"
                        : t.nav.about === "About"
                          ? "Enter your name"
                          : "Номи худро ворид кунед"
                    }
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">
                  {t.nav.about === "О компании" ? "Пароль" : t.nav.about === "About" ? "Password" : "Парол"}
                </Label>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {t.nav.about === "О компании"
                    ? "Подтвердите пароль"
                    : t.nav.about === "About"
                      ? "Confirm Password"
                      : "Паролро тасдиқ кунед"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                {t.nav.register}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              {t.nav.about === "О компании"
                ? "Уже есть аккаунт?"
                : t.nav.about === "About"
                  ? "Already have an account?"
                  : "Аллакай ҳисоб доред?"}{" "}
              <Link href="/login" className="font-medium text-blue-500 hover:underline">
                {t.nav.login}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
