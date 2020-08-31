import React, { useEffect, useState } from "react";
import { Template } from "../types";
import FirebaseService from "../services";

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  const getTemplates = async () => {
    const temp = await FirebaseService.getAllTemplates("Business");
    if (temp) setTemplates(temp);
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return <div></div>;
};

export default Templates;
