import BlogDetailsPage from "@/components/modules/common/BlogDetailsPage";
import React from "react";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <BlogDetailsPage id={id} />
    </div>
  );
};

export default BlogDetails;
