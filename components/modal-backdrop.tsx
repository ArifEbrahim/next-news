import { useRouter } from "next/navigation"

export default function ModalBackdrop() {
  const router = useRouter()

  return (
          <div className="model-backdrop" onClick={router.back}/>
  )
}