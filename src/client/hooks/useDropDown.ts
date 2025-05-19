import { useState } from "react";

export function useDropDown() {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  return { showDropDown, setShowDropDown };
}
