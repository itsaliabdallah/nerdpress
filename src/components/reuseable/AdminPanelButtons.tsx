import { Button } from "./Button";

export function AdminPanelButtons() {
  return (
    <>
      <div className="flex justify-center gap-2 p-4">
        <Button text="Home" href="/admin" />
        <Button text="Services" href="/admin/services" />
        <Button text="Faqs" href="/admin/faqs" />
        <Button text="Blog" href="/admin/blog" />
      </div>
    </>
  );
}
