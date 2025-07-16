import BookmarksGrid from "@/Components/BookmarksGrid";
import { TbBookmarksFilled } from "react-icons/tb";

const BookmarksPage = () => {
  return (
    <div className="px-2 sm:px-10 py-20 space-y-3">
      <h1 className=" text-3xl sm:text-4xl lg:text-5xl text-primary-light flex gap-1 items-center">
        <TbBookmarksFilled />
        Bookmarks
      </h1>
      <BookmarksGrid />
    </div>
  );
};

export default BookmarksPage;
