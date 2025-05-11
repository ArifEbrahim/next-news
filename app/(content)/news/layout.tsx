import { PropsWithChildren, ReactNode } from 'react'

interface NewsDetailLayoutProps extends PropsWithChildren {
  modal: ReactNode
}

export default function NewDetailLayout({
  children,
  modal
}: NewsDetailLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
