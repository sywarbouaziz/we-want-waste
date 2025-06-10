import { MapPin, Truck, Check, FileCheck, Calendar, CreditCard } from "lucide-react"

export const progressSteps = [
  { label: "Postcode", icon: MapPin, completed: true },
  { label: "Waste Type", icon: Truck, completed: true },
  { label: "Select Skip", icon: Check, completed: false, active: true },
  { label: "Permit Check", icon: FileCheck, completed: false },
  { label: "Choose Date", icon: Calendar, completed: false },
  { label: "Payment", icon: CreditCard, completed: false },

]