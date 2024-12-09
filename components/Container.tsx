import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full border border-solid rounded-md p-8 mt-6">
      {children}
    </div>
  );
};

export default Container;
