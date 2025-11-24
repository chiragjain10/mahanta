import React from "react";
// import { blogData } from "./blogData";
import "./blog.css";
import Breadcrumb from "./Breadcrumb";
 const blogData = [
  {
    id: 1,
    title: "Building gains into housing stocks and how to trade the sector",
    author: "Jerome Bell",
    category: "Furniture",
    date: "January 28, 2024",
    excerpt:
      "The average contract interest rate for 30-year fixed-rate mortgages with conforming loan balances...",
    image: "/images/blog/blog-1.jpg",
  },
  {
    id: 2,
    title: "92% of millennial homebuyers say inflation has impacted their plans",
    author: "Angel",
    category: "Interior",
    date: "January 31, 2024",
    excerpt:
      "Mortgage applications to purchase a home, however, dropped 4% last week compared...",
    image: "/images/blog/blog-2.jpg",
  },
  {
    id: 3,
    title: "We are hiring ‘moderately,’ says Compass CEO",
    author: "Colleen",
    category: "Architecture",
    date: "January 28, 2024",
    excerpt:
      "New listings were down 20% year over year in March, according to Realtor.com...",
    image: "/images/blog/blog-3.jpg",
  },
  {
    id: 4,
    title: "Expert Tips for Profitable Real Estate Investments",
    author: "Shane",
    category: "Property",
    date: "February 01, 2024",
    excerpt:
      "Explore strategies and insider tips to make informed decisions when investing in real estate...",
    image: "/images/blog/blog-4.jpg",
  },
  {
    id: 5,
    title:
      "The Art of Staging: How to Sell Your Home Quickly at a High Price",
    author: "Eduardo",
    category: "Realtor",
    date: "February 06, 2024",
    excerpt:
      "Delve into the art of home staging as an effective strategy to attract buyers...",
    image: "/images/blog/blog-5.jpg",
  },
  {
    id: 6,
    title: "Key Real Estate Trends to Watch in 2024",
    author: "Dianne",
    category: "HomeBuying",
    date: "February 09, 2024",
    excerpt:
      "Take a comprehensive look at noteworthy and exciting trends in the real estate industry...",
    image: "/images/blog/blog-6.jpg",
  }
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumb />
    <section className="flat-section py-5">
      <div className="container">
        <div className="row g-4">

          {blogData.map((blog) => (
            <div key={blog.id} className="col-lg-4 col-md-6">
              <a href={`/blog/${blog.id}`} className="blog-card">
                
                <div className="blog-img">
                  <img src={blog.image} alt={blog.title} />
                  <span className="blog-date">{blog.date}</span>
                </div>

                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="author fw-bold">{blog.author}</span>
                    <span className="category">{blog.category}</span>
                  </div>

                  <h5 className="blog-title">{blog.title}</h5>
                  <p className="blog-desc">{blog.excerpt}</p>
                </div>
              </a>
            </div>
          ))}

          {/* PAGINATION */}
          <div className="col-12 text-center pt-4">
            <ul className="pagination-list">
              <li><button>‹</button></li>
              <li><button>1</button></li>
              <li><button>2</button></li>
              <li><button className="active">3</button></li>
              <li><button>4</button></li>
              <li><button>…</button></li>
              <li><button>›</button></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
