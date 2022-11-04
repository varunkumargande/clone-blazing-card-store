import React from "react";
import Link from "next/link";
import IconLoader from "../../Icons/IconLoader";
import IconLoaderPlay from "../../Icons/IconLoaderPlay";
import IconLike from "../../Icons/IconLike"

export default function Pokeman(){
    return(
        <section className="Pokomon-wrapper card-inner">
            <div className="inner-container">
                <div className="title-wrap flex space-between flex-center">
                    <div className="flex flex-center">
                        <h3 className="title">Pokeman</h3>
                    </div>
                    <div className="seeAll"><Link href="/"><a className="flex flex-center">View All</a></Link></div>
                </div>
            </div>
            <div className="overflow-wrap">
                <div className="flex inner-container">
                    <div className="card-wrap flex">
                        {/* Loader */}
                        
                        
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list Loader">
                                <div className="image flex flex-center justify-center column">
                                    <div className="LoaderImg">
                                        <div className="loader-icon"><IconLoader /></div>
                                        <span><IconLoaderPlay /></span>
                                    </div>
                                    <div className="loading">Load All</div>
                                </div>
                                <div className="text">
                                    <div className="title"></div>
                                    <div className="disc"></div>
                                    <div className="disc"></div>
                                    <div className="cate"></div>
                                </div>
                            </div>
                        </div>


                        {/* Loader ended*/}
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
                                    <button className="like flex flex-center justify-center"><IconLike /></button>
                                </div>
                                <div className="text">
                                    <h3 className="title flex flex-center"><img src="/static/images/profile.png" alt="Card" /> Marie Woodey</h3>
                                    <div className="disc">$15 Pokemon Mystry Bags w/MIKE</div>
                                    <button className="cate-btn">Pokemon</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-list flex flex-center">
                            <div class="inner-card-list">
                                <div className="image">
                                    <img src="/static/images/card.png" alt="Card" />
                                    <div className="tme-wrap flex flex-center justify-center live"><span>1.2K</span> <button className="live"></button></div>
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
            </div>
        </section>
    );
}