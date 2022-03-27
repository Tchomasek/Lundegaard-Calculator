import { Button } from "@material-ui/core";
import React from "react";

export interface CButtonProps {
  info: React.ReactNode;
}

export const CButton: React.FC<CButtonProps> = ({ info }: CButtonProps) => {
  return (
    <Button data-testid="CButton" variant="contained" color="primary">
      {info}
    </Button>
  );
};
