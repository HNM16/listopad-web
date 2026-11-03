"use client"

import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type FormStatusState = { type: "success" | "error"; message: string } | null

/** Inline, screen-reader-announced result message for forms. */
export function FormStatus({ status }: { status: FormStatusState }) {
  return (
    <div aria-live="polite" role="status">
      <AnimatePresence mode="wait">
        {status && (
          <motion.div
            key={status.message}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-4 text-sm",
                status.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-destructive/30 bg-destructive/10 text-destructive",
              )}
            >
              {status.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
              <span>{status.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
