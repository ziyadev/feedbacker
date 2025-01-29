import { cx } from "@/components/lib/utils"
import { IconLoader } from "@tabler/icons-react"
import { ComponentProps } from "react"




export const LoadingIcon = ({ className, ...props }: ComponentProps<typeof IconLoader>) => {
      return <IconLoader className={cx("mx-2 size-5 animate-spin animate-infinite animate-ease-in-out animate-alternate", className)} {...props} />
}