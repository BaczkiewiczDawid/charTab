import {Button} from "@/components/ui/button";
import {translate} from "@/components/helpers/translations";
import {TailSpin} from "react-loader-spinner";
import React from "react";

type Props = {
  name: string,
  isPending: boolean,
  className?: string,
}

export const LoadingButton = ({name, isPending = false, className}: Props) => {
  return (
    <Button type="submit" disabled={isPending} className={className}>
      {translate(name)}
      {isPending &&
          <TailSpin
              visible={isPending}
              height="16"
              width="16"
              color="#2a2a2a"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperClass="ml-4"
          />}
    </Button>
  )
}