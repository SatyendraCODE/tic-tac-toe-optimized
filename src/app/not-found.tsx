import { LinkStyled } from "@/components/ui/link-styled";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 text-center text-gray-800 dark:text-inherit  ">
      <h2 className="flex items-center mt-20 ">
        <span className="text-3xl font-extrabold px-2">404</span> - Not Found
      </h2>
      <p>Could not find requested resource</p>
      <LinkStyled href="/">Return Home</LinkStyled>
    </div>
  );
}
