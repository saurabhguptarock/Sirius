import Head from "next/head";
import React, { useState } from "react";
import { Template } from "../../../../types";

const Templates = () => {
  const [template, setTemplate] = useState<Template>({ name: "" });

  return (
    <div>
      <Head>
        <title>Template | {template.name}</title>
      </Head>
    </div>
  );
};

export default Templates;
