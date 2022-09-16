import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Col, Row } from "antd";
import PaymentCard from "./Payment/PaymentCard";
import ShippmentCard from "./Payment/ShippmentCard";
import StreamingBase from "./StreamingBase";

function CenterDiv({
  open,
  setOpen,
  setAddShippInfo,
  setAddPayInfo,
  customerId,
  streamDetails
}) {
  const [openOptions, setOpenOptions] = React.useState(true);
  const [paymentForm, setPaymentFormOpen] = React.useState(false);
  const [shippmentForm, setShippmentFormOpen] = React.useState(false);

  const [paymentData, setPaymentData] = React.useState(null);
  const [shipData, setShipData] = React.useState(null);

  const handleMuteButton = () => {
    console.log("here");
  };

  const handlePaymentAndShippmentModal = () => {
    setOpen(true);
    setOpenOptions(true);
  };

  const handlePaymentMethod = () => {
    setPaymentFormOpen(true);
  };

  const handleShippmentMethod = () => {
    setShippmentFormOpen(true);
  };

  // const handleMuteButton = () => {
  //     console.log("here");
  // }

  let countries = [
    "United States",
    "Canada",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and/or Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Croatia (Hrvatska)",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecudaor",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "France, Metropolitan",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard and Mc Donald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, Democratic People's Republic of",
    "Korea, Republic of",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfork Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Helena",
    "St. Pierre and Miquelon",
    "Sudan",
    "Suriname",
    "Svalbarn and Jan Mayen Islands",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States minor outlying islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City State",
    "Venezuela",
    "Vietnam",
    "Virigan Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna Islands",
    "Western Sahara",
    "Yemen",
    "Yugoslavia",
    "Zaire",
    "Zambia",
    "Zimbabwe",
  ];

  return (
    <div className="streaming-div-center">
      <div className="seller-info">
        <div id="seller-name">Seller's name</div>
        <div id="seller-rating">
          <span>4.96 169 Ratings</span>
        </div>
        <div id="followers">1,214 Followers</div>
        <button id="follow-button" className="curved-box">
          Follow
        </button>
        <button
          className=" curved-box"
          onClick={handlePaymentAndShippmentModal}
        >
          $
        </button>
      </div>
      <div className="social-presence">
        <div>
          <span id="link-address">
            <input
              value="www.blazingcard.com"
              readOnly={true}
              className="curved-box"
            ></input>
          </span>
          <span id="copy-link">
            <button className="curved-box">Copy</button>
          </span>
        </div>
        <div>
          <button
            id="mute-button"
            className="curved-box"
            onClick={handleMuteButton}
          >
            {/* {mute ? "Unmute" : "Mute"} */}
          </button>
        </div>
      </div>

      <div className="streaming-base">
        <StreamingBase />

        {/* <span className='span'>
                    38
                </span>
                <div className='stream-wrapper'>
                    <div className='overlay'>
                        <div className='product-info'>
                            <div id="winning-buyer-info">
                                winner won!
                            </div>
                            <div id='product-name'>
                                Product name
                            </div>
                            <div id="shipping-details">
                                Shipping and tax
                            </div>
                        </div>
                        <div className='video-info'>
                            <div className="volume">
                                <input type="range" min="0" max="100" value="50" className="volume-range" />
                                <div class="icon">
                                    <i class="fa fa-volume-up icon-size" aria-hidden="true"></i>
                                </div>
                                <div className="bar-hoverbox">
                                    <div classame="bar">
                                        <div classame="bar-fill"></div>
                                    </div>
                                </div>
                                <div>
                                    <button id="mute-button" className='curved-box' onClick={handleMuteButton}>Mute</button>
                                </div>
                            </div>
                            <div id="pay-button">
                                <button className=' curved-box'>$</button>
                                <div>Pay</div>
                            </div>
                            <div id='amount' onClick={handlePaymentAndShippmentModal}>
                                $25
                            </div>
                            <div id="timer">
                                00:00
                            </div>
                        </div>
                    </div>
                    <div id='auction'>
                        <button className='curved-box'>Auction ended</button>
                    </div>
                </div> */}

        {open ? (
          <>
            <div className="payment_popup">
              <div>
                <Row>
                  <Col span={14}>
                    <h3 className='payment_header'>Payment Info</h3>
                  </Col>
                  <Col span={1} push={7}>
                    <button className='payment_close' onClick={() => setOpen(false)}>X</button>
                  </Col>
                </Row>
              </div>
              {openOptions ? (
                <>
                  <div>
                    <div>
                      <Row>
                        <Col span={9}>
                          <h4 className='option-payment'>Payment</h4>
                        </Col>
                        <Col span={12} push={7}>
                          <button className='option_event' onClick={handlePaymentMethod}>"-" </button>
                        </Col>
                      </Row>
                    </div>
                    <div align="center">
                      <div class="nav-bar" />
                    </div>

                    <div>
                      <Row>
                        <Col span={10}>
                          <h4 className='option-shippment'>Shippment</h4>
                        </Col>
                        <Col span={10} push={7}>
                          <button className='option_event' onClick={handleShippmentMethod}>"-" </button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              ) : (
                <>
                </>
              )}
            </div>
          </>
        ) : (
          <>
          </>
        )}
        {paymentForm == true ? (
          <>
            <PaymentCard close={setPaymentFormOpen} setPayment={setPaymentData} shipData={shipData} payData={paymentData} />
          </>
        ) : (
          <>
          </>
        )}
        {shippmentForm ? (
          <>
            <ShippmentCard close={setShippmentFormOpen} setShip={setShipData} data={shipData} />
          </>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}

export default CenterDiv;
