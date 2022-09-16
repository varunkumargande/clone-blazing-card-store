import React from "react";
import Link from "next/link";
import IconBack from "../../Icons/IconBack";
import IconLike from "../../Icons/IconLike"
export default function ScheduledShow(){
    return(
        <section className="scheduledShow-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">Scheduled Show</h3>
                    </div>
                    <div className="seeAll"><Link href="/"><a className="flex flex-center">See All</a></Link></div>
                </div>
                <div className="overflow-wrap">
                    <div className="card-wrap flex inner-container">
                        <div className="card-list flex flex-center">
                            <div className="image">
                                <img src="/static/images/card.png" alt="Card" />
                                <div className="tme-wrap flex flex-center justify-center">Today 10:00AM</div>
                                <button className="like flex flex-center justify-center"><IconLike /></button>
                            </div>
                            <div className="text">
                                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                <button className="cate-btn">Pokemon</button>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div className="image">
                                <img src="/static/images/card.png" alt="Card" />
                                <div className="tme-wrap flex flex-center justify-center">Today 10:00AM</div>
                                <button className="like flex flex-center justify-center"><IconLike /></button>
                            </div>
                            <div className="text">
                                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                <button className="cate-btn">Pokemon</button>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div className="image">
                                <img src="/static/images/card.png" alt="Card" />
                                <div className="tme-wrap flex flex-center justify-center">Today 10:00AM</div>
                                <button className="like flex flex-center justify-center"><IconLike /></button>
                            </div>
                            <div className="text">
                                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                <button className="cate-btn">Pokemon</button>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div className="image">
                                <img src="/static/images/card.png" alt="Card" />
                                <div className="tme-wrap flex flex-center justify-center">Today 10:00AM</div>
                                <button className="like flex flex-center justify-center"><IconLike /></button>
                            </div>
                            <div className="text">
                                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                <button className="cate-btn">Pokemon</button>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div className="image">
                                <img src="/static/images/card.png" alt="Card" />
                                <div className="tme-wrap flex flex-center justify-center">Today 10:00AM</div>
                                <button className="like flex flex-center justify-center"><IconLike /></button>
                            </div>
                            <div className="text">
                                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                <button className="cate-btn">Pokemon</button>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div className="image">
                                <img src="/static/images/card.png" alt="Card" />
                                <div className="tme-wrap flex flex-center justify-center">Today 10:00AM</div>
                                <button className="like flex flex-center justify-center"><IconLike /></button>
                            </div>
                            <div className="text">
                                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                <button className="cate-btn">Pokemon</button>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div className="image">
                                <img src="/static/images/card.png" alt="Card" />
                                <div className="tme-wrap flex flex-center justify-center">Today 10:00AM</div>
                                <button className="like flex flex-center justify-center"><IconLike /></button>
                            </div>
                            <div className="text">
                                <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                <button className="cate-btn">Pokemon</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}