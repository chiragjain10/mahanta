import "./ChooseUs.css"
import { useEffect } from "react";
function ChooseUs() {
    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
    
    return (
        <div>
            <section className="mx-5 bg-primary-new radius-30 chooseUs">
                <div className="flat-img-with-text">
                    <div className="content-left img-animation wow">
                        <img className="lazyload" data-src="images/img/img-w-text1.jpg"
                            src="images/banner/img-w-text1.jpg" alt="" style={{ padding: "50px" }} />
                    </div>
                    <div className="content-right chooseUs_scroller">
                            <h3 className="mt-4 title">Why Choose Mahanta Group</h3>
                        <div className="box-title text-center wow fadeInUp">
                        </div>
                        <div className="flat-service wow fadeInUp" data-wow-delay=".2s">

                            <a href="#" className="box-benefit hover-btn-view">
                                <div className="icon-box">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/vduvxizq.json"
                                        trigger="hover"
                                        colors="primary:#121331,secondary:#1174d6"
                                        style={{ width: "60px", height: "60px" }}>
                                    </lord-icon>
                                </div>
                                <div className="content">
                                    <h5 className="title">Backed by Experience</h5>
                                    <p className="description">
                                        Over 6+ years of deep real-estate expertise, bringing only those projects that we personally trust and believe in.
                                    </p>
                                </div>
                            </a>

                            <a href="#" className="box-benefit hover-btn-view">
                                <div className="icon-box">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/zzcjjxew.json"
                                        trigger="hover"
                                        colors="primary:#121331,secondary:#1174d6"
                                        style={{ width: "60px", height: "60px" }}>
                                    </lord-icon>
                                </div>
                                <div className="content">
                                    <h5 className="title">Home-Centric Locations</h5>
                                    <p className="description">
                                        Every project is selected after studying real-life needs like schools, hospitals, markets, daily essentials, and long-term growth.
                                    </p>
                                </div>
                            </a>

                            <a href="#" className="box-benefit hover-btn-view">
                                <div className="icon-box">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/gqzfzudq.json"
                                        trigger="hover"
                                        colors="primary:#121331,secondary:#1174d6"
                                        style={{ width: "60px", height: "60px" }}>
                                    </lord-icon>
                                </div>
                                <div className="content">
                                    <h5 className="title">Buyer-First Approach</h5>
                                    <p className="description">
                                        We think from your perspective — whether you’re planning to live or invest, our goal is to help you choose what truly fits you.
                                    </p>
                                </div>
                            </a>

                            <a href="#" className="box-benefit hover-btn-view">
                                <div className="icon-box">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/nocovwne.json"
                                        trigger="hover"
                                        colors="primary:#121331,secondary:#1174d6"
                                        style={{ width: "60px", height: "60px" }}>
                                    </lord-icon>
                                </div>
                                <div className="content">
                                    <h5 className="title">Transparent Process</h5>
                                    <p className="description">
                                        Simple, honest, and clear working style that keeps your trust at the center of every commitment.
                                    </p>
                                </div>
                            </a>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default ChooseUs