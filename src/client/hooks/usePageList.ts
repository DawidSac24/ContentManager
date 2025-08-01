import { useState, useEffect } from "react";

import { PageDTO } from "../../models/page.model";
import { PageController } from "../../controllers/pages.controller";

const pageController = PageController.getInstance();

export function usePageList(contextId: number) {
  const [pages, setPages] = useState<PageDTO[]>([]);

  const loadPages = async () => {
    try {
      const result = await pageController.getByContextId(contextId);
      setPages(result);
    } catch (error) {
      console.error("Error loading pages:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  return { pages, loadPages };
}
