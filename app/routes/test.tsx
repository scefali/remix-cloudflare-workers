import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";

import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

import useApi from "app/utils/frontend/useApi";
import ControlledField from "app/components/forms/ControlledField";

interface Loader {
  timestamp: number;
}

export const loader = async (): Promise<Loader> => {
  return { timestamp: Date.now() };
};


export default function Test() {
  const { timestamp } = useLoaderData<Loader>();
  const [diffTime, setDiffTime] = useState<number | null>(null);
  useEffect(() => {
    const clientTime = Date.now();
    setDiffTime(clientTime - timestamp);
  }, [timestamp]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Test</h1>
      {diffTime ? <div>Time Diff {diffTime}</div> : null}
      <DataForm />
    </div>
  );
}

const DataForm = () => {
  const { handleSubmit, control } = useForm();

  const api = useApi();
  const endpoint = "/data-entry";

  const onSubmit = async (data: { [x: string]: string }) => {
    await api.post(endpoint, data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ControlledField
        name="field"
        control={control}
        placeholder="Enter Field Name"
        type="text"
      />
      <ControlledField
        name="value"
        control={control}
        placeholder="Enter Value"
        type="text"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 50px;
  padding: 10px;
`;
