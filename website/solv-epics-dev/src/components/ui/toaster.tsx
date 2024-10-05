'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    // @ts-ignore
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // @ts-ignore
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {/*@ts-ignore*/}
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                // @ts-ignore
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            {/*@ts-ignore*/}
            <ToastClose />
          </Toast>
        )
      })}
      {/*@ts-ignore*/}
      <ToastViewport />
    </ToastProvider>
  )
}
