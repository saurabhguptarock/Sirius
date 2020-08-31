import Head from "next/head";
import React, { useState } from "react";
import { Template as TypeTemplate } from "../../../../types";

const Template = () => {
  const [template, setTemplate] = useState<TypeTemplate>();

  return (
    <div>
      <Head>
        <title>Template | {template.name}</title>
      </Head>
    </div>
  );
};

export default Template;
