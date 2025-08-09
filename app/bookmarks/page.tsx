import BookmarksGrid from "@/Components/BookmarksGrid";
import Container from "@/Components/ui/Container";
import { TbBookmarksFilled } from "react-icons/tb";

const BookmarksPage = () => {
  return (
    <Container className="px-2 sm:px-5 lg:pl-0 lg:pr-5 py-20 space-y-3">
      <h1 className=" text-3xl sm:text-4xl lg:text-5xl text-primary-light flex gap-1 items-center">
        <TbBookmarksFilled />
        Bookmarks
      </h1>
      <BookmarksGrid />
    </Container>
  );
};

export default BookmarksPage;
