'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import Cookies from 'js-cookie'

/**
 * Mirrors the chosen theme into a cookie so the server (app/layout.tsx)
 * can render the right theme class on the first byte.
 * next-themes has no change callback, so we observe it from inside the provider.
 */
function ThemeCookieSync() {
  const { theme } = useTheme()
  React.useEffect(() => {
    if (theme) Cookies.set('theme', theme, { expires: 365, path: '/', sameSite: 'lax' })
  }, [theme])
  return null
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeCookieSync />
      {children}
    </NextThemesProvider>
  )
}
