import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import ReaderReviews from "@/components/ReaderReviews";

export default function Home() {
  return (
   <div>
    <Banner/>
    <Featured/>
    <HowBorrowingWorks/>
    <ReaderReviews/>
   </div>
  );
}
