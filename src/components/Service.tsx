export function Service({
  title,
  price,
  description,
}: {
  title: string;
  price: number;
  description: string;
}) {
  return (
    <div className="flex h-full flex-col bg-[#83948e] p-6 text-[#fbf2e4]">
      <h3 className="pb-2 font-bold">{title.toUpperCase()}</h3>
      <p className="pb-2 text-2xl ">£{price}</p>
      <p>{description}</p>
    </div>
  );
}
