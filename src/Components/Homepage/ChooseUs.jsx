import React from 'react'

function ChooseUs() {
  return (
    <div>
        <section className="mx-5 bg-primary-new radius-30">
                <div className="flat-img-with-text">
                    <div className="content-left img-animation wow">
                        <img className="lazyload" data-src="images/img/1.jpg"
                            src="images/banner/img-w-text1.jpg" alt=""/>
                    </div>
                    <div className="content-right">
                        <div className="box-title wow fadeInUp">
                            <div className="text-subtitle text-primary">Our Benifit</div>
                            <h3 className="title mt-4">Why Choose Mahanta Group</h3>
                            <p className="desc text-variant-1">Our seasoned team excels in real estate with years of
                                successful market <br/> navigation, offering informed decisions and optimal results.</p>
                        </div>
                        <div className="flat-service wow fadeInUp" data-wow-delay=".2s">
                            <a href="#" className="box-benefit hover-btn-view">
                                <div className="icon-box">
                                    <span className="icon icon-proven"></span>
                                </div>
                                <div className="content">
                                    <h5 className="title">Proven Expertise</h5>
                                    <p className="description">Our seasoned team excels in real estate with years of
                                        successful market navigation, offering informed decisions and optimal results.
                                    </p>
                                </div>
                            </a>
                            <a href="#" className="box-benefit hover-btn-view">
                                <div className="icon-box">
                                    <span className="icon icon-customize"></span>
                                </div>
                                <div className="content">
                                    <h5 className="title">Customized Solutions</h5>
                                    <p className="description">We pride ourselves on crafting personalized strategies to
                                        match your unique goals, ensuring a seamless real estate journey.</p>
                                </div>
                            </a>
                            <a href="#" className="box-benefit hover-btn-view">
                                <div className="icon-box">
                                    <span className="icon icon-partnership"></span>
                                </div>
                                <div className="content">
                                    <h5 className="title">Transparent Partnerships</h5>
                                    <p className="description">Transparency is key in our client relationships. We
                                        prioritize clear communication and ethical practices, fostering trust and
                                        reliability throughout.</p>
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