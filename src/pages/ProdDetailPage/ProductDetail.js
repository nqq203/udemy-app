import TitleCard from "../../components/TitleCard/TitleCard";
import ContentListCard from "../../components/ContentListCard/ContentListCard";
import SideBarCard from "../../components/SideBarCard/SideBarCard";
import CourseContent from "../../components/CourseContent/CourseContent";
import { ProductDetailWrapper } from "./ProductDetailStyle";
const content = [
  "Extensive, informative and interesting video lecture",
  "Lab Exercises",
  "All Powerpoint Demonstrations Used in Course",
  "All Powerpoint Demonstrations Used in Course",
  "All Powerpoint Demonstrations Used in Course",
];

const courseContent = {
  "Module 1": ["item 1", "item 2", "item 3"],
  "Module 2": ["item 1", "item 2", "item 3"],
  "Module 3": ["item 1", "item 2", "item 3"],
};

const ProductDetail = () => {
  return (
    <ProductDetailWrapper>
      <div style={{ position: "relative" }}>
        <TitleCard title="hello" ratings={3} />
        <SideBarCard />
      </div>

      <div className="product-detail-body">
        <ContentListCard title={"What you'll learn"} listOfContent={content} />
        <CourseContent courseContent={courseContent} />
      </div>
    </ProductDetailWrapper>
  );
};

export default ProductDetail;
