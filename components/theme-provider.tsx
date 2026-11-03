'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Cookies from 'js-cookie'

export function ThemeProvider({ children, ...props }: any) {
  // Функция для записи темы в куки при изменении
  const handleThemeChange = (value: string | undefined) => {
    if (value) {
      Cookies.set('theme', value, { expires: 365, path: '/' })
    }
  }

  return (
    <NextThemesProvider 
      {...props} 
      onValueChange={handleThemeChange}
    >
      {children}
    </NextThemesProvider>
  )
}