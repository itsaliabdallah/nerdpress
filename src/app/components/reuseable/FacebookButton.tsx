import Link from "next/link";
import { PiFacebookLogo } from "react-icons/pi";
import { api } from "~/trpc/server";

export async function FacebookButton({
  colour = "black",
  size = "0",
  padding = "p-0",
}: {
  colour?: string;
  size?: string;
  padding?: string;
}) {
  const data = await api.config.getConfig.query();
  if (!data) return null;
  return (
    <div className={`text-${colour} text-${size} ${padding} `}>
      <Link target="_blank" href={data.facebookLink}>
        <PiFacebookLogo />
      </Link>
    </div>
  );
}
