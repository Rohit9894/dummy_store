import BestDealItem from "@/components/miscellaneous/BestDealItem";
import QualityItem from "@/components/miscellaneous/QualityItem";
import { MultiSlider } from "@/components/Slider/MultiSlider";
import { MultiItemSlider } from "@/components/Slider/MutliItemSlider";
import { SaleSlider } from "@/components/Slider/SaleSlider";
import Slider from "@/components/Slider/Slider";
import { Button } from "@/components/ui/button";
import { fetchContentBlocks } from "@/features/contentBlock/contentBlock.slice";
import { fetchTagProducts } from "@/features/tagProduct/tagProduct.slice";

import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRightCircle,
} from "lucide-react";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  let baseUrl = import.meta.env.VITE_BASEURL;
  const [url, setUrl] = useState("");
  const left = useRef();
  const right = useRef();
  const dispatch = useDispatch();
  const {
    data,
    loading: contentBlockLoading,
    error: contentBlockError,
  } = useSelector((store) => store.contentBlocks);
  const {
    tagItems,
    loading: tagProductsLoading,
    error: tagProductsError,
  } = useSelector((store) => store.tagProducts);

  useEffect(() => {
    dispatch(fetchTagProducts());
    dispatch(fetchContentBlocks("homepage-hero-slider"));
  }, [dispatch]);


  return (
    <div>
      {/* Slider */}
      <div className="container box-border">
        {data && data[0] && <Slider data={data[0]} />}
      </div>
      {/* Best Deals */}
      {tagItems && tagItems["best-deal"] && (
        <section className="container mt-24 " id="best deals">
          <h1 className="text-2xl font-bold text-primary">Best Deals</h1>
          <div className="mt-10">
            {tagItems && (
              <MultiItemSlider popularSearchData={tagItems["best-deal"]} />
            )}
          </div>
        </section>
      )}

      {/* Top Slected Deals */}
      <section className="bg-input_bg py-8  mt-24">
        <div className=" container w-full py-4 md:h-60 rounded-lg flex md:!flex-row flex-col md:items-center gap-8">
          <div className="w-full md:w-1/4 h-full flex flex-col justify-center gap-6">
            <h1 className="text-2xl text-primary font-semibold md:w-[200px] leading-7 ">
              Top 10 Product Selected On The Week
            </h1>
            <div className="custom_center gap-2 -mt-4">
              <ChevronLeftCircle
                cursor={"pointer"}
                onClick={() => left?.current?.click()}
              />
              <ChevronRightCircle
                cursor={"pointer"}
                onClick={() => right?.current?.click()}
              />
            </div>
          </div>
          <div className="w-full mt-2">
            <MultiSlider left={left} right={right} />
          </div>
        </div>
      </section>

      {/* Popular Search */}
      {tagItems && tagItems["popular-search"] && (
        <section className="container mt-24 " id="best deals">
          <h1 className="text-2xl text-primary font-bold">Popular Search</h1>
          <div className="mt-10">
            <MultiItemSlider popularSearchData={tagItems["popular-search"]} />
          </div>
        </section>
      )}

      {/* Qualieties */}
      <section className="container mt-24 grid  gap-4 gap-y-12 grid-cols-3 md:grid-cols-5">
        <QualityItem
          icon="truck"
          title={"Free Delivery"}
          subTitle={"For ₹ 40 "}
        />
        <QualityItem icon="star" title={"Best Quality"} subTitle={"Brand "} />
        <QualityItem icon="clock" title={"Easy Return"} subTitle={"Product "} />
        <QualityItem
          icon="price"
          title={"Best Price"}
          subTitle={"In the Market"}
        />
        <QualityItem icon="payment" title={"Payment"} subTitle={"Secure"} />
      </section>
      {/* Flash Sale */}
      <section className="container mt-24 bg-primary">
        <div className="w-full bg-background py-4 md:h-60 rounded-lg flex md:!flex-row flex-col md:items-center gap-8">
          <div className="w-full lg:w-1/3 text-white pl-10">
            <h1 className="text-2xl font-semibold">Flash Sale</h1>
            <p className="text-sm font-light mt-5">
              Don't miss out on our incredible electronics sale! Get up to 50%
              off on top brands, including smartphones and more.
            </p>
            <h1 className="text-2xl font-semibold tracking-wider mt-10">
              05 : 42 : 50
            </h1>
          </div>
          <div className="w-full">
            <SaleSlider />
          </div>
        </div>
      </section>

      {/* <div>
        <h1>Rough Work</h1>
        <input onChange={uploadImage} type="file" />
        <img src={url} alt="Preview" />
      </div> */}
    </div>
  );
}

export default Home;
