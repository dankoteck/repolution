import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  return (
    <section className="">
      <h1>Project, {params.id}</h1>
    </section>
  );
}
