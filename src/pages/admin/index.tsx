import { signIn, signOut, useSession } from "next-auth/react";
import { NewFaq } from "~/components/NewFaq";
import { NewService } from "~/components/NewService";
import { NewBlogPost } from "~/components/blog/NewBlogPost";
import AdminOnly from "~/components/reuseable/AdminOnly";
import { Button } from "~/components/reuseable/Button";
import { Heading } from "~/components/reuseable/Heading";

export default function AdminPanel() {
  const session = useSession();
  const user = session.data?.user;

  if (!user)
    return (
      <div className="flex justify-center p-6">
        <Button
          onClick={() => {
            void signIn();
          }}
          text="Sign In"
        />
      </div>
    );

  return (
    <div className="md:max-w-4xl flex flex-col justify-center">
      <AdminOnly>
        <Heading text="Admin Panel" />

        <div className="bg-theme-green text-center text-theme-text-light">
          <Heading text="New Blog Post" />
          <NewBlogPost />
        </div>

        <div className="text-center text-theme-text-2">
          <Heading text="New Service" />
          <NewService />
        </div>

        <div className="bg-theme-green text-center text-theme-text-light">
          <Heading text="New FAQ" />
          <NewFaq />
        </div>

        <div className="flex justify-center p-8">
          {user != null ? (
            <Button
              onClick={() => {
                void signOut();
              }}
              text="Sign Out"
            />
          ) : (
            ""
          )}
        </div>
      </AdminOnly>
    </div>
  );
}
