import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { api } from "~/utils/api";
import { Button } from "./reuseable/Button";
import AdminOnlyBlank from "./reuseable/AdminOnlyBlank";
import { Heading } from "./reuseable/Heading";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea?.scrollHeight}px`;
}

export function NewTestimonial() {
  const session = useSession();
  if (session.status !== "authenticated") return null;

  return <Form />;
}

function Form() {
  const [contentValue, setContentValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>();
  const session = useSession();
  const user = session.data?.user;

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [contentValue]);

  const createTestimonial = api.testimonials.create.useMutation({
    onSuccess: () => {
      setDisableButtons(false);
      setContentValue("");
    },
  });

  const createAdminTestimonial = api.testimonials.createAdmin.useMutation({
    onSuccess: () => {
      setDisableButtons(false);
      setNameValue("");
      setContentValue("");
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDisableButtons(true);

    if (user?.admin) {
      createAdminTestimonial.mutate({
        postedBy: nameValue,
        content: contentValue,
      });
    } else {
      createTestimonial.mutate({
        content: contentValue,
      });
    }
  }

  if (session.status !== "authenticated") return null;

  return (
    <>
      <Heading text="Add new testimonial" />
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col gap-4 p-8 "
      >
        <AdminOnlyBlank>
          <input
            style={{ height: 0 }}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="block border border-gray-300 bg-white p-4 text-lg"
            placeholder="Name"
          />
        </AdminOnlyBlank>
        <textarea
          ref={inputRef}
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          className="block flex-grow resize-none overflow-hidden border border-gray-300 bg-white p-4 text-lg"
          placeholder="Tell me what you thought!"
        />

        <Button disable={disableButtons} text="Submit" />
      </form>
    </>
  );
}
